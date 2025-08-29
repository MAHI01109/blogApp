import { useAuth } from "../../../context/AuthContext";
import useLogout from "../../../hooks/useLogout";
import { Link, NavLink } from 'react-router-dom';
import { Sidelinks } from '../../../Routes/SidebarRoutes';

export default function Sidebar() {
    const { user } = useAuth();
    console.log(user, "user");
    const logout = useLogout();
    const linkClass ="flex items-center py-4 px-5 gap-3";

    const activeClass = "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90";

    return (
        <>
            <div className="h-svh p-3 space-y-2 bg-gray-50 w-64 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

                <div className="divide-y divide-gray-300 dark:divide-gray-700">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        {
                            Sidelinks.map((link) => (
                                <li key={link.name} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50  mb-2 rounded">
                                    <NavLink to={link.path} end
                                        className={({ isActive }) =>
                                            `${linkClass} ${isActive ? activeClass : "text-gray-700 dark:text-gray-300 hover:bg-gray-700/50"}`}>
                                        <span className="size-4">{link.icon}</span>
                                        <p className="md:block hidden text-center">{link.name}</p>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                   
                </div>
                <div className="flex items-center p-2 space-x-4">
                    <img src={user?.photo} alt="" className="w-12 h-12 rounded-full bg-gray-500 dark:bg-gray-500" />
                    <div>
                        <h2 className="text-lg font-semibold">{user?.username}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
