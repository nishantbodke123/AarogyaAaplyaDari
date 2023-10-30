import axios from "axios";
import { BASE_URL } from "./BaseURL";

export const GetPhleboFamilyMembersDetailsInstance = axios.create({
  baseURL: `${BASE_URL}/phlebo/api`,
  headers: {
    Authorization: `Token ${sessionStorage.getItem("Token")}`,
  },
});
