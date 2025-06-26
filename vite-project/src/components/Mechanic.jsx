import { deleteData } from "../helpers/delete";

export const Mechanic = (data) => {
  const handleDelete = (id) => {
    deleteData(id, "/mechanics");
  };
  return (
    <div className="MechanicBox">
      <p>Mechanics name: {data.data.fullName}</p>
      <p>Mechanics experience (years): {data.data.experienceYears}</p>
      <button onClick={() => handleDelete(data.data.id)}>Delete</button>
    </div>
  );
};
