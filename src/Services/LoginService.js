import axios from "../http-common";

const login = (data) => {
  return axios.http.post("/auth/login", data);
};
const logout = () => {
  return axios.deleteToken();
};
const setToken = (data) => {
  return axios.setToken(data);
};
const my = () => {
  console.log("myyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  return axios.http.post("/my");
};

const changePassword = (data) => {
  return axios.http.post("/changePassword", data);
};
const getToken = () => {
  return axios.getToken();
};
const LoginService = {
  login,
  logout,
  setToken,
  my,
  changePassword,
  getToken,
};
export default LoginService;
