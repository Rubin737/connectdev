import { axiosInstance } from "./axios";

export const createUser = async (signupData) => {
  const { data } = await axiosInstance.post("/auth/signup", signupData);
  return data;
};

export const getAuthUser = async () => {
  const { data } = await axiosInstance.get("/auth/currentuser");
  return data;
};
export const updateUser = async (onboardData) => {
  const { data } = await axiosInstance.post("/auth/onboard", onboardData);
  return data;
};
export const loginUser = async (loginData) => {
  const { data } = await axiosInstance.post("/auth/login", loginData);
  return data;
};
