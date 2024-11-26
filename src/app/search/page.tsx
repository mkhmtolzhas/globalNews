"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import axios from 'axios'
import SearchComponent from '@/components/component/SearchComponent'

interface NewsArticle {
    _id: string;
    title: string;
    content: string;
    image: string;
    published_at: string;
    tags: string[];
  }

const SearchPage = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [skeletonCount, setSkeletonCount] = useState(8);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchMoreNews = async () => {
            try {
                setLoading(true);
                if (page === 0) setNews([]);
                const response = await axios.get(
                    `https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/?page=${page}&limit=8`
                );

                const newArticles = response.data;
                setNews((prevNews) =>
                    page === 0 ? newArticles : [...prevNews, ...newArticles]
                );

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
    }, [search])

    return (
        <div className="font-mono">
            <Header />
            <section className='w-full min-h-0 px-[8%] py-[30px]'>
                <SearchComponent />
            </section>
            <Footer />
        </div>
    )
}

export default SearchPage