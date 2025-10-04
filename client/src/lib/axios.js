import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:"https://career-page-wine.vercel.app/api",
    withCredentials: true
})