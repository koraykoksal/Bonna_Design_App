
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import {
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,
    signLoginSuccess,

} from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getAuth } from "firebase/auth"
import { auth } from "../auth/firebase"


const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    //! erp login
    const login = async ({ email, password }) => {

        dispatch(fetchStart())

        const options = {
            method: 'POST',
            url: `${import.meta.env.VITE_LOGIN_BASE_URL}/auth/login`,
            data: {
                'email': email,
                'password': password,

            }
        }

        try {

            const res = await axios(options)

            if (res?.status == 200) {

                dispatch(fetchLoginSuccess(res?.data))
                navigate('/bonnadesign')
                toastSuccessNotify('Login Successful.')

            }
            else {
                toastErrorNotify("'Something Went Wrong !'")
            }

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("'Something Went Wrong !'")
            console.log("login error: ", error)
        }
    }


    const logout = async () => {

        dispatch(fetchStart())

        dispatch(fetchLogoutSuccess())
        toastSuccessNotify('Logout Successful.')
        navigate('/')
    }

    

    //! firebase email and password login
    const signIn = async (info) => {

        dispatch(fetchStart())

        try {

            //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
            let userCredential = await signInWithEmailAndPassword(
                auth,
                info.email,
                info.password
            );
            dispatch(signLoginSuccess(userCredential?.user))
            navigate("/bonnadesign");
            toastSuccessNotify("Logged in successfully!");

        } catch (error) {
            console.log("signIn error: ", error)
            toastErrorNotify(error.message);
        }

    }



    //! firebase loout
    const signOff = async () => {


        signOut(auth);
        dispatch(logoutSuccess())
        navigate("/login");
        toastSuccessNotify("Logged out successfully!");
    }


    return { login, logout, signIn, signOff }
}


export default useAuthCall;