"use client"
import React from 'react'
import { NewsCard } from '../news-card'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { is } from 'date-fns/locale'
import Loading from './Loading'

const LatestNews = () => {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)

  
  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/?page=${page}&limit=8`)
      setNews(response.data)
      setPage(page + 1)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMoreNews = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/?page=${page}&limit=8`)
      setNews([...news, ...response.data])
      setPage(page + 1)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  
  useEffect(() => {
    fetchNews()
    setPage(page + 1)
  }, [])

  useEffect(() => {
    console.log(news)
  }, [news])


  return (
    <section className='w-full md:min-h-[55vh] lg:min-h-[55vh] min-h-[25vh] font-mono'>
      <span className="text-4xl font-bold border-b-4 border-red-500 pb-2">Свежие новости</span>
      <div className="w-full min-h-[40vh] lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1 gap-5 mt-12">
        {news.map((article) => (
          <NewsCard
            id={article['_id']}
            key={article['_id']}
            title={article["title"]}
            description={article["content"]}
            imageUrl={article["image"]}
            publishedAt={article["published_at"]}
            tags={article["tags"]}
          />
        ))}

      </div>
      
      <div className="flex justify-center items-center">
        {loading && <Loading /> || <Button className="bg-red-600 text-white rounded-xl hover:bg-black mt-6" onClick={fetchMoreNews}>
          Больше новостей
        </Button>} 
      </div> 
    </section>
  )
}

export default LatestNews