"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NewsCard } from '../news-card';
import { Button } from '../ui/button';
import axios from 'axios';
import NewsArticle from './Item';
import SkeletonNewsCard from './SkeletonNewsCard';

// Динамический импорт Loading
const Loading = dynamic(() => import('./Loading'), { ssr: false });

// Скелетон карточки новостей


interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  image: string;
  published_at: string;
  tags: string[];
}

const LatestNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [skeletonCount, setSkeletonCount] = useState(8); // Начальное значение для скелетонов

  useEffect(() => {
    const fetchMoreNews = async () => {
      try {
        setLoading(true);
        if (page === 0) setNews([]); // Если первая страница, очищаем старые новости
        const response = await axios.get(
          `https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/?page=${page}&limit=8`
        );

        const newArticles = response.data;
        setNews((prevNews) =>
          page === 0 ? newArticles : [...prevNews, ...newArticles]
        );

        // Увеличиваем количество скелетонов в зависимости от полученных данных
        setSkeletonCount((prevCount) =>
          page === 0 ? newArticles.length : prevCount + newArticles.length
        );
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreNews();
  }, [page]);
  

  return (
    <section className="w-full md:min-h-[55vh] lg:min-h-[55vh] min-h-[25vh] font-mono">
      <span className="text-4xl font-bold border-b-4 border-red-600 pb-2">
        Свежие новости
      </span>
      <div className="w-full min-h-[40vh] lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1 gap-5 mt-12">
        {/* Показываем скелетон, если загрузка */}
        {loading && Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonNewsCard key={index} />
        ))}
        {/* Показываем карточки новостей после загрузки */}
        {!loading &&
          news.map((article) => (
            <NewsCard
              key={article['_id']}
              id={article['_id']}
              title={article['title']}
              description={article['content']}
              imageUrl={article['image']}
              publishedAt={article['published_at']}
              tags={article['tags']}
            />
          ))}
      </div>

      <div className="flex justify-center items-center">
        {loading ? (
          <Loading />
        ) : (
          <Button
            className="bg-red-600 text-white rounded-xl hover:bg-black mt-6"
            onClick={() => setPage(page + 1)}
            disabled={loading}
          >
            Больше новостей
          </Button>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
