import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '@/api/axios';
import CommentBox from '@/pages/Blog/components/CommentBox';

export default function SingleBlogPage() {
    const { slug } = useParams();
    const id = slug;
    const [blog, setBlog] = useState([]);

    const fetchBlogbySlugId = async () => {
        try {
            const response = await axios.get(`/blog/single-blog/${id}`);
            console.log(response.data.blog);
            setBlog(response.data.blog)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogbySlugId()
    }, [])

    return (
        <div>
            <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                {
                    blog.map((item) => (
                        <div key={item?.id} className="flex flex-col max-w-5xl mx-auto overflow-hidden rounded">
                            <picture>
                                <img loading='lazy' src={item?.thumbnail} alt="blog cover image" className="w-full h-60 sm:h-96 object-cover bg-gray-500 dark:bg-gray-500" />
                            </picture>
                            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50 dark:bg-gray-900">

                                <article className="space-y-8 ">
                                    <div className="space-y-6">
                                        <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{item?.title}</h1>
                                        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center md:space-x-2">
                                                <img src={item?.owner?.profileImage} alt="" className="w-8 h-8 border rounded-full bg-gray-500 dark:bg-gray-500 border-gray-300 dark:border-gray-700" />
                                                <p className="text-sm">{item?.author} • {item?.postDate}</p>
                                            </div>
                                            <p className="flex-shrink-0 mt-3 text-sm md:mt-0"> {item?.views} views</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-800 dark:text-gray-100">
                                        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
                                    </div>
                                </article>
                                <div>
                                    <div className="flex flex-wrap py-6 gap-2 border-t border-dashed border-gray-600 dark:border-gray-400">
                                        {
                                            item?.tags.map((tag) => (
                                                <a rel="noopener noreferrer" href="#" className="px-3 py-1 rounded-sm hover:underline bg-orange-600 dark:bg-orange-400 text-gray-50 dark:text-gray-900"># {tag}</a>
                                            ))
                                        }
                                    </div>

                                    {/* <div className="space-y-2">
                                        <h4 className="text-lg font-semibold">Related posts</h4>
                                        <ul className="ml-4 space-y-1 list-disc">
                                            <li>
                                                <a rel="noopener noreferrer" href="#" className="hover:underline">Nunc id magna mollis</a>
                                            </li>
                                            <li>
                                                <a rel="noopener noreferrer" href="#" className="hover:underline">Duis molestie, neque eget pretium lobortis</a>
                                            </li>
                                            <li>
                                                <a rel="noopener noreferrer" href="#" className="hover:underline">Mauris nec urna volutpat, aliquam lectus sit amet</a>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <CommentBox blog_id={item?.id} />
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
