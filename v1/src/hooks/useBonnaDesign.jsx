import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata, listAll, list, deleteObject } from "firebase/storage";
import { getDatabase, onValue, remove, set, update, ref as dbRef } from "firebase/database"
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { uid } from "uid"
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from "../helper/ToastNotify"
import { fetchDesignData, fetchFail, fetchSearchData, fetchSearchEnd, fetchSearchStart, fetchUploadEnd, fetchUploadStart, fetchUsersData } from "../features/bonnaDesignSlice";
import Fuse from 'fuse.js'


const useBonnaDesign = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)

    //! dosyayı storage tarafına yükle
    const postImageDataToFirebase = async (files, info) => {

        // işlem başadığında loading bilgisini true yap
        dispatch(fetchUploadStart())

        try {

            const store = getStorage() //storage bilgisini çek

            const filePath = `images/${info?.fileName}`;
            const fileRef = ref(store, filePath);

            // Dosyayı Firebase Storage'a yükleyin
            await uploadBytes(fileRef, files);

            // Yüklenen dosyanın URL'sini alın
            const downloadURL = await getDownloadURL(fileRef);

            if (downloadURL) {

                // info objesini ayıkla ve downloadURL bilgisini yeni obje bilgisi içerisine ekle
                const newData = { ...info, imgUrl: downloadURL }

                //! realtime db kaydı için fonksiyon çalıştır
                postDownloadUrlToRealTimeDb(newData)

            }
            else {
                toastWarnNotify('Not created image url link !')
            }


        } catch (error) {
            dispatch(fetchFail())
            // console.error("Dosya yükleme hatası: ", error);
            toastErrorNotify('File could not be accessed!')
            throw error; // Hata yönetimi için hatayı fırlatın
        }

    }


    //! bu fonksiyon storage de bulunan resim dosyasını siler daha sonra yeni resim dosyasını yükler
    const updateImageData = async (files, info) => {

        console.log("info: ", info)

        dispatch(fetchUploadStart())

        const storage = getStorage();   //storage bilgisini çek
        const db = getDatabase()  //database bilgisini çek

        //* yüklenecek dosya yolu
        // const filePath = `images/${info?.updateFileName}`;    //storage dosya yolunu göster
        const fileRef = ref(storage, `images/${info?.updateFileName}`);

        // silinecek dosya yolu
        const desertRef = ref(storage, `images/${info?.fileName}`);

        try {
            // Eğer updateFileName varsa, önce mevcut dosyayı sil ve yeni dosyayı yükle
            if (info?.updateFileName) {
                // Mevcut dosyayı sil
                await deleteObject(desertRef);

                // Yeni dosyayı Firebase Storage'a yükle
                await uploadBytes(fileRef, files);

                // Yüklenen dosyanın URL'sini al
                const downloadURL = await getDownloadURL(fileRef);

                if (downloadURL) {
                    // info objesini güncelle ve yeni imgUrl bilgisini ekle
                    const newData = { ...info, imgUrl: downloadURL, fileName: info?.updateFileName };

                    console.log("newData: ", newData)
                    await update(dbRef(db, `images/${info.id}`), newData);
                    toastSuccessNotify('Updated');
                    dispatch(fetchUploadEnd())
                } else {
                    toastWarnNotify('Not created image url link !');
                    dispatch(fetchUploadEnd())
                }
            } else {
                // Eğer updateFileName yoksa, sadece database bilgisini güncelle
                await update(dbRef(db, `images/${info.id}`), info);
                toastSuccessNotify('Updated');
                dispatch(fetchUploadEnd())
            }
        } catch (error) {
            // Hata yönetimi
            console.error("updateImageData error: ", error);
            toastErrorNotify('An error occurred!');
            dispatch(fetchUploadEnd())
        }


    }


    //! realtime db tarafına yüklenin dosyanın url bilgisini ve info datasını çalıştıran fonksiyon
    const postDownloadUrlToRealTimeDb = async (newObj) => {

        const uID = uid() //unique id oluştur
        const db = getDatabase() //database bilgisini çek

        try {

            if (newObj?.imgUrl) {
                await set(dbRef(db, 'images/' + uID), newObj)
                //yükleme işlemi sonrası loading ve error bilgisini false yap
                dispatch(fetchUploadEnd())
                toastSuccessNotify('File Uploaded')
            }

        } catch (error) {
            dispatch(fetchFail())
            // console.log("post realtime db error: ", error)
            toastErrorNotify('File not uploaded !')
            throw error; // Hata yönetimi için hatayı fırlatın
        }



    }



    //! search sayfasındaki çalışan hook
    const getImageData = async (imgkeys) => {

        dispatch(fetchSearchStart())

        try {

            const db = getDatabase()
            const vall = dbRef(db, 'images')
            onValue(vall, (snapShot) => {

                const res = snapShot.val() || {}
                const result = Object.keys(res).map(key => { return { id: key, ...res[key] } })

                if (result.length > 0) {

                    // const data = result.filter(item =>
                    //     item.imageKeyWords && item.imageKeyWords.some(keyword => imgkeys.includes(keyword))
                    // );

                    const options = {
                        includeScore: true,
                        isCaseSensitive:false
                        // Fuse.js için diğer yapılandırma seçenekleri

                    };

                    const fuse = new Fuse(imgkeys, options);

                    const data = result.filter(item =>
                        item.imageKeyWords && item.imageKeyWords.some(keyword =>
                            fuse.search(keyword).length > 0
                        )
                    );

                    dispatch(fetchSearchData(data))

                    dispatch(fetchSearchEnd())
                }
                else {
                    toastWarnNotify('There is not record !')
                }


            })

        } catch (error) {
            dispatch(fetchFail())
            console.log("getImageData: ", error)
            throw error
        }
    }



    const getFile_and_Image_data = () => {

        const db = getDatabase() // realtime db bilgisini çek
        const store = getStorage() //storage bilgisini çek

        const listRef = ref(store, 'images') // storage ve dosya yolunu göster
        const vall = dbRef(db, 'images') // realtime db dosya yolunu göster


        // images dizi içinde kayıtlı olan dosya isimlerini buraya gönder
        let files = []

        // listAll ile tüm storage de kayıtl bilgileri çeker
        listAll(listRef)
            .then((res) => {

                // res.prefixes.forEach((folderRef) => {
                //     console.log(folderRef)
                // });

                // kayıtlı dosya isimlerini getir
                res?.items?.forEach((itemRef) => {
                    files.push(itemRef.name)
                    return itemRef
                });

            }).catch((error) => {
                console.log(error)
            });

        // realtime db den verileri çek
        onValue(vall, (snapShot) => {
            const res = snapShot.val()
            const result = Object.keys(res).map(key => { return { id: key, ...res[key] } })


        })


    }


    //! settings sayfasında çalışan hook
    const getRealTime_dataFromDb = () => {

        try {

            const db = getDatabase()
            const vall = dbRef(db, 'images') // realtime db dosya yolunu göster

            onValue(vall, (snapShot) => {
                const res = snapShot.val()
                const result = Object.keys(res).map(key => { return { id: key, ...res[key] } })

                dispatch(fetchDesignData(result))
            })

        } catch (error) {
            console.log("getRealTime_dataFromDb: ", error)
            throw error
        }
    }


    //! storage den veri sil
    const removeDesignFileData = (fileName) => {

        const storage = getStorage();

        const desertRef = ref(storage, `images/${fileName}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            toastSuccessNotify('Image file deleted')
        }).catch((error) => {
            toastErrorNotify('Not deleted !')
        });
    }


    //! realtime db den veri sil
    const removeDesignData = async (id) => {

        try {

            const db = getDatabase()
            await remove(dbRef(db, `images/${id}`))
            toastSuccessNotify('Image data deleted')

        } catch (error) {
            toastErrorNotify('not deleted !')
            console.log("removeDesignData: ", error)
        }
    }



    //! kullanıcı listesini getir
    const getUsers = async (address) => {

        try {

            const config = {
                method: 'get',
                url: `${import.meta.env.VITE_API_BASE_URL}/${address}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config)

            dispatch(fetchUsersData(res?.data?.data))

        } catch (error) {
            console.log("getUsers error: ", error)
        }
    }


    //! kullanıcı güncelle
    const putUsers = async (address, info) => {

        try {

            const config = {
                method: 'put',
                url: `${import.meta.env.VITE_API_BASE_URL}/${address}/${info.id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(info)
            }

            const res = await axios(config)

            res.status == 202 ? toastSuccessNotify('Updated') : toastErrorNotify('Not Updated !')

            //* güncel kullanıcı bilgisini çek
            getUsers('users')


        } catch (error) {
            console.log("putUsers: ", error)
            toastErrorNotify(error?.response?.data?.message)
        }
    }


    //! kullanıcı ekle
    const postUsers = async (address, info) => {

        try {

            const config = {
                method: 'post',
                url: `${import.meta.env.VITE_API_BASE_URL}/${address}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(info)
            }

            const res = await axios(config)
            res.status == 201 ? toastSuccessNotify('Success') : toastErrorNotify('Something went wrong !')

            //* kayıt işlemi sonrası kullanıcı bilgisini çek
            getUsers('users')

        } catch (error) {
            console.log("postUsers: ", error)
            toastErrorNotify(error?.response?.data?.message)
        }
    }

    //! kullanıcı sil
    const deleteUsers = async (address, info) => {

        try {

            const config = {
                method: 'delete',
                url: `${import.meta.env.VITE_API_BASE_URL}/${address}/${info.id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }

            const res = await axios(config)
            res.status == 204 ? toastSuccessNotify('Deleted') : toastErrorNotify('Not Delete !')

            //* delete işlemi sonrası kullanıcı bilgisini çek
            getUsers('users')

        } catch (error) {
            console.log("deleteUsers: ", error)
            toastErrorNotify(error?.response?.data?.message)
        }
    }


    return {

        postImageDataToFirebase,
        getImageData,
        getFile_and_Image_data,
        getRealTime_dataFromDb,
        removeDesignFileData,
        removeDesignData,
        updateImageData,
        getUsers,
        putUsers,
        postUsers,
        deleteUsers
    }


}

export default useBonnaDesign