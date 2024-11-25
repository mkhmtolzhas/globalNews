"use client"
import React from 'react'
import HeroNews from '../component/HeroNews'
import LatestNews from '../component/LatestNews'

const Landing = () => {
  return (
    <div className="w-full min-h-0 px-[8%] py-[30px]">
        <HeroNews />
        <LatestNews />
    </div>
  )
}

export default Landing