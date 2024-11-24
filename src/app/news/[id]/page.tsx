"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from 'lucide-react';

const page = () => {
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

    const [formattedDate, setFormattedDate] = useState('')
    const [formattedContent, setFormattedContent] = useState('')

    useEffect(() => {
        try {
            const sanitizedDate = news['published_at'].replace(/\.\d+$/, ''); // Убираем лишние данные из даты

            const NewFormattedDate = new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).format(new Date(sanitizedDate)).replace('г.,', '').replace('.', '');

            setFormattedDate(NewFormattedDate)
        }
        catch (error) {
            console.error(error)
        }
    }, [news])

    useEffect(() => {
        try {
            const NewFormattedContent = news['content'].replace(/(?:\r\n|\r|\n)/g, '<br />')
            setFormattedContent(NewFormattedContent)
        }
        catch (error) {
            console.error(error)
        }
    }, [news])

    const tags = news['tags'] ? news['tags'][0] : 'Новости'


    return (
        <>
            <Header />
            <div className="w-full h-full flex items-center justify-center">
                <main className="container px-[8%] py-[30px]">
                    <article className="w-full">
                        <h1 className="md:text-4xl text-2xl font-bold mb-4 md:w-[70%]">{news['title']}</h1>
                        {/* Изображение */}
                        <div className="mb-6">
                            <Image 
                                src={news['image']} 
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

                            <button className="mr-2 md:text-lg text-sm rounded border px-2">{tags}</button>
                        </div>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="prose max-w-none">
                                    <p className="mb-4 md:text-lg text-sm" dangerouslySetInnerHTML={{ __html: formattedContent }} />
                                </div>
                            </CardContent>
                        </Card>
                    </article>
                </main>

            </div>
            <Footer />
        </>
    )
}

export default page