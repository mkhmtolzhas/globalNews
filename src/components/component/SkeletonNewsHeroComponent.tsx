"use client"
import React from 'react';

const SkeletonHeroNewsComponent: React.FC = () => {
  return (
    <div className="relative w-full md:h-[55vh] lg:h-[55vh] h-[25vh] rounded-xl overflow-hidden animate-pulse">
      {/* Заглушка для изображения */}
      <div className="absolute inset-0 bg-gray-300"></div>
      {/* Градиентная заглушка */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-400 to-transparent"></div>
      {/* Заглушка для текста */}
      <div className="absolute bottom-0 left-0 p-[5%] w-full space-y-2">
        <div className="h-6 bg-gray-400 rounded-md"></div>
        <div className="h-4 bg-gray-400 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonHeroNewsComponent;
