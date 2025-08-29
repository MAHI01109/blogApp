import { useState, useEffect, useRef } from 'react';
import useLogout from '../../../hooks/useLogout';
import logo from '../../../assets/logoipsum-custom-logo.svg'
export default function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const logOut = useLogout()
  // Close dropdown on click outside
  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className='bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow p-4 h-20 flex justify-between items-center'>
      <div className='flex gap-4 justify-between items-center h-20 p-2'>
        <div className='flex  gap-2 items-center h-16 p-2'>
          <img src={logo} alt='logo' className='size-10' />
          <p className='text-2xl font-bold md-6 text-orange-500'>Blogs</p>
        </div>
        <button className="p-2 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-200">
            <rect width="352" height="32" x="80" y="96"></rect>
            <rect width="352" height="32" x="80" y="240"></rect>
            <rect width="352" height="32" x="80" y="384"></rect>
          </svg>
        </button>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600"
        >
          <span className="sr-only">Toggle dashboard menu</span>
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop"
            alt="user"
            className="size-10 object-cover"
          />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
            role="menu"
          >
            <div className="p-2">
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                My profile
              </a>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                My data
              </a>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Team settings
              </a>
              <button
                type="button"
                onClick={logOut}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
