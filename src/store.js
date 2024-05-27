import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./Redux/authSlice";
import isLoadingSlice from "./Redux/isLoadingSlice";

const rootReducer = combineReducers({
   data: authSlice,
   isLoading: isLoadingSlice
})

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

export default store;