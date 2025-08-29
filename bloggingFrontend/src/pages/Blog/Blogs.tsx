import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useDebounce, Searchbar, SkeletonList } from "./components/Searchbar"; // Adjust this path as needed

export default function AllBlogs() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const debouncedSearch = useDebounce(search);
    const limit = 3;

    const fetchBlogs = async (querys: string | null) => {
        console.log(querys, "query");

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
        fetchBlogs(query);
    }, [page, debouncedSearch, query]);

    const handleSearchChange = (val: any) => {
        setSearch(val);
        setPage(1);
    };

    const handleReset = () => {
        setSearch("");
        setPage(1);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
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
                    <div className="space-y-6 ">
                        {blogs.map((blog) => (
                            <Link
                                to={`/blog-view/${blog?.slug}`}
                                key={blog?._id}
                                className="block p-4"
                            >

                                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                                    <div className="container grid grid-cols-12 mx-auto bg-gray-50 dark:bg-gray-900">
                                        <div style={{ backgroundImage: `url(${blog?.thumbnail})` }} className="bg-no-repeat  bg-gray-700 dark:bg-gray-300 col-span-full lg:col-span-4 bg-center bg-blend-multiply bg-cover"></div>
                                        <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">

                                            <div className="flex justify-start gap-3">
                                                {blog?.tags.map((tag) => (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-fuchsia-600 dark:bg-fuchsia-400 text-gray-50 dark:text-gray-900">{tag}</span>
                                                ))}

                                            </div>
                                            <h1 className="text-3xl font-semibold">{blog?.title}</h1>
                                            <p className="flex-1 pt-2">{blog?.excerpt}</p>
                                            <Link rel="noopener noreferrer" to="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-fuchsia-600 dark:text-fuchsia-400">
                                                <span>Read more</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </Link>
                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex space-x-2">
                                                    <img alt="" src={blog?.owner?.profileImage} className="w-8 h-8 border rounded-full bg-gray-500 dark:bg-gray-500 border-gray-300 dark:border-gray-700"
                                                    />
                                                    <span className="self-center text-sm">By: {blog?.author}</span>
                                                </div>
                                                <span className="text-xs">{blog?.postTime} ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <span className="flex items-center mt-4">
                    <span className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></span>
                </span>

                <div className="mt-6">
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
}
