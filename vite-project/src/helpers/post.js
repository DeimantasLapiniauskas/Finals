import axios from "axios";
import { url } from "../components/url.jsx";
const postData = async (urlAddon, input) => {
  console.log(url() + urlAddon);

  const response = await axios.post(url() + urlAddon, input);
  return response.data;
};
export default postData;
