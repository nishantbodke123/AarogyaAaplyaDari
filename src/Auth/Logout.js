import axios from "axios";
import { BASE_URL } from "../Utils/BaseURL";

let axiosConfig = {
  headers: {
    Authorization: `Token ${sessionStorage.getItem("Token")}`,
  },
};
export const Logout = async () => {
  const response = await axios.post(
    `${BASE_URL}/allauth/api/logout`,
    axiosConfig
  );
  return (
   
    response,
    sessionStorage.clear(),
    setTimeout(() => {
      window.location.replace("/");
    }, 1000)
  );
};
