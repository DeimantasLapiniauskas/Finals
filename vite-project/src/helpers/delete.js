import axios from "axios";
import { getOneData } from "./get";
import { url } from "../components/url";
export const deleteData = async (id) => {
  console.log(id);

  const target = await getOneData(id);
  console.log(target);

  const { title } = target;
  const confirmed = window.confirm(
    "Are you sure you want to delete " + title + " ?"
  );
  if (!confirmed) return;
  const response = await axios.delete(`${url()}/${target.id}`);
  return response.data;
};