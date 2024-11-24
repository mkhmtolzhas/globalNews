import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
}


export function NewsCard({ title, description, imageUrl, publishedAt, url }: NewsArticle) {
  return (
    <Card className="w-full min-w-sm mx-auto overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className='object-cover w-full h-full'
        />
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-1 h-4 w-4" />
          <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString()}</time>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-red-600 text-white rounded-xl hover:bg-black">
          <a href={url} target="_blank" rel="noopener noreferrer">Read More</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

