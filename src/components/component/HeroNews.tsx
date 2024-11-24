"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const HeroNews = () => {
  return (
    <section className='w-full md:h-[55vh] lg:h-[55vh] h-[25vh] flex justify-center items-center font-mono mb-16'>
        <div className="w-full">
            <Swiper
            modules={[Pagination,Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            
            >
                <SwiperSlide>
                    <div className='w-full md:h-[55vh] lg:h-[55vh] h-[25vh] bg-red-500 flex justify-center items-center rounded-xl'>
                        <h1 className='text-4xl text-white'>Slide 1</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full md:h-[55vh] lg:h-[55vh] h-[25vh] bg-green-500 flex justify-center items-center rounded-xl'>
                        <h1 className='text-4xl text-white'>Slide 2</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='w-full md:h-[55vh] lg:h-[55vh] h-[25vh] bg-blue-500 flex justify-center items-center rounded-xl'>
                        <h1 className='text-4xl text-white'>Slide 3</h1>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    </section>
  )
}

export default HeroNews