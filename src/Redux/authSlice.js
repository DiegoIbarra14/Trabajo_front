import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { history } from "../Services/history";
import axios from "../http-common";

const initialState = () => {
   return {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      accesos: JSON.parse(localStorage.getItem("accesos")),
      token: JSON.parse(localStorage.getItem("token")),
      finishWithErrors: false,
      errorMessage: "Fallas al solicitar",
      loading: false // Asegúrate de incluir `loading` en el estado inicial
   };
};

export const signInUser = createAsyncThunk('signInUser', async (body) => {
   return axios.http.post("/auth/login", body);
});

const authSlice = createSlice({
   name: 'login',
   initialState: initialState(),
   reducers: {
      addToken: (state, action) => {
         console.log("agregando token");
      },
      logout: (state) => { // No necesitas `action` aquí si no se usa
         state.token = null;
         state.first_name = null;
         state.last_name = null;
         state.accesos = null;
         localStorage.removeItem("accesos");
         localStorage.removeItem("first_name");
         localStorage.removeItem("last_name");
         localStorage.removeItem("token");
         history.navigate('/login');
      },
   },
   extraReducers: (builder) => { // Cambia la notación aquí
      builder
         .addCase(signInUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(signInUser.fulfilled, (state, { payload: { data } }) => {
            console.log("dataaaa", data);
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("accesos", JSON.stringify(data.accesos));
            localStorage.setItem("first_name", data?.persona?.nombres);
            localStorage.setItem("last_name", data?.persona?.apellido_paterno);
            state.token = data.token;
            state.accesos = data.accesos;
            state.first_name = data?.persona?.nombres;
            state.last_name = data?.persona?.apellido_paterno;
            const { from } = history?.location?.state || { from: { pathname: data.accesos[0]?.url } };
            history.navigate(from);
            state.loading = false; // Asegúrate de actualizar el estado `loading`
         })
         .addCase(signInUser.rejected, (state) => {
            state.loading = false; // Asegúrate de actualizar el estado `loading`
         });
   }
});

export const { addToken, logout } = authSlice.actions;

export default authSlice.reducer;
