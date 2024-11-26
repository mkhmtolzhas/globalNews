"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

// Скелетон-компонент
const ArticleSkeleton = () => (
  <div className="animate-pulse">
    <h1 className="h-8 bg-gray-300 rounded-md mb-6 w-3/4"></h1>
    <div className="h-48 md:h-96 bg-gray-300 rounded-md mb-6"></div>
    <div className="flex items-center justify-between mb-6">
      <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
      <div className="h-6 bg-gray-300 rounded-md w-1/6"></div>
    </div>
    <Card>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-300 rounded-md"></div>
        ))}
      </CardContent>
    </Card>
  </div>
);

const Page = () => {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/${id}`
        );
        setNews(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  // Форматируем дату
  const formattedDate = news
    ? new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
        .format(new Date(news.published_at.replace(/\.\d+$/, '')))
        .replace('г.,', '')
        .replace('.', '')
    : '';

  const formattedContent = news
    ? news.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    : '';

  const tags = news?.tags ? news.tags[0] : 'Новости';

  return (
    <>
      <Header />
      <div className="w-full h-full flex items-center justify-center">
        <main className="container px-[8%] py-[30px]">
          {loading ? (
            <ArticleSkeleton />
          ) : (
            <article className="w-full">
              <h1 className="md:text-4xl text-2xl font-bold mb-4 md:w-[70%]">
                {news.title}
              </h1>
              {/* Изображение */}
              <div className="mb-6">
                <Image
                  src={news.image}
                  alt="Article cover image"
                  width={800}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              {/* Дата и теги */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2 md:text-lg text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <button className="mr-2 md:text-lg text-sm rounded border px-2">
                  {tags}
                </button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p
                      className="mb-4 md:text-lg text-sm"
                      dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />
                  </div>
                </CardContent>
              </Card>
            </article>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Page;
