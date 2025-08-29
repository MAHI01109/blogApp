import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
function VerticalCarousel() {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      plugins={
        [Autoplay({
          delay: 2000,
          stopOnInteraction: true
        })]
      }
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 aspect-video h-96">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}

export default VerticalCarousel