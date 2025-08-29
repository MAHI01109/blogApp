import React from 'react'
import axios from '../../api/axios'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect,Suspense,lazy } from 'react';

import UserBlogCard from './components/UserBlogCard';
export default function UserBlogs() {
    const [blogs, setBlogs] = useState([]);
    const getAllBlogs = async () => {
        try {
            const response = await axios.get('/blog/user-blogs');
            setBlogs(response.data.blogs);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])

    if (blogs.length === 0) {
        return (
            <div className='h-full flex justify-center items-center'>
                <h1 className='text-2xl font-bold'>No Blogs Found</h1>
            </div>
        )
    }
    if (!blogs) {
        return (
            <div className='h-full flex justify-center items-center'>
                <h1 className='text-2xl font-bold'>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='h-full overflow-y-hidden'>
            <div className='grid grid-cols-1 gap-3'>
                {
                    blogs?.map((blog) => (
                       <UserBlogCard data={blog} />
                    ))
                }
            </div>
        </div>
    )
}
