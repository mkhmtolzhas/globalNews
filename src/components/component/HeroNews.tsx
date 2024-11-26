"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import HeroNewsComponent from './HeroNewsComponent';
import axios from 'axios';
import SkeletonHeroNewsComponent from './SkeletonNewsHeroComponent';

const HeroNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/?page=0&limit=3`
      );
      setNews(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="w-full md:h-[55vh] lg:h-[55vh] h-[25vh] flex justify-center items-center font-mono mb-16">
      <div className="w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <SkeletonHeroNewsComponent />
                </SwiperSlide>
              ))
            : news.map((item) => (
                <SwiperSlide key={item['_id']}>
                  <HeroNewsComponent
                    title={item['title']}
                    description={item['content']}
                    imageUrl={item['image']}
                    id={`${item['_id']}`}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroNews;
