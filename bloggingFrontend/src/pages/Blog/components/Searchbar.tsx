// ✅ Debounced hook
import React, { useEffect, useState } from "react";
// ✅ AllBlogs Component With Pagination & Search
import axios from "@/api/axios";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const debouncedSearch = useDebounce(search);
    const limit = 3;

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/blog/all-blogs?page=${page}&limit=${limit}&search=${debouncedSearch}`
            );
            setBlogs(res.data.blogs);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, [page, debouncedSearch]);

    const handleSearchChange = (val) => {
        setSearch(val);
        setPage(1);
    };

    const handleReset = () => {
        setSearch("");
        setPage(1);
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Searchbar
                value={search}
                onChange={handleSearchChange}
                onSearch={fetchBlogs}
                onReset={handleReset}
                placeholder="Search blogs..."
            />

            {loading ? (
                <SkeletonList count={3} />
            ) : blogs.length === 0 ? (
                <p className="text-gray-500 italic">No blogs found.</p>
            ) : (
                <div className="space-y-6">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blog-view/${blog?.slug}`}
                            key={blog?._id}
                            className="block bg-white rounded-md shadow p-4 hover:bg-gray-50"
                        >
                            <h2 className="text-xl font-semibold text-blue-800">{blog?.title}</h2>
                            <p className="text-gray-600 text-sm mb-2">{blog?.excerpt}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>By: {blog?.author}</span>
                                <span>{blog?.postTime} ago</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="mt-6">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </div>
    );
};


export function useDebounce(value, delay = 500) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

// ✅ Shared SearchBar Component
export const Searchbar = (
    { value,
        onChange,
        onSearch,
        onReset,
        placeholder = "Search..."
    }: {
        value: string,
        onChange: any,
        onSearch: any,
        onReset: any,
        placeholder: string
    }) => {

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
                onClick={onSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition"
            >
                Search
            </Button>
            {value && (
                <button
                    onClick={onReset}
                    className="text-gray-500 hover:text-red-500 text-sm"
                >
                    Reset
                </button>
            )}
        </div>
    );
};

// ✅ Skeleton Loader Component
export const SkeletonList = ({ count = 5 }) => {
    return (
        <ul className="space-y-3 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (

                <div key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 animate-pulse">
                    <div className="container grid grid-cols-12 mx-auto bg-gray-50 dark:bg-gray-900">
                        <div className="bg-no-repeat bg-cover bg-gray-700 dark:bg-gray-300 col-span-full lg:col-span-4"></div>
                        <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                            <div className="flex justify-start">
                                <div className="px-2 py-1 text-xs rounded-full bg-fuchsia-600 dark:bg-fuchsia-400 text-gray-50 dark:text-gray-900"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-2/3 mt-2"></div>
                            <div className="flex-1 pt-2">
                                <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
                            </div>
                            <a rel="noopener noreferrer" href="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-fuchsia-600 dark:text-fuchsia-400">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </a>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex space-x-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                    <div className="self-center h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </ul>
    );
};