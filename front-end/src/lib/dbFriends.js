import { axiosInstance } from "./axios";

export const getFriendsList = async () => {
  const { data } = await axiosInstance.get("/getuser/connections");
  return data;
};

export const getFeed = async () => {
  const { data } = await axiosInstance.get("/getuser/feed");
  return data;
};


