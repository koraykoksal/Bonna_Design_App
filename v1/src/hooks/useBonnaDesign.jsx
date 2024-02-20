import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, onValue, remove, set, update } from "firebase/database"
import { getFirestore, setDoc, doc } from "firebase/firestore";

import { uid } from "uid"
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from "../helper/ToastNotify"


const useBonnaDesign = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const postImageDataToFirebase = async (files, info) => {

        const uID = uid() //unique id oluştur
        const db = getDatabase() //database bilgisini çek
        const store = getStorage() //storage bilgisini çek


        try {

            const fileRef = ref(store, `images/${info?.fileName}`)
           

            if (fileRef?._location?.path_) {

                console.log(fileRef)

                // Dosyayı Firebase Storage'a yükleyin
                await uploadBytes(fileRef, files);

                // Yüklenen dosyanın URL'sini alın
                const downloadURL = await getDownloadURL(fileRef);

                //! url bilgisi geç geldiği için hataya düşüyor

                if (downloadURL) {

                    // info objesini ayıkla ve downloadURL bilgisini yeni obje bilgisi içerisine ekle
                    const newData = { ...info, imgUrl: downloadURL }

                    // Yeni obje verisini Firestore'a gönderin
                    // await setDoc(doc(db, 'images', uID), newData);

                    // yeni obje verisini realTime Database e gönder
                    await set(ref(db, 'images/' + uID), newData)

                    toastSuccessNotify('image files added to database.')
                }
                else {
                    toastWarnNotify('Not created image url link !')
                }

            }
            else{
                toastWarnNotify('Hata !')
            }






        } catch (error) {
            console.error("Dosya yükleme hatası: ", error);
            throw error; // Hata yönetimi için hatayı fırlatın
        }

    }






    return {

        postImageDataToFirebase
    }


}

export default useBonnaDesign