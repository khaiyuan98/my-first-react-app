// https://www.youtube.com/watch?v=iBUJVy8phqw

import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './darkMode'
import { apiSlice } from './apiSlice'
import authReducer from './authSlice'

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})