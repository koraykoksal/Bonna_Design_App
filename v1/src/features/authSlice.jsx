import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    token:"",
    userInfo:[],
    managerPersonels:[],
    twiserAccesToken:"",
    twiserRefreshToken:"",
    twiserUserId:"",

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

            state.loading=false;
            state.currentUser=payload[0]?.NAME+" "+payload[0]?.SURNAME
            state.securityKey=payload[0]?.SECURITYKEY
            state.userInfo = payload[0]
        
        },
        fetchLoginManagerPersonels:(state,{payload})=>{
            state.loading=false
            state.managerPersonels = payload
            // state.managerPersonels=JSON.parse(payload[0].EKIP) //yönetici altında yer alan ekip bilgisi
        },
        fetchLogoutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";
            state.userInfo =[]
            state.managerPersonels=[]
            //logout olduğun zaman twiser token bilgilerini temizle
            state.twiserAccesToken=""
            state.twiserRefreshToken=""
            state.twiserUserId=""

        },
        fetchTwiserStart:(state)=>{
            state.loading=true;
            state.error = false;
            state.twiserAccesToken=""
            state.twiserRefreshToken=""
            state.twiserUserId=""
        },
        fetchTwiserLoginSuccess:(state,{payload})=>{
            state.loading=false;
            state.twiserAccesToken=payload?.AccessToken
            state.twiserRefreshToken=payload?.RefreshToken
            state.twiserUserId=payload?.UserId        
        },

    }


})

export const
{
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,
    fetchLoginManagerPersonels,
    fetchTwiserStart,
    fetchTwiserLoginSuccess

}=authSlice.actions

export default authSlice.reducer;





