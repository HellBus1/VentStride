import { Link, useLocation } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <header className='sticky top-0 z-50 w-full h-14 border-b border-neutral-200 bg-white/90 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between'>
        {/* Brand */}
        <Link to={RouteName.HOME} className='flex items-center gap-2.5 group'>
          <div className='w-7 h-7 rounded-lg bg-[#E8590C] flex items-center justify-center text-white font-bold text-xs shadow-sm'>
            VS
          </div>
          <div className='flex items-baseline gap-1.5'>
            <span className='font-bold text-base tracking-tight text-neutral-900'>VentStride</span>
            <span className='text-[11px] text-neutral-400 font-medium hidden sm:inline'>
              Stats Card Studio
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className='flex items-center gap-2'>
          <Link
            to={RouteName.HOME}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
              pathname === RouteName.HOME
                ? 'bg-neutral-100 text-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            Studio
          </Link>
          <Link
            to={RouteName.ABOUT}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
              pathname === RouteName.ABOUT
                ? 'bg-neutral-100 text-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
