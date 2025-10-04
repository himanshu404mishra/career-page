import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:"https://career-page-lake.vercel.app/api",
    withCredentials: true
})