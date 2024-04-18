import axios from 'axios';
import { useCookies } from "react-cookie";

const axiosInstance = () => {
  const {cookies, setCookie} = useCookies();

  console.log(cookies);

  return axios.create({
    baseURL: 'https://code-lab-backend-one.vercel.app',
    withCredentials: true, 
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies 
    }
  });
}

export default axiosInstance;