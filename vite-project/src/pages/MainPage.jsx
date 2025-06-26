import { useEffect, useState } from "react";
import { getAllData } from "../helpers/get";

export const MainPage = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        try {
            setServices(getAllData("/mechanics"))

        } catch (error) {
            console.log(error);
            
        }
      }, []);
    return <>{services}</>
}
