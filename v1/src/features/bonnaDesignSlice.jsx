import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    fileUpload_Loading: false,
    loading: false,
    error: false,
    searchData:[],
    designData:[],
}



const bonnaDesignSlice = createSlice({


    name: 'bonnadesign',
    initialState,

    reducers: {
        fetchUploadStart: (state) => {
            state.fileUpload_Loading = true
            state.error = false

        },
        fetchUploadEnd: (state) => {
            state.fileUpload_Loading = false
            state.error = false

        },
        fetchSearchStart: (state) => {
            state.loading = true
            state.error = false
            state.designData=[]

        },
        fetchSearchEnd: (state) => {
            state.loading = false
            state.error = false

        },
        fetchSearchData:(state,{payload})=>{
            state.searchData = payload
        },
        fetchDesignData:(state,{payload})=>{
            state.designData = payload
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        }

    }
})

export const {

    fetchUploadStart,
    fetchUploadEnd,
    fetchSearchStart,
    fetchSearchEnd,
    fetchFail,
    fetchDesignData,
    fetchSearchData

} = bonnaDesignSlice.actions

export default bonnaDesignSlice.reducer