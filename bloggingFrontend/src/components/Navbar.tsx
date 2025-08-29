import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import logo from '../assets/logo.svg';
import { NavbarRoutes } from "../Routes/NabbarRoutes";
import { ThemeButton } from "./Common/ThemeButton";
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Navbar() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <nav className={`${currentRoute === '/admin' ? 'hidden' : 'flex justify-between bg-sidebar items-center h-16 px-12 py-4 sticky top-0 z-50 shadow-md'}`}>
      <div className='flex gap-2 items-center h-16 p-2'>
        <img src={logo} alt='logo' className='size-10' />
        <p className='text-2xl font-bold md-6 text-orange-500'>Blogs</p>
      </div>
      <NavigationMenu className="flex items-center">
        <NavigationMenuList>
          {NavbarRoutes.map((route) => (
            <NavigationMenuItem key={route.label}>
              <NavigationMenuLink asChild>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `transition-normal duration-500 px-3 py-1 rounded ${isActive ? "bg-gray-500/24 text-orange-600" : "text-foreground"}`
                  }
                >
                  {route.label}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-center items-center gap-3">
        <div>
          <ThemeButton />
        </div>
        {!user ? (
          <div className="inline-flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <Link to="/login">Account</Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Button variant={'default'} onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}