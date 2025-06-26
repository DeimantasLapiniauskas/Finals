import axios from "axios";
import { url } from "../components/url";

export const patchData = async (id, data) => {
  const response = await axios.patch(`${url()}/${id}`, data);
  return response.data;
};
