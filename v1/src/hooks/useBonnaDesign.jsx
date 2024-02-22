import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, onValue, remove, set, update, ref as dbRef } from "firebase/database"
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { uid } from "uid"
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from "../helper/ToastNotify"
import { fetchDesignData, fetchFail, fetchSearchEnd, fetchSearchStart, fetchUploadEnd, fetchUploadStart } from "../features/bonnaDesignSlice";


const useBonnaDesign = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()


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



    const getImageData = async (imgkeys) => {

        dispatch(fetchSearchStart())

        try {

            const db = getDatabase()
            const vall = dbRef(db, 'images')
            onValue(vall, (snapShot) => {

                const res = snapShot.val() || {}
                const result = Object.keys(res).map(key => { return { id: key, ...res[key] } })

                if (result.length > 0) {

                    const data = result.filter(item =>
                        item.imageKeyWords && item.imageKeyWords.some(keyword => imgkeys.includes(keyword))
                    );
                    
                    dispatch(fetchDesignData(data))

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



    return {

        postImageDataToFirebase,
        getImageData
    }


}

export default useBonnaDesign