import axios from "axios";
import { BASE_URL } from "@/data/config";

export const adminAxios = axios.create({
  baseURL: BASE_URL,
});
