import { axiosInstance } from "./axios";

export const getFriendsList = async () => {
  const { data } = await axiosInstance.get("/getuser/connections");
  return data;
};


export const sendFriendRequest = async ({statusType,id}) => {
  const {data} = await axiosInstance.post(`/request/send/${statusType}/${id}`);
  return data;
};

export const ignoreProfile = async ({statusType,id}) => {
  const {data} = await axiosInstance.post(`/request/send/${statusType}/${id}`);
  return data;
};

// get users feed
export const getFeed = async () => {
  const { data } = await axiosInstance.get("/getuser/feed");
  return data;
};
// get requset

export const getReqs = async () => {
  const {data} = await axiosInstance.get("/getuser/requests");
  return data;
};


