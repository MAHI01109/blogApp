
                <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
                    <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
                        <div className="flex  flex-col max-h-96 overflow-y-auto no-scrollbar  space-y-8 md:space-y-12">
                            {
                                latestBlogs.map((blog) => (
                                    <Link to={`/blog-view/${blog?.slug}`}>
                                        <div key={blog?.id} className="flex flex-col space-y-2">
                                            <h3 className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                                <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full bg-orange-600 dark:bg-orange-500"></span>
                                                <span className="text-xs font-bold tracking-wider uppercase">Exclusive</span>
                                            </h3>
                                            <a rel="noopener noreferrer" href="#" className="font-serif hover:underline">{blog?.title}</a>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{blog?.time} ago by
                                                <a rel="noopener noreferrer" href="#" className="hover:underline text-orange-600 dark:text-orange-500"> {blog?.author}</a>
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <div className="flex flex-col w-full space-y-2">
                            <div className="flex w-full h-1 bg-opacity-10 bg-orange-600 dark:bg-orange-500">
                                <div className="w-1/2 h-full bg-orange-600 dark:bg-orange-500"></div>
                            </div>
                            <a rel="noopener noreferrer" href="#" className="flex items-center justify-between w-full">
                                <span className="text-xs font-bold tracking-wider uppercase">See more exclusives</span>
                                <svg viewBox="0 0 24 24" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 strokeCurrent text-orange-600 dark:text-orange-400">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <CustomSwiper />
                    <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
                        <div className="mb-8 space-x-5 border-b-2 p-1 border-opacity-10 border-orange-600 dark:border-orange-500">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    type="button" className={` 
                                        text-xs font-bold uppercase hover:bg-gray-600/50 rounded  px-3 p-1
                                        ${activeTab === tab.id
                                            ? "border-b-3 border-orange-600 bg-gray-600"
                                            : "border-transparent text-gray-600 dark:text-gray-400"
                                        }
                                        `}>
                                    {tab.label}
                                </button>
                            ))}
                            {/* <button type="button" className=" border-transparent text-gray-600 dark:text-gray-400">Popular</button> */}
                        </div>
                        <div className="flex flex-col max-h-96 overflow-y-auto no-scrollbar  divide-y divide-gray-300 dark:divide-gray-700">
                            {
                                tabBlogs.map((blog) => (
                                    <Link to={`/blog-view/${blog?.slug}`}>
                                        <div key={blog?.id} className="flex px-1 py-4">
                                            <img alt={blog?.author} className="flex-shrink-0 object-cover w-20 h-20 mr-4 bg-gray-500 dark:bg-gray-500" src={blog?.thumbnail} />
                                            <div className="flex flex-col flex-grow">
                                                <a rel="noopener noreferrer" href="#" className="font-serif hover:underline">{blog?.title}</a>
                                                <p className="mt-auto text-xs text-gray-600 dark:text-gray-400">{blog?.time} ago By :
                                                    <a rel="noopener noreferrer" href="#" className="block text-blue-400 dark:text-blue-600 lg:ml-2 lg:inline hover:underline">{blog?.author}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>