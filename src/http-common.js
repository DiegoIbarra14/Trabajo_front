import axios from "axios";

const getToken = () => {
  const tokenString = JSON.parse(localStorage.getItem("token"));
  return tokenString;
};
const deleteToken = () => {
  localStorage.removeItem("token");
};
const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
const apiUrl = process.env.REACT_APP_API_URL;
const http = axios.create({
   // baseURL: "http://api.bregma.com.pe/public/api",
  //baseURL: "http://34.237.228.37/bregma_back/public/api",
  
  baseURL: apiUrl,
 
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

const AxiosServices = {
  http,
  getToken,
  deleteToken,
  setToken,
};
export default AxiosServices;
