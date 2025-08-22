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
  try {
    const { data } = await axiosInstance.get("/getuser/my-requests");
    return data;
  } catch (error) {
    //console.log(error)
  }
};




//accpt request

export const patchAcceptReq = async ({ statusType, id }) => {
  const { data } = await axiosInstance.patch(
    `/request/review/${statusType}/${id}`
  );
  return data;
};

//reject
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

