import React from 'react'
import { NewsCard } from '../news-card'
import { Button } from '../ui/button'

const LatestNews = () => {
  return (
    <section className='w-full md:min-h-[55vh] lg:min-h-[55vh] min-h-[25vh] font-mono'>
      <span className="text-4xl font-bold border-b-4 border-red-500 pb-2">Свежие новости</span>
      <div className="w-full min-h-[40vh] lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1 gap-5 mt-12">
        <NewsCard
          id='1'
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          imageUrl="https://img3.wallspic.com/previews/8/0/5/5/45508/45508-sciences-ciel-le_lac_peyto-ecosysteme-les_reliefs_montagneux-x750.jpg"
          publishedAt="2022-01-01T00:00:00Z"
          url="#" 
        />
        
        <NewsCard
          id='2'
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          imageUrl="https://img3.wallspic.com/previews/8/0/5/5/45508/45508-sciences-ciel-le_lac_peyto-ecosysteme-les_reliefs_montagneux-x750.jpg"
          publishedAt="2022-01-01T00:00:00Z"
          url="#" 
        />

        <NewsCard
          id='3'
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          imageUrl="https://img3.wallspic.com/previews/8/0/5/5/45508/45508-sciences-ciel-le_lac_peyto-ecosysteme-les_reliefs_montagneux-x750.jpg"
          publishedAt="2022-01-01T00:00:00Z"
          url="#"
        />

        <NewsCard
          id='4'
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          imageUrl="https://img3.wallspic.com/previews/8/0/5/5/45508/45508-sciences-ciel-le_lac_peyto-ecosysteme-les_reliefs_montagneux-x750.jpg"
          publishedAt="2022-01-01T00:00:00Z"
          url="#"
        />

      </div>

      <div className="flex justify-center items-center">
        <Button className="bg-red-600 text-white rounded-xl hover:bg-black mt-6">
          Больше новостей
        </Button>
      </div>
    </section>
  )
}

export default LatestNews