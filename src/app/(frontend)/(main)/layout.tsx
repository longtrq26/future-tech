import React from 'react'
import Footer from '@/components/shared/layout/footer'
import Header from '@/components/shared/layout/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
