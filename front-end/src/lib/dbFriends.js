import { axiosInstance } from "./axios";

export const getFriendsList = async () => {
  const { data } = await axiosInstance.get("/getuser/connections");
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

//accpt request

export const patchAcceptReq = async ({ statusType, id }) => {
  const { data } = await axiosInstance.patch(
    `/request/review/${statusType}/${id}`
  );
  return data;
};

export const patchrejectReq = async ({ statusType, id }) => {
  const { data } = await axiosInstance.patch(
    `/request/review/${statusType}/${id}`
  );
  return data;
};

//ignore request

export const ignoreProfile = async ({statusType,id}) => {
  const {data} = await axiosInstance.post(`/request/send/${statusType}/${id}`);
  return data;
};

//interest request
export const sendFriendRequest = async ({statusType,id}) => {
    const {data} = await axiosInstance.post(`/request/send/${statusType}/${id}`);
    return data;
  };
