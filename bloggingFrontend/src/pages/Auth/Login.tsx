import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data:any) => {
    try {
      const res = await axios.post("auth/login", {
        login: data.login,
        password: data.password,
      });
      console.log(res);
      setUser(res.data.user);
      toast.success("Login successful");
      navigate("/admin");
    } catch (err: any) {
      console.log(err);
      toast.error(
        "Login failed",
        err.response?.data?.message || "Please try again"
      );
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };
  return (
    <div className=" section-spacing dark:bg-gray-900  relative ">
      <div className="flex absolute justify-between top-7 text-white right-0 p-5 ">
        <Link
          to={"/register"}
          className="underline-offset-3  underline hover:text-orange-500 "
        >
          Register
        </Link>
      </div>
      <div className="max-w-md mx-auto p-8 bg-card rounded-xl shadow-lg">
        <div className="flex flex-col gap-2 my-3 justify-center items-center">
          <img src={logo} alt="logo" className="size-10" />
          <h2 className="text-2xl font-bold text-center  text-gray-300 ">
            Login
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("login")}
            placeholder="Username or Email"
            className="border p-3 rounded w-full"
          />
          <div className="relative">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="border p-3 rounded w-full"
            />
          </div>
          <button className="bg-blue-600 rounded text-white px-4 py-3 w-full">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn mt-3 p-3 w-full rounded border border-white hover:bg-red-600 text-white"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
