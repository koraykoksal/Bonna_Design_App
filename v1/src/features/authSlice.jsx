import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    token:"",
    userInfo:[],

}

const authSlice=createSlice({

    name:'auth',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loading=true;
            state.error = false;
            state.userInfo =[]
            state.managerPersonels=[]
        },
        fetchFail:(state)=>{
            state.loading=false;
            state.error=true;
        },
        fetchLoginSuccess:(state,{payload})=>{
            console.log(payload)
            state.loading=false;
            state.currentUser=payload[0]?.NAME+" "+payload[0]?.SURNAME
            state.userInfo = payload[0]
        
        },
        fetchLogoutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";
            state.userInfo =[]

        },
        signLoginSuccess:(state,{payload})=>{
            console.log(payload)
            state.loading=false;
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





