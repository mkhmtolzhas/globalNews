'use client'
import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic';
import axios from 'axios';
import { NewsCard } from '../news-card';
import SkeletonNewsCard from './SkeletonNewsCard';


const Loading = dynamic(() => import('./Loading'), { ssr: false });

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  image: string;
  published_at: string;
  tags: string[];
}


export default function SearchComponent() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [skeletonCount, setSkeletonCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery])

  useEffect(() => {
    const fetchMoreNews = async () => {
      try {
        setLoading(true);
        setPage(0);
        if (page === 0) setNews([]);
        const response = await axios.get(
          `https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/title/${debouncedQuery}?page=${page}&limit=8`
        );

        const newArticles = response.data;
        setNews((prevNews) =>
          page === 0 ? newArticles : [...prevNews, ...newArticles]
        );

        setSkeletonCount((prevCount) =>
          page === 0 ? newArticles.length : prevCount + newArticles.length
        );
      } catch (error) {
        console.log("Ошибка загрузки новостей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreNews();
  }, [debouncedQuery])

  useEffect(() => {
    const fetchMoreNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/title/${debouncedQuery}?page=${page}&limit=8`
        );

        const newArticles = response.data;
        setNews(response.data);

        setSkeletonCount((prevCount) =>
          page === 0 ? newArticles.length : prevCount + newArticles.length
        );
      } catch (error) {
        console.log("Ошибка загрузки новостей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreNews();
  }, [page])

  return (
    <div>
      <div className="flex gap-2 mb-4 items-center justify-center">
        <Input
          type="text"
          placeholder="Enter your search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl"
        />
        <Button onClick={() => console.log("idk")} className=' bg-red-600 hover:bg-black text-white rounded-xl'>Search</Button>
      </div>

      
      <div className="w-full min-h-0 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1 gap-5 mt-12">
        {loading && Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonNewsCard key={index} />
        ))}
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
      {news.length === 0 && <p className="text-gray-500 text-center">No results found. Try a different search query.</p>}
      {news.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
        disabled={page === 0}
        className="mx-2 bg-gray-300 hover:bg-gray-400 text-black rounded-xl"
          >
        {"<"}
          </Button>
          <span className="mx-2 text-lg font-semibold">{page + 1}</span>
          <Button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className="mx-2 bg-gray-300 hover:bg-gray-400 text-black rounded-xl"
          >
        {">"}
          </Button>
        </div>
      )}
    </div>
  )
}

