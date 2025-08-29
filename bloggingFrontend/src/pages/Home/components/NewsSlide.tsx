import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import sport from '../../../assets/topic/Sport.jpg'
import fashion from '../../../assets/topic/fashion.jpg'
import Machine from '../../../assets/topic/machine.jpg'
import Health from '../../../assets/topic/health.jpg'
import Space from '../../../assets/topic/space.jpg'
import Nature from '../../../assets/topic/nature.jpg'
import Music from '../../../assets/topic/music.jpg'
import Finance from '../../../assets/topic/Finance.jpg'
import War from '../../../assets/topic/war.jpg'
import 'swiper/css';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import axios from '@/api/axios';

export function CustomSwiper() {
    const slides = [
        { city: 'Paris, France', image: 'https://images.pexels.com/photos/31530707/pexels-photo-31530707.jpeg', title: 'Explore React components and how they build modern interfaces.' },
        { city: 'Tokyo, Japan', image: 'https://images.pexels.com/photos/32438148/pexels-photo-32438148.jpeg', title: 'Dive into the world of server-side development with Node.js.' },
        { city: 'New York, USA', image: 'https://images.pexels.com/photos/4978696/pexels-photo-4978696.jpeg', title: 'Dive into the world of server-side development with Node.js.' },
    ];
    return (
        <div className='xl:col-span-6 lg:col-span-5 md:col-span-9'>
            {/* <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000, // 3 seconds
                    disableOnInteraction: false, // keeps autoplay after manual swipe
                }}
                spaceBetween={20}
                slidesPerView={1}
                // navigation
                // pagination={{ clickable: false }}
                breakpoints={{
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
                className='w-full max-w-screen-xl mx-auto'
            >
                {slides.map((slide, index) => (
                    <SwiperSlide className='' key={index}
                    >
                        <div className='relative'>
                            <img src={slide.image} className='w-full min-h-96 rounded-3xl' width={100} height={100} />
                            <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-6 top-6 text-gray-100 border-fuchsia-600">{slide.city}</span>
                            <a className="flex rounded-3xl absolute bottom-0  flex-col items-center justify-end p-6 text-center sm:p-8 group via-transparent flex-grow-1 bg-gradient-to-b from-gray-800/50 to-gray-900">
                                <span className="flex items-center mb-4 space-x-2 text-fuchsia-600">
                                    <span className="relative flex-shrink-0 w-2 h-2 rounded-full bg-fuchsia-600">
                                        <span className="absolute flex-shrink-0 w-3 h-3 rounded-full -left-1 -top-1 animate-ping bg-fuchsia-600"></span>
                                    </span>
                                    <span className="text-sm font-bold">Live</span>
                                </span>
                                <h1 rel="noopener noreferrer" href="#" className="font-serif text-2xl font-semibold group-hover:underline text-gray-100">{slide.title}</h1>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> */}
        </div>
    );
}

export function SmallCardSwiper() {
    const topics = [
        {
            id: 1,
            name: "Sports",
            image: sport
        },
        {
            id: 2,
            name: "Space",
            image: Space
        },
        {
            id: 3,
            name: "War",
            image: War
        },
        {
            id: 4,
            name: "Machine Learning",
            image: Machine
        },
        {
            id: 5,
            name: "Fashion",
            image: fashion
        },
        {
            id: 6,
            name: "Good Health",
            image: Health
        },
        {
            id: 7,
            name: "Nature",
            image: Nature
        },
        {
            id: 8,
            name: "Finance",
            image: Finance
        },
        {
            id: 9,
            name: "Music",
            image: Music
        },
    ]
    const plugin = React.useRef(
        Autoplay({
            delay: 2000,
            stopOnInteraction: true
        })
    )


    return (
        <div className=''>
            <Carousel
                plugins={[plugin.current]}
                className='w-full'
            >
                <CarouselContent className="-ml-1">
                    {
                        topics.map((item, index) => (
                            <CarouselItem key={index} className="pl-1 max-w-sm md:basis-1/3 lg:basis-1/5 p-2 ">
                                <AspectRatio ratio={2 / 2} className='border relative overflow-hidden rounded-3xl'>
                                    <img loading='lazy' className='w-full h-full object-cover rounded-3xl  transition duration-300 ease-in-out hover:scale-110 ' src={item?.image} alt='image' />
                                    <div className='absolute w-full bottom-0 h-14 flex items-center justify-center text-center '>
                                        <h4 className='text-2xl text-card-foreground dark:text-card-foreground font-bold'>{item?.name}</h4>
                                    </div>
                                </AspectRatio>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}





