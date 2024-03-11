import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loginLoading:false,
    error:false,
    token:"",
    userInfo:[],

}

const authSlice=createSlice({

    name:'auth',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loginLoading=true;
            state.error = false;
            state.userInfo =[]
            state.managerPersonels=[]
        },
        fetchFail:(state)=>{
            state.loginLoading=false;
            state.error=true;
        },
        fetchLoginSuccess:(state,{payload})=>{
            state.loginLoading=false;
            state.token = payload?.token
            state.currentUser=payload?.user?.name+" "+payload?.user?.surname
            state.userInfo = payload
        
        },
        fetchLogoutSuccess:(state)=>{
            state.loginLoading=false;
            state.currentUser = "";
            state.token="";
            state.userInfo =[]

        },
        signLoginSuccess:(state,{payload})=>{
            console.log(payload)
            state.loginLoading=false;
            state.currentUser=payload.email
            state.userInfo = payload
        
        }

    }


})

export const
{
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,
    signLoginSuccess,

}=authSlice.actions

export default authSlice.reducer;





