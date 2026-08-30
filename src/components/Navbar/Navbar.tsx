import { Link, useLocation } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <header className='sticky top-0 z-50 w-full h-16 border-b border-[#2A3828]/60 bg-[#10140F]/90 backdrop-blur-md'>
      <div className='max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        {/* Brand wordmark */}
        <Link
          to={RouteName.HOME}
          className='group flex items-center gap-2.5 transition-opacity hover:opacity-90'
        >
          <div className='w-8 h-8 rounded-lg bg-[#1A2318] border border-[#2A3828] flex items-center justify-center text-[#DDB967] font-semibold text-sm tracking-wider shadow-sm group-hover:border-[#DDB967]/50 transition-colors'>
            VS
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold text-base tracking-tight text-[#E8E4D9]'>
              VentStride
            </span>
            <span className='text-[10px] text-[#8A9986] tracking-wider uppercase font-medium'>
              Stat Card Studio
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className='flex items-center gap-1 sm:gap-2'>
          <Link
            to={RouteName.HOME}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              pathname === RouteName.HOME
                ? 'bg-[#1A2318] text-[#DDB967] border border-[#DDB967]/30 shadow-sm'
                : 'text-[#8A9986] hover:text-[#E8E4D9] hover:bg-[#151C14]'
            }`}
          >
            Studio
          </Link>
          <Link
            to={RouteName.ABOUT}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              pathname === RouteName.ABOUT
                ? 'bg-[#1A2318] text-[#DDB967] border border-[#DDB967]/30 shadow-sm'
                : 'text-[#8A9986] hover:text-[#E8E4D9] hover:bg-[#151C14]'
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
