import axios from "axios";
import { url } from "../components/url";
export const getAllData = async (urlAddon) => {
  const response = await axios.get(url() + urlAddon);
  return response.data;
};

export const getOneData = async (id, urlAddon) => {
  console.log(id);

  let response;
  try {
    console.log(url() + urlAddon + "/" + id);

    response = await axios.get(url() + urlAddon + "/" + id);
  } catch (error) {
    console.log(error);
  }
  return response?.data;
};
