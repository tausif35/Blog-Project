import axios from "axios";
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
const instance = axios.create({
  baseURL: "http://localhost:3000",
})
if (localStorage.getItem("user")) {
  console.log(JSON.parse(localStorage.getItem("user")).token)
  instance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("user")).token
    }`
}

export default instance