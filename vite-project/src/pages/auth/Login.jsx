import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Invalid credentials");
      } else {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Login</legend>

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

            <button type="submit">Login</button>
            <NavLink to="/register">Register</NavLink>
          </fieldset>
        </form>
        {error}
      </div>
    </main>
  );
};
