import React from 'react'

const SkeletonNewsCard = () => {
  return (
    <div className="w-full min-w-sm mx-auto overflow-hidden animate-pulse">
        <div className="relative h-48 w-full bg-gray-300 rounded-md"></div>
        <div className="p-4">
        <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="flex items-center mt-2">
            <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
            <div className="ml-auto h-6 w-12 bg-gray-300 rounded-full"></div>
        </div>
        </div>
    </div>
  )
}

export default SkeletonNewsCard