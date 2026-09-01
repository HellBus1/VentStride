import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar'

const Root = () => {
  return (
    <div className='min-h-[100dvh] bg-white text-neutral-900 flex flex-col'>
      <Navbar />
      <main className='flex-1 w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Root
