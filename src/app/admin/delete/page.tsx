import DeleteLatestNews from '@/components/component/DeleteLatestNews'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'

const Page = () => {
  return (
    <>
    <Header />
    <section className='w-full min-h-0 px-[8%] py-[30px]'>
        <DeleteLatestNews />
    </section>
    <Footer />
    </>
  )
}

export default Page