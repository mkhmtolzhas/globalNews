import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
}

const HeroNewsComponent: React.FC<NewsCardProps> = ({ title, description, imageUrl, id }) => {
  return (
    <Link href={`/news/${id}`}>
      <div className='relative w-full md:h-[55vh] lg:h-[55vh] h-[25vh] rounded-xl overflow-hidden'>
        <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-[5%] z-20 w-full">
                <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-white line-clamp-2">{title}</h2>
                <p className="text-sm md:text-base text-gray-200 line-clamp-2">{description}</p>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default HeroNewsComponent;
