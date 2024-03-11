import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    fileUpload_Loading: false,
    search_Loading:false,
    loading: false,
    error: false,
    searchData: [],
    designData: [],
    users:[]
}



const bonnaDesignSlice = createSlice({


    name: 'bonnadesign',
    initialState,

    reducers: {
        fetchStart: (state) => {
            state.loading = true
            state.error = false
        },
        fetchEnd: (state) => {
            state.loading = false
            state.error = false
        },
        fetchUploadStart: (state) => {
            state.fileUpload_Loading = true
            state.error = false
        },
        fetchUploadEnd: (state) => {
            state.fileUpload_Loading = false
            state.error = false
        },
        fetchSearchStart: (state) => {
            state.search_Loading = true
            state.error = false
            state.designData = []
        },
        // fetchSearchEnd: (state) => {
        //     state.search_Loading = false
        //     state.error = false
        // },
        fetchSearchData: (state, { payload }) => {
            state.searchData = payload
            state.search_Loading = false
            state.error = false
        },
        fetchDesignData: (state, { payload }) => {
            state.designData = payload
        },
        fetchUsersData:(state,{payload})=>{
            state.users=payload
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        }

    }
})

export const {
    fetchStart,
    fetchEnd,
    fetchUploadStart,
    fetchUploadEnd,
    fetchSearchStart,
    // fetchSearchEnd,
    fetchFail,
    fetchDesignData,
    fetchSearchData,
    fetchUsersData

} = bonnaDesignSlice.actions

export default bonnaDesignSlice.reducer