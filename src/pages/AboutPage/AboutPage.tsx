import { Link } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'
import { ArrowLeft, Sparkle, ShieldCheck, Lightning } from '@phosphor-icons/react'

export const AboutPage = () => {
  return (
    <div className='w-full min-h-[calc(100dvh-4rem)] bg-[#10140F] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto flex flex-col gap-12'>
        {/* Back Link */}
        <div>
          <Link
            to={RouteName.HOME}
            className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A9986] hover:text-[#E8E4D9] transition-colors'
          >
            <ArrowLeft size={16} />
            <span>Back to Studio</span>
          </Link>
        </div>

        {/* Header */}
        <div className='flex flex-col gap-4'>
          <span className='text-xs font-semibold uppercase tracking-[0.2em] text-[#DDB967]'>
            About VentStride
          </span>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#E8E4D9] tracking-tight leading-[1.08]'>
            Shareable stat cards without the paywall.
          </h1>
          <p className='text-base sm:text-lg text-[#8A9986] leading-relaxed'>
            VentStride is a focused utility created for runners, cyclists, and athletes who want
            clean, on-brand activity share cards for social media.
          </p>
        </div>

        {/* Content Section: Why VentStride exists */}
        <div className='flex flex-col gap-8 pt-6 border-t border-[#2A3828]'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-2xl font-serif font-semibold text-[#E8E4D9]'>The Problem</h2>
            <p className='text-sm sm:text-base text-[#8A9986] leading-relaxed'>
              Strava is great for logging workouts, but many of its native share stickers and
              templates are locked behind paid subscriptions. VentStride lets you enter your
              activity numbers and generate a clean, story-ready 9:16 visual in seconds.
            </p>
          </div>

          {/* Pillars */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4'>
            <div className='p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl flex flex-col gap-3'>
              <div className='w-9 h-9 rounded-xl bg-[#1A2318] border border-[#2A3828] flex items-center justify-center text-[#DDB967]'>
                <Lightning size={20} weight='fill' />
              </div>
              <h3 className='text-base font-semibold text-[#E8E4D9]'>Zero Friction</h3>
              <p className='text-xs text-[#8A9986] leading-relaxed'>
                No sign-up, no login, no cookies. Open the page, input your stats, and export
                immediately.
              </p>
            </div>

            <div className='p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl flex flex-col gap-3'>
              <div className='w-9 h-9 rounded-xl bg-[#1A2318] border border-[#2A3828] flex items-center justify-center text-[#DDB967]'>
                <Sparkle size={20} weight='fill' />
              </div>
              <h3 className='text-base font-semibold text-[#E8E4D9]'>Curated Aesthetics</h3>
              <p className='text-xs text-[#8A9986] leading-relaxed'>
                Deep moss canvas, distinctive serif numbers, and hand-selected color swatches tuned
                for Instagram and TikTok.
              </p>
            </div>

            <div className='p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl flex flex-col gap-3'>
              <div className='w-9 h-9 rounded-xl bg-[#1A2318] border border-[#2A3828] flex items-center justify-center text-[#DDB967]'>
                <ShieldCheck size={20} weight='fill' />
              </div>
              <h3 className='text-base font-semibold text-[#E8E4D9]'>100% Client-Side</h3>
              <p className='text-xs text-[#8A9986] leading-relaxed'>
                Your activity data stays in your browser. All SVG rendering and PNG exports happen
                on your machine.
              </p>
            </div>
          </div>

          {/* Technical Pipeline */}
          <div className='p-6 bg-[#151C14] border border-[#2A3828] rounded-2xl flex flex-col gap-3'>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-[#8A9986]'>
              Under The Hood
            </h3>
            <p className='text-xs sm:text-sm text-[#8A9986] leading-relaxed'>
              Cards are rendered as native vector SVGs in a 1080 × 1920 viewport. When you export,
              typography rules are embedded and rendered via HTML5 canvas to produce crisp 300 DPI
              PNGs ready for instant sharing.
            </p>
          </div>

          {/* CTA back to studio */}
          <div className='pt-4 flex items-center justify-between'>
            <span className='text-xs text-[#5A6856]'>VentStride v0.1 MVP</span>
            <Link
              to={RouteName.HOME}
              className='px-5 py-2.5 rounded-xl bg-[#DDB967] text-[#10140F] text-xs font-semibold hover:brightness-110 transition-all shadow-md'
            >
              Open Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
