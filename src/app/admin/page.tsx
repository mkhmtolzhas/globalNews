import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
    <Header />
    <section className='w-full min-h-0 px-[8%] py-[30px] grid grid-cols-2 font-mono'>
        <Link href='/admin/create' className='text-center'>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl'>
                Создать новость
            </button>
        </Link>
        <Link href='/admin/delete' className='text-center'>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl'>
                Удалить новость
            </button>
        </Link>
    </section>
    <Footer />
    </>
  )
}

export default page