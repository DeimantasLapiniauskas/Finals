
import axios from "axios";
import { url } from "../components/url";
export const getAllData = async (urlAddon) => {
  console.log("hi");
  
  const response = await axios.get(url()+urlAddon);
console.log("howdy");

  return response.data;
};

export const getOneData = async (id) => {
  let response;
  try {
    response = await axios.get(url() + "/" + id);
  } catch (error) {
    console.log(error);
  }
  return response?.data;
};
