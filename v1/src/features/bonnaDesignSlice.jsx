import { createSlice } from "@reduxjs/toolkit";


const initialState={

    loading:false,
    error:false
}





const bonnaDesignSlice=createSlice({


    name : 'bonnadesign',
    initialState,

    reducers:{
        fetchStart:(state)=>{
            state.loading=true
            state.error=false

        },
        fetchFail:(state)=>{
            state.loading=false
            state.error=true
        }

    }
})

export const {

    fetchStart,
    fetchFail

}=bonnaDesignSlice.actions

export default bonnaDesignSlice.reducer