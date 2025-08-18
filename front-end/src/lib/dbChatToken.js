import { axiosInstance } from "./axios"

export const getToken = async()=>{
    const {data} = await axiosInstance.get("/chat/token");
    console.log(data)
    return data
}