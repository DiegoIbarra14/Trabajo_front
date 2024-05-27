import { createSlice } from '@reduxjs/toolkit';

const isLoadingSlice = createSlice({
   name: 'isLoading',
   initialState: false,
   reducers: {
      startLoading: (state) => { console.log("ENTRO"); return true },
      endLoading: (state) => { console.log("ENTRO"); return false },
   },
});

export const { startLoading, endLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;