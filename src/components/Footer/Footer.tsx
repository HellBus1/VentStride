import { EnvelopeSimple, ChatCircleDots } from '@phosphor-icons/react'

export const Footer = () => {
  return (
    <footer className='w-full border-t border-neutral-200 bg-white py-8 px-4 sm:px-6 mt-12'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
        {/* Brand & Note */}
        <div className='flex flex-col items-center sm:items-start gap-1 text-center sm:text-left'>
          <div className='flex items-center gap-2'>
            <div className='w-5 h-5 rounded bg-[#E8590C] text-white text-[10px] font-bold flex items-center justify-center'>
              VS
            </div>
            <span className='font-bold text-sm text-neutral-900'>VentStride</span>
          </div>
          <p className='text-xs text-neutral-500'>
            Free client-side activity stat card generator for Strava athletes.
          </p>
        </div>

        {/* Contact & Feedback Email */}
        <div className='flex items-center gap-2'>
          <a
            href='mailto:mosmatter1@gmail.com?subject=VentStride%20Feedback%20%26%20Feature%20Request'
            className='inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 text-xs font-semibold transition-colors'
          >
            <EnvelopeSimple size={16} className='text-[#E8590C]' />
            <span>Comments & Feature Requests: mosmatter1@gmail.com</span>
            <ChatCircleDots size={14} className='text-neutral-400' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
