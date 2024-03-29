
import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import bonnaDesignReducer from '../features/bonnaDesignSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)
const persistedDesignReducer = persistReducer(persistConfig, bonnaDesignReducer)

const store=configureStore({

  reducer:{
    auth:persistedReducer,
    bonnadesign:bonnaDesignReducer,
  }

  
  ,devTools: process.env.NODE_ENV !== "production",

   //consolda çıkan serileştirme hatasını göstermiyor
   middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  
})


export const persistor = persistStore(store)
export default store

