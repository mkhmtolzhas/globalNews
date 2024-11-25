"use client"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react';

interface NewsArticleProps {
    title: string;
    image: string;
    content: string;
    publishDate: string;
    tags: string;
}

export default function NewsArticle({ title, image, content, publishDate, tags }: NewsArticleProps) {
    const [formattedDate, setFormattedDate] = useState(publishDate as string)
    const dateString = publishDate ? publishDate : '2021'
    const [formattedContent, setFormattedContent] = useState('')
    
    
    const imageLink = image ? image : '/images/placeholder.png'

    useEffect(() => {
        try {
            const sanitizedDate = dateString.replace(/\.\d+$/, '');

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
    }, [])

    useEffect(() => {
        try {
            const NewFormattedContent = content.replace(/(?:\r\n|\r|\n)/g, '<br />')
            setFormattedContent(NewFormattedContent)
            console.log(NewFormattedContent)
        }
        catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        console.log(title, image, content, publishDate, tags)
    }, [])

    

    return (
        <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>

            {/* Изображение */}
            <div className="mb-6">
            <Image 
                src={imageLink} 
                alt="Article cover image"
                width={800}
                height={400}
                className="rounded-lg object-cover w-full"
            />
            </div>

            {/* Дата и теги */}
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{formattedDate}</span>
            </div>

            {/* Теги */}
            <Badge className="mr-2">{tags}</Badge>
            </div>

            {/* Контент статьи */}
            <Card>
            <CardContent className="pt-6">
                <div className="prose max-w-none">
                
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: formattedContent }} />
                </div>
            </CardContent>
            </Card>
        </article>
        </main>
    )
}
