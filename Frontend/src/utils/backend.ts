import axios from "axios";
import { SignupSchemaType, LoginSchemaType } from "./schemas";

const BASE_URL = "https://intellisqr.onrender.com/";

export const signUpUser = async (data: SignupSchemaType) => {
  const response = await axios.post(`${BASE_URL}api/v1/users/signUp`, {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
  return response.data;
};

export const loginUser = async (data: LoginSchemaType) => {
  const response = await axios.post(`${BASE_URL}api/v1/users/login`, {
    email: data.email,
    password: data.password,
  });
  return response.data;
};
