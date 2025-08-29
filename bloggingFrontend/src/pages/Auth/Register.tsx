import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logoipsum-custom-logo.svg'
export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("auth/register", data);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed", err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };

  return (
    <div className=" section-spacing dark:bg-gray-900  relative ">
      <div className="flex absolute justify-between top-7 text-white right-0 p-5 ">
        <Link to={'/login'} className="underline-offset-3  underline hover:text-orange-500 ">Login</Link>
      </div>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className='flex flex-col my-3 gap-2 justify-center items-center'>
          <img src={logo} alt='logo' className='size-10' />
          <h2 className="text-2xl font-bold text-center  text-gray-300 ">Register</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("username")} placeholder="Username" className="p-3 rounded border  w-full" />
          <input {...register("email")} placeholder="Email" type="email" className="p-3 rounded border w-full" />
          <input {...register("password")} placeholder="Password" type="password" className=" border p-3 rounded w-full" />

          <button type="submit" className="p-3  bg-purple-700 text-white w-full">Register</button>
        </form>
        <div className="my-2 text-center">or</div>
        <button onClick={handleGoogleLogin} className="btn p-3 w-full bg-red-500 hover:bg-red-600 text-white">
          Continue with Google
        </button>
      </div>
    </div>
  );
}
