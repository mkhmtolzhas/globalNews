import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'



interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  tags: string[];
}


export function NewsCard({ id, title, description, imageUrl, publishedAt, tags }: NewsArticle) {
  const sanitizedDate = publishedAt.replace(/\.\d+$/, ''); // Убираем лишние миллисекунды

  // Форматируем дату с кастомизацией
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short', // Сокращённое название месяца
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(sanitizedDate)).replace('г.,', '').replace('.', '');


  const handleDelete = async () => {
    try {
        const response = await axios.delete(`https://globalnewsapi-production-51a9.up.railway.app/api/v1/news/${id}`);
        console.log(response.data);
        toast.success('Новость успешно удалена');
    } catch (error) {
        console.error("Ошибка удаления новости:", error);
    } 
  }


  console.log(publishedAt)
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
            <time dateTime={sanitizedDate}>{formattedDate}</time>
            <span className="ml-auto border-2 rounded-xl px-2 ">{tags[0]}</span>
          </div>
          <Button className="bg-red-600 text-white rounded-xl hover:bg-black mt-6" onClick={handleDelete}>Удалить</Button>
        </CardContent>
      </Card>
  )
}

