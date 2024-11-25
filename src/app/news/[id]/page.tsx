"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import NewsArticle from '@/components/component/Item'

const Page = () => {
    const { id } = useParams()
    const [news, setNews] = useState(Object)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/${id}`)
                setNews(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchNews()
    }, [])

    

    return (
        <>
            <Header />
            {news && (
            <NewsArticle 
                title={news['title']}
                image={news['image']}
                content={news['content']}
                publishDate={news['published_at']}
                tags={news['tags']}
            />
            )}
            <Footer />
        </>
    )
}

export default Page