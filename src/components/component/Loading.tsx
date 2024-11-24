"use client"
import React from 'react'
import { zoomies } from 'ldrs'

zoomies.register()


const Loading = () => {
    return (
        <section className='w-full flex justify-center items-center px-[8%] py-[30px]'>
            <l-zoomies
            size="80"
            stroke="5"
            bg-opacity="0.1"
            speed="1.4" 
            color="black" 
            >
            </l-zoomies>

        </section>
    )
}


export default Loading