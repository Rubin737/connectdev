import { axiosInstance } from "./axios";

export const getFriendsList = async (page) => {
  const { data } = await axiosInstance.get(`/getuser/connections?page=${page}&limit=6`);
  return data;
};


// get users feed
export const getFeed = async ({pageParam}) => {

  const { data } = await axiosInstance.get(`/getuser/feed?page=${pageParam}&limit=6`);
  return data;
};
// get requset

export const getReqs = async () => {
  const {data} = await axiosInstance.get("/getuser/requests");
  return data;
};

//my-own requests

export const getMyOwnRequests = async () => {
  
    const { data } = await axiosInstance.get("/getuser/my-requests");
    return data;
  
};


//accpt request

export const patchAcceptReq = async (id) => {
  const { data } = await axiosInstance.patch(
    `/request/review/accept/${id}`
  );
  return data;
};

//reject
export const patchrejectReq = async (id) => {
  const { data } = await axiosInstance.patch(
    `/request/review/reject/${id}`
  );
  return data;
};

//ignore request

export const ignoreProfile = async (id) => {
  const {data} = await axiosInstance.post(`/request/send/ignore/${id}`);
  return data;
};

//interest request
export const sendFriendRequest = async (id) => {
    const {data} = await axiosInstance.post(`/request/send/interest/${id}`);
    return data;
  };

