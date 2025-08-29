import { useState } from "react";
import NewsLetter from "@/components/NewsLetter";
import { useEffect } from "react";
import axios from '@/api/axios'
import { Link } from 'react-router-dom'
import { CustomSwiper, SmallCardSwiper } from "./components/NewsSlide";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import VerticalCarousel from "@/pages/Home/components/VerticalCarousel";
import Forest from '../../assets/topic/nature.jpg'
import sport from '../../assets/topic/Sport.jpg'

import BlogsCategory from "./components/BlogsCategory";


export default function Home() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState("latest");
    const [tabBlogs, setTabBlogs] = useState([]);


    const tabs = [
        { id: "latest", label: "Latest" },
        { id: "popular", label: "Popular" },
    ];
    useEffect(() => {
        async function fetchTabsBlogs() {
            switch (activeTab) {
                case "latest": {
                    const response = await axios.get('/blog/latest-blogs');
                    return setTabBlogs(response.data.blogs)
                };
                case "popular": {
                    const response = await axios.get('/blog/popular-blogs');
                    return setTabBlogs(response.data.blogs)
                }
            }
        }
        fetchTabsBlogs()

    }, [activeTab])


    async function getblogs() {
        try {
            const response = await axios.get('/blog/all-blogs');
            setAllBlogs(response.data.blogs);
            // console.log(response.data.result, "res");
        } catch (error) {
            console.log(error);
        }

    }

    const latestBLogs = async () => {
        try {
            const response = await axios.get('/blog/latest-blogs');
            setLatestBlogs(response.data.blogs)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getblogs();
        latestBLogs();
    }, []);

    return (
        <div className="">
            <section className="section-spacing max-w-7xl mx-auto ">
                <div className="grid grid-cols-12">
                    <div className="relative col-span-12  rounded-2xl lg:col-span-6 bg-amber-900 " >
                        <img src={Forest} alt="" className="w-full h-full rounded-2xl aspect-square object-cover " />
                        <div className="absolute w-full bg-black/50 h-full rounded-2xl top-0 flex flex-col items-center justify-center p-8 py-12 text-center text-gray-100  dark:border-1">
                            <span>12 June</span>
                            <h1 className="py-4 text-5xl font-bold">Lorem, ipsum dolor sit amet consectetur adipisicing.</h1>
                            <p className="pb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-3 divide-gray-300 dark:divide-gray-700">
                        <div className="flex items-center space-x-4">
                            <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-30 h-30 rounded bg-gray-500" />
                            <div className="pt-6 pb-4 space-y-2">
                                <span>12 June</span>
                                <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                                <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm text-indigo-600 dark:text-indigo-400">
                                    <span>Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-30 h-30 rounded bg-gray-500" />
                            <div className="pt-6 pb-4 space-y-2">
                                <span>12 June</span>
                                <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                                <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm text-indigo-600 dark:text-indigo-400">
                                    <span>Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src="" alt="" className="w-30 h-30 rounded bg-gray-500" />
                            <div className="pt-6 pb-4 space-y-2">
                                <span>12 June</span>
                                <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                                <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm text-indigo-600 dark:text-indigo-400">
                                    <span>Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-spacing mx-auto max-w-7xl">
                <div className="max-w-7xl p-5 mx-auto ">
                    <div className="space-y-2 pb-7 flex items-center justify-between text-start">
                        <h2 className="text-4xl mb-2 font-bold text-start">Innovation & Tech</h2>
                        <h3 className="text-xl hover:text-primary">See All Topics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="max-w-s">
                            <CardHeader >
                                <CardTitle className="text-center text space-y-2 my-3">Login to your account</CardTitle>
                                <CardDescription className="text-center space-y-2 text-3xl font-semibold">
                                    Enter your email below to login to your account
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <div className="rounded">
                                    <img className="w-full h-full rounded-t-full"
                                        src={'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/post-seo-grid-01-390x260.jpg'} alt="" />
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="max-w-s">
                            <CardHeader >
                                <CardTitle className="text-center text space-y-2 my-3">Login to your account</CardTitle>
                                <CardDescription className="text-center space-y-2 text-3xl font-semibold">
                                    Enter your email below to login to your account
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <div className="rounded">
                                    <img className="w-full h-full rounded-t-full"
                                        src={'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/demo_image-21-390x260.jpg'} alt="" />
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="max-w-s">
                            <CardHeader >
                                <CardTitle className="text-center text space-y-2 my-3">Login to your account</CardTitle>
                                <CardDescription className="text-center space-y-2 text-3xl font-semibold">
                                    Enter your email below to login to your account
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <div className="rounded">
                                    <img className="w-full h-full rounded-t-full"
                                        src={'https://new.axilthemes.com/themes/blogar/wp-content/uploads/2021/01/post-seo-grid-01-390x260.jpg'} alt="" />
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="section-spacing mx-auto max-w-7xl">
                <div className="max-w-7xl p-5 mx-auto ">
                    <div className="space-y-2 pb-7 flex items-center justify-between text-start">
                        <h2 className="text-4xl mb-2 font-bold text-start">Most Popular</h2>
                        <h3 className="text-xl hover:text-primary">See All Topics</h3>
                    </div>
                    <div className="grid md:grid-cols-4 gap-5 h-[30rem]">
                        <div className="col-span-2 py-0 row-span-2">
                            <div className=" rounded-2xl relative h-full w-full ">
                                <img alt={''} className="w-full h-full rounded-2xl" src={Forest} width={100} height={100} />
                                <div className="absolute h-24 w-full bottom-16 ">
                                    <div className="mx-auto max-w-sm  lg:max-w-lg bg-card min-h-36 rounded-2xl p-4 dark:border-1">
                                        <span>12 June</span>
                                        <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                                        <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm text-indigo-600 dark:text-indigo-400">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className=" rounded-2xl relative  w-full ">
                                <img alt={''} className="w-full h-60 rounded-2xl object-cover" src={sport} width={100} height={100} />
                                <div className="absolute h-24   w-full   bottom-14">
                                    <div className="mx-auto  max-w-sm lg:max-w-lg bg-card h-36 rounded-2xl p-4 dark:border-1 ">
                                        <span>12 June</span>
                                        <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                                        <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm text-indigo-600 dark:text-indigo-400">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className=" rounded-2xl relative w-full ">
                                <img alt={''} className="w-full h-60 rounded-2xl" src={Forest} width={100} height={100} />
                                <div className="absolute h-24   w-full   bottom-14">
                                    <div className="mx-auto  max-w-sm lg:max-w-lg bg-card h-36 rounded-2xl p-4 dark:border-1 ">
                                        <span>12 June</span>
                                        <h1 className="text-3xl font-bold">Lorem ipsum dolor sit.</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!</p>
                                        <a rel="noopener noreferrer" href="#" className="inline-flex items-center py-2 space-x-2 text-sm text-indigo-600 dark:text-indigo-400">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-spacing bg-card dark:bg-card dark:text-card-foreground">
                <div className="max-w-7xl p-5 mx-auto ">
                    <div className="space-y-2 pb-7 flex items-center justify-between text-start">
                        <h2 className="text-4xl mb-2 font-bold text-start">Trending Topics</h2>
                        <h3 className="text-xl hover:text-primary">See All Topics</h3>
                    </div>
                    <SmallCardSwiper />
                </div>
            </section>
            <section className="section-spacing max-w-7xl mx-auto bg-background ">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[70%_auto] lg:gap-8">


                    <div className="rounded">
                        <div className="space-y-2 pb-7 text-start">
                            <h2 className="text-4xl mb-2 font-bold text-start">Trending Blogs</h2>
                        </div>
                        <div className="grid grid-cols-1 col-span-3 gap-3">
                            {Array(1, 2, 3, 4, 5).map(() => (
                                <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                                    <div className="container max-w-7xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Jun 1, 2020</span>
                                            <a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded bg-fuchsia-600 dark:bg-fuchsia-400 text-gray-50 dark:text-gray-900">Javascript</a>
                                        </div>
                                        <div className="mt-3">
                                            <a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">Nos creasse pendere crescit angelos etc</a>
                                            <p className="mt-2">Tamquam ita veritas res equidem. Ea in ad expertus paulatim poterunt. Imo volo aspi novi tur. Ferre hic neque vulgo hae athei spero. Tantumdem naturales excaecant notaverim etc cau perfacile occurrere. Loco visa to du huic at in dixi aër.</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <a rel="noopener noreferrer" href="#" className="hover:underline text-fuchsia-600 dark:text-fuchsia-400">Read more</a>
                                            <div>
                                                <a rel="noopener noreferrer" href="#" className="flex items-center">
                                                    <img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full bg-gray-500 dark:bg-gray-500" />
                                                    <span className="hover:underline text-gray-600 dark:text-gray-400">Leroy Jenkins</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" rounded">
                        <div className="space-y-2 pb-7 text-start">
                            <h2 className="text-4xl mb-2 font-bold text-start">Blogs Category</h2>
                        </div>
                        <BlogsCategory />
                    </div>
                </div>
            </section>
            <section className="section-spacing bg-card">
                <NewsLetter />
            </section>
        </div>
    );
};


