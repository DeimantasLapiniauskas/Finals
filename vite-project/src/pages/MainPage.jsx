import { useEffect, useState } from "react";
import { getAllData } from "../helpers/get";
import { Mechanic } from "../components/Mechanic";
import postData from "../helpers/post";

export const MainPage = () => {
  const [services, setServices] = useState([]);
  const [adding, setAdding] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputExp, setInputExp] = useState(0);

  useEffect(() => {
    async function fetchMechanics() {
      try {
        const mechanics = await getAllData("/mechanics");
        setServices(mechanics);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMechanics();
  }, []);

  const handleSubmit = (data) => {
    postData("/mechanics", { fullName: inputName, experienceYears: inputExp });
  };

  return (
    <>
      {adding || (
        <>
          <div className="MainPage">
            {services.map((service) => (
              <Mechanic data={service} key={service.id} />
            ))}
          </div>
          <button onClick={() => setAdding(true)}>Add mechanic</button>
        </>
      )}
      {adding && (
        <>
          <div>
            <input
              type="text"
              placeholder="Enter full name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter experience in years"
              value={inputExp}
              onChange={(e) => setInputExp(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>submit</button>
        </>
      )}
    </>
  );
};
