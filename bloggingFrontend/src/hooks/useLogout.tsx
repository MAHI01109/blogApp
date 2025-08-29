import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios.post("auth/logout");
            setUser(null);
            toast.success("Logged out");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
    return logout;
};

export default useLogout