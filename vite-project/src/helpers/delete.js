import axios from "axios";
import { getOneData } from "./get";
import { url } from "../components/url";
export const deleteData = async (id, urlAddon) => {
  const target = await getOneData(id, urlAddon);
  console.log("one");

  const { fullName } = target;
  console.log("two");

  const confirmed = window.confirm(
    "Are you sure you want to delete " + fullName + " ?"
  );
  console.log(3);

  if (!confirmed) return;
  console.log(`${url()}/${target.id}`);

  const response = await axios.delete(`${url()}/mechanics/${target.id}`);
  console.log(5);

  return response.data;
};
