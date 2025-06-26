import { useForm } from "react-hook-form";
import {NavLink} from "react-router";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const { login } = useAuth()

    const onSubmit = async (data) => {
        try {
            await login(data.username, data.password);
            
        } catch (error) {
            if (error.response?.status === 401) {
                setError("Invalid credentials")
            } else {
                setError(error.response?.data?.message || error.message)
            }
        }
    };

    return (
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend">Login</legend>

                        <label className="fieldset-label">Username</label>
                        <input {...register("username")} type="text" className="input" placeholder="Enter username" />

                        <label className="fieldset-label">Password</label>
                        <input {...register("password")} type="password" className="input" placeholder="Enter password" />

                        <button type="submit" className="btn btn-primary mt-4">Login</button>
                        <NavLink to="/register" className="underline text-center mt-2">Register</NavLink>
                    </fieldset>
                </form>
                {error}
            </div>
        </main>
    );
};