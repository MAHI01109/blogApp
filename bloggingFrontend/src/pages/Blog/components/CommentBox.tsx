import React, { useEffect, useState } from 'react'
import axios from '@/api/axios'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import usePost from '@/hooks/usePost'
import { Heart, MessageSquareMore, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import { it } from 'node:test'
import useToggle from '@/hooks/useToggle'



function CommentBox({ blog_id }: { blog_id: number }) {
    const { data, loading, error } = useFetch({ url: `/blog/comment/get_comments/${blog_id}?page=1&limit=10` });
    const comments = data?.comments || [];
    const [isVisible, toggleVisibility] = useToggle(false)
    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>Failed to load comments.</div>;

    return (
        <>
            <section className="relative py-4">
                <div className="w-full max-w-4xl px-4 md:px-5 lg:px-5 mx-auto bg-card p-12">
                    <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
                        <h2 className=" text-3xl font-bold font-manrope leading-normal">
                            Comments
                        </h2>
                        <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
                            <CommentInputForm id={blog_id} types={"first_comment"} />
                            <div className="w-full flex-col justify-start items-start gap-8 flex">
                                {
                                    comments?.map((item: any) => (
                                        <div className="w-full flex-col justify-start items-end gap-5 flex">
                                            <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                                                {/* Main comment  */}
                                                <div className="w-full flex-col justify-center items-start gap-3.5 flex">

                                                    <div className="w-full justify-between items-center inline-flex">

                                                        <div key={item?._id} className="justify-start items-center gap-2.5 flex">
                                                            <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                                                                <img
                                                                    className="rounded-full object-cover"
                                                                    src={item?.owner?.profileImage}
                                                                    alt={item?.owner?.username}
                                                                />
                                                            </div>
                                                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                                                                <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                                                                    {item?.owner?.username}
                                                                </h5>
                                                                <h6 className="text-gray-500 text-xs font-normal leading-5">
                                                                    1 hr ago
                                                                </h6>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <p className="text-gray-800 text-sm font-normal leading-snug">
                                                        {item?.content}
                                                    </p>
                                                </div>
                                                {/* MAIN COMMENT REPLY */}


                                                <div className="w-full justify-between items-center inline-flex">
                                                    <div className="justify-start items-center gap-4 flex">

                                                        <div className="justify-start items-center gap-1.5 flex">
                                                            <Link to="">
                                                                <MessageSquareMore viewBox="0 0 24 24" width={24}
                                                                    height={24} />
                                                            </Link>
                                                            <button type='button' onClick={toggleVisibility} className="text-gray-900 text-sm font-normal leading-snug">
                                                                2 Replies
                                                            </button>

                                                        </div>
                                                        <div className="justify-start items-center gap-1.5 flex">
                                                            <Link to="">
                                                                <Heart viewBox="0 0 24 24" width={24}
                                                                    height={24} />
                                                            </Link>
                                                            <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                                                Reactions
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="justify-end items-center gap-1 flex">
                                                        <h5 className="text-gray-500 text-sm font-normal leading-snug">
                                                            30 Likes
                                                        </h5>
                                                    </div>
                                                </div>
                                                {isVisible && <CommentInputForm id={item._id} types='reply' />}

                                            </div>
                                            <Replies commentId={11} parentReplyId={12} />
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CommentBox


function CommentInputForm({ id, types }: { id: number, types: string }) {
    const type = types
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const onsubmit = async (data: any) => {
        if (!user) {
            setOpen(true);
            return;
        }

        try {
            if (type === "first_comment") {

                const response: any = await axios.post('/blog/comment/post_comment',
                    {
                        comment: data.comment,
                        blog_id: id
                    }
                );
                if (response.status !== 201) {
                    throw new Error("something error")
                }
                console.log(response.data.message);
            } else {
                const response: any = await axios.post('/blog/comment/post_comment/reply_comment',
                    {
                        reply: data.comment,
                        comment_id: id
                    }
                );
                if (response.status !== 201) {
                    throw new Error("something error")
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = () => {
        setOpen(false);
        navigate("/login");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} className="w-full relative flex justify-between gap-2">
                <input
                    type="text"
                    {...register("comment")}
                    className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                    placeholder="Write comments here...."
                />
                <Button variant={'outline'} type={'submit'} className="absolute right-6 top-[12px]">
                    <Send className='size-5' />
                </Button>
            </form>
            <AlertDialog open={open} setOpen={setOpen} handleLogin={handleLogin} />
        </>
    )
}

function Replies({ commentId, parentReplyId }: { commentId: number, parentReplyId: number }) {
    const { data } = useFetch({ url: `/blog/reply/get_replies?commentId=${commentId}&parentReplyId=${parentReplyId}`});
    const replies = data?.replies || [];
    return (
        <>
            {
                replies?.replies.map((reply: any) => (
                    <div key={reply?._id} className="w-full lg:pl-60 md:pl-20 sm:pl-10 pl-7 flex-col justify-start items-end gap-2.5 flex">
                        <div className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                            <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="justify-start items-center gap-2.5 flex">
                                        <div className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                                            <img
                                                className="rounded-full object-cover"
                                                src="https://pagedone.io/asset/uploads/1716546816.png"
                                                alt="James Anderson image"
                                            />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                                                James Anderson
                                            </h5>
                                            <h6 className="text-gray-500 text-xs font-normal leading-5">
                                                25 mins ago
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 relative">
                                        <div className="w-full h-fit flex">
                                            <div className="relative w-full">
                                                <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                                                <button
                                                    id="dropdown-button"
                                                    data-target="dropdown-3"
                                                    className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0"
                                                    type="button"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191"
                                                            stroke="black"
                                                            strokeWidth="2.5"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </button>
                                                <div
                                                    id="dropdown-3"
                                                    className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden"
                                                >
                                                    <ul
                                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                        aria-labelledby="dropdown-button"
                                                    >
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Edit
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Save
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Delete
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-800 text-sm font-normal leading-snug">
                                    I agree, and I also loved how the secondary characters
                                    evolved. Each one had their own unique arc that added depth
                                    to the overall narrative.
                                </p>
                            </div>
                            <div className="w-full justify-between items-center inline-flex">
                                <div className="justify-start items-center gap-4 flex">
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <a href="">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z"
                                                    stroke="black"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </a>
                                        <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                            Replies
                                        </h5>
                                    </div>
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <a href="">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z"
                                                    stroke="#111827"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </a>
                                        <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                            Reactions
                                        </h5>
                                    </div>
                                </div>
                                <div className="justify-end items-center gap-1 flex">
                                    <h5 className="text-gray-500 text-sm font-normal leading-snug">
                                        2
                                    </h5>
                                    <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                                        <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                                            <img
                                                className="w-3 h-3"
                                                src="https://pagedone.io/asset/uploads/1716545141.png"
                                                alt="Thumbs Up emoji"
                                            />
                                        </div>
                                        <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                                            <img
                                                className="w-3 h-3"
                                                src="https://pagedone.io/asset/uploads/1716545183.png"
                                                alt="Smiling eyes emoji"
                                            />
                                        </div>
                                        <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                                            <img
                                                className="w-3 h-3"
                                                src="https://pagedone.io/asset/uploads/1716545217.png"
                                                alt="hugging face emoji"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}


function AlertDialog({ open, setOpen, handleLogin }: { open: boolean, setOpen: any, handleLogin: any }) {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Login Required</DialogTitle>
                        <DialogDescription>
                            You must be logged in to post a comment.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button onClick={handleLogin}>Login</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}