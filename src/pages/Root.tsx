import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

const Root = () => {
  return (
    <div className='min-h-[100dvh] bg-[#FBFBFA] text-neutral-900 flex flex-col justify-between'>
      <div>
        <Navbar />
        <main className='flex-1 w-full'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Root
