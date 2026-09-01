import { Link } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'
import { ArrowLeft, Sparkle, ShieldCheck, Lightning } from '@phosphor-icons/react'

export const AboutPage = () => {
  return (
    <div className='w-full min-h-[calc(100dvh-3.5rem)] bg-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto flex flex-col gap-10'>
        {/* Back Link */}
        <div>
          <Link
            to={RouteName.HOME}
            className='inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors'
          >
            <ArrowLeft size={15} />
            <span>Back to Studio</span>
          </Link>
        </div>

        {/* Header */}
        <div className='flex flex-col gap-2'>
          <span className='text-xs font-semibold uppercase tracking-wider text-[#E8590C]'>
            About VentStride
          </span>
          <h1 className='text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight'>
            Shareable workout stats without subscriptions.
          </h1>
          <p className='text-base text-neutral-600 leading-relaxed mt-1'>
            VentStride was built for runners, cyclists, and athletes who want clean, on-brand
            activity share cards and transparent overlays for social media.
          </p>
        </div>

        {/* Features / Why */}
        <div className='flex flex-col gap-6 pt-6 border-t border-neutral-200'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='p-4 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col gap-2'>
              <div className='w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[#E8590C]'>
                <Lightning size={18} weight='fill' />
              </div>
              <h3 className='text-sm font-semibold text-neutral-900'>No Account</h3>
              <p className='text-xs text-neutral-500 leading-relaxed'>
                Zero friction. Open the tool, type your numbers, and download your card immediately.
              </p>
            </div>

            <div className='p-4 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col gap-2'>
              <div className='w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[#E8590C]'>
                <Sparkle size={18} weight='fill' />
              </div>
              <h3 className='text-sm font-semibold text-neutral-900'>Multiple Formats</h3>
              <p className='text-xs text-neutral-500 leading-relaxed'>
                Export in 9:16 Story, 3:4 Portrait, 1:1 Square, or 16:9 Wide with transparent or
                styled backgrounds.
              </p>
            </div>

            <div className='p-4 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col gap-2'>
              <div className='w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[#E8590C]'>
                <ShieldCheck size={18} weight='fill' />
              </div>
              <h3 className='text-sm font-semibold text-neutral-900'>100% Private</h3>
              <p className='text-xs text-neutral-500 leading-relaxed'>
                Everything runs in your browser via HTML Canvas. No workout data is stored or sent
                to a server.
              </p>
            </div>
          </div>

          <div className='p-5 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col gap-2'>
            <h3 className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
              How to use the Transparent Overlay
            </h3>
            <p className='text-xs sm:text-sm text-neutral-600 leading-relaxed'>
              Download the PNG with the <strong>Overlay</strong> theme selected. Open Instagram
              Stories, pick the photo you took during your workout, tap the sticker button, select
              the photo sticker, and pick the downloaded PNG. The stats will float cleanly over your
              picture.
            </p>
          </div>

          <div className='pt-2 flex items-center justify-between'>
            <span className='text-xs text-neutral-400'>VentStride v0.2</span>
            <Link
              to={RouteName.HOME}
              className='px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all'
            >
              Open Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
