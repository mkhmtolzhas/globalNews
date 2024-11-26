import CreateNewsPage from '@/components/component/CreateNews'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'

const page = () => {
  return (
    <>
    <Header />
    <div className="w-full min-h-1 px-[8%] py-[30px]">
        <CreateNewsPage />
    </div>
    <Footer />
    </>
  )
}

export default page