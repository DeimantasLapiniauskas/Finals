import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { register: registerUser } = useAuth();
  const [role, setRole] = useState({ id: 2, name: "USER" });

  
  const onSubmit = async (data) => {
    try {
        
      await registerUser(data.username, [role], data.password);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message ?? error.message);
    }
  };

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} onClick={() => setError("")}>
          <fieldset>
            <legend>Register</legend>
            <label>Username</label>
            <input
              {...register("username")}
              type="text"
              placeholder="Enter username"
            />
            <label>Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter password"
            />
            <input
              {...register("roles")}
              type="radio"
              id="radioUser"
              onChange={() => setRole({ id: 2, name: "USER" })}
            />
            User
            <input
              {...register("roles")}
              type="radio"
              id="radioAdmin"
              onChange={() => setRole({ id: 1, name: "ADMIN" })}
            />
            Admin
            <button type="submit">Register</button>
            <NavLink to="/login">Login</NavLink>
          </fieldset>
        </form>
        {error}
      </div>
    </main>
  );
};
