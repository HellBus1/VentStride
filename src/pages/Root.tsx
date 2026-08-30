import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'

const Root = () => {
  return (
    <div className='min-h-[100dvh] bg-[#10140F] text-[#E8E4D9] flex flex-col'>
      <Navbar />
      <main className='flex-1 w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Root
