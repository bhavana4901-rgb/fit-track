import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { fadeUpProps } from './landingMotion'
import * as ls from './landingStyles'
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Fitness Enthusiast',
    initials: 'SC',
    gradient: 'from-primary-500 to-blue-600',
    accent: 'border-primary-400',
    ring: 'ring-primary-400',
    bg: 'from-primary-50 to-blue-50 dark:from-primary-950/40 dark:to-blue-950/30',
    rating: 5,
    quote: 'FitTrack completely transformed my fitness journey. The analytics are so detailed and motivating!',
    style: 'quote',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Personal Trainer',
    initials: 'MJ',
    gradient: 'from-secondary-500 to-violet-600',
    accent: 'border-secondary-400',
    ring: 'ring-secondary-400',
    bg: 'from-secondary-50 to-violet-50 dark:from-secondary-950/40 dark:to-violet-950/30',
    rating: 5,
    quote: 'As a trainer, I recommend FitTrack to all my clients. Comprehensive features and intuitive UI.',
    style: 'bold',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    title: 'Health Coach',
    initials: 'ER',
    gradient: 'from-success-500 to-emerald-600',
    accent: 'border-success-400',
    ring: 'ring-success-400',
    bg: 'from-success-50 to-emerald-50 dark:from-success-950/40 dark:to-emerald-950/30',
    rating: 5,
    quote: 'The nutrition tracking and meal planning features are exceptional. My clients love the integration.',
    style: 'split',
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Athlete',
    initials: 'DK',
    gradient: 'from-accent-500 to-pink-600',
    accent: 'border-accent-400',
    ring: 'ring-accent-400',
    bg: 'from-accent-50 to-pink-50 dark:from-accent-950/40 dark:to-pink-950/30',
    rating: 5,
    quote: 'Finally, an app that understands advanced training. Progress analytics optimized my performance.',
    style: 'glass',
  },
  {
    id: 5,
    name: 'Jessica Williams',
    title: 'Wellness Expert',
    initials: 'JW',
    gradient: 'from-warning-500 to-amber-600',
    accent: 'border-warning-400',
    ring: 'ring-warning-400',
    bg: 'from-warning-50 to-amber-50 dark:from-warning-950/40 dark:to-amber-950/30',
    rating: 5,
    quote: 'The community features make fitness fun. Challenges and connecting with others pursuing similar goals.',
    style: 'quote',
  },
  {
    id: 6,
    name: 'Alex Thompson',
    title: 'Marathon Runner',
    initials: 'AT',
    gradient: 'from-primary-400 to-secondary-500',
    accent: 'border-primary-300',
    ring: 'ring-primary-300',
    bg: 'from-primary-50/80 to-secondary-50/80 dark:from-primary-950/30 dark:to-secondary-950/30',
    rating: 5,
    quote: 'Training with FitTrack gave me insights I never had before. Detailed metrics helped me hit a personal best!',
    style: 'bold',
  },
]
function StarRow({ count, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-1 flex-shrink-0" aria-label={`${count} star rating`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className={`${size} fill-warning-400 text-warning-400`} strokeWidth={0} />
      ))}
    </div>
  )
}
function TestimonialCard({ testimonial, isPrimary }) {
  const { style } = testimonial
  const inactive = !isPrimary ? 'opacity-85 scale-[0.98]' : ''
  if (style === 'bold') {
    return (
      <div
        className={`h-full min-h-[240px] sm:min-h-[280px] md:min-h-[300px] rounded-xl p-6 md:p-8 flex flex-col bg-gradient-to-br ${testimonial.gradient} text-white border border-white/20 shadow-sm transition-all duration-500 ${inactive}`}
      >
        <div className="flex flex-col flex-1 gap-4">
          <StarRow count={testimonial.rating} size="w-4 h-4" />
          <p className="text-base md:text-lg font-medium leading-relaxed flex-1">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/20 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold">
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold truncate">{testimonial.name}</p>
            <p className="text-white/75 text-sm truncate">{testimonial.title}</p>
          </div>
        </div>
      </div>
    )
  }
  if (style === 'split') {
    return (
      <div
        className={`h-full min-h-[240px] sm:min-h-[280px] md:min-h-[300px] rounded-xl overflow-hidden border ${testimonial.accent} bg-white dark:bg-neutral-900 shadow-sm flex flex-col transition-all duration-500 ${inactive}`}
      >
        <div className={`p-5 flex flex-col items-center bg-gradient-to-br ${testimonial.bg} flex-shrink-0`}>
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg mb-3`}>
            {testimonial.initials}
          </div>
          <p className="font-bold text-neutral-900 dark:text-white text-center text-sm">{testimonial.name}</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mt-0.5">{testimonial.title}</p>
          <div className="mt-3">
            <StarRow count={testimonial.rating} size="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="p-5 flex-1 flex items-start">
          <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>
      </div>
    )
  }
  if (style === 'glass') {
    return (
      <div
        className={`h-full min-h-[240px] sm:min-h-[280px] md:min-h-[300px] rounded-xl p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden flex flex-col transition-all duration-500 ${inactive}`}
      >
        <div className="relative z-10 flex flex-col flex-1 gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Quote className="w-8 h-8 text-primary-400/40 flex-shrink-0" />
            <StarRow count={testimonial.rating} />
          </div>
          <p className="text-sm md:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed flex-1">
            {testimonial.quote}
          </p>
          <div className="flex items-center gap-3 flex-shrink-0 pt-2">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
              {testimonial.initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-neutral-900 dark:text-white text-sm truncate">{testimonial.name}</p>
              <p className="text-xs text-neutral-500 truncate">{testimonial.title}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className={`h-full min-h-[240px] sm:min-h-[280px] md:min-h-[300px] rounded-xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 flex overflow-hidden transition-all duration-500 ${inactive}`}
    >
      <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${testimonial.gradient}`} />
      <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
        <div className="relative flex-1">
          <span
            className="absolute -top-1 left-0 text-5xl md:text-6xl font-serif text-neutral-200/80 dark:text-neutral-800 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <div className="relative z-10 pt-6 space-y-4">
            <StarRow count={testimonial.rating} />
            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {testimonial.quote}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5 flex-shrink-0">
          <div className={`w-11 h-11 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 ${testimonial.ring} bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-neutral-900 dark:text-white text-sm truncate">{testimonial.name}</p>
            <p className="text-xs text-neutral-500 truncate">{testimonial.title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = testimonials.length
  const visiblePair = useMemo(
    () => [
      testimonials[currentIndex],
      testimonials[(currentIndex + 1) % total],
    ],
    [currentIndex, total]
  )
  const goTo = useCallback(
    (index) => {
      const normalized = ((index % total) + total) % total
      setDirection(normalized > currentIndex || (currentIndex === total - 1 && normalized === 0) ? 1 : -1)
      setCurrentIndex(normalized)
    },
    [currentIndex, total]
  )
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])
  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '8%' : '-8%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d < 0 ? '8%' : '-8%', opacity: 0 }),
  }
  return (
    <section id="testimonials" className={`${ls.section} bg-white dark:bg-neutral-950`}>
      <div className={ls.container}>
        <motion.div
          className="text-center mb-12 md:mb-14"
          {...fadeUpProps(0)}
        >
          <span className={ls.eyebrow}>Testimonials</span>
          <h2 className={`${ls.heading} mb-4`}>
            Loved by <span className={ls.headingAccent}>thousands</span>
          </h2>
          <p className={`${ls.subheading} mx-auto`}>
            Real success stories from our community
          </p>
        </motion.div>
        <div className="relative">
          <div className="overflow-hidden min-h-[240px] sm:min-h-[280px] md:min-h-[300px] md:px-12 lg:px-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              >
                {visiblePair.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${currentIndex}-${testimonial.id}`}
                    testimonial={testimonial}
                    isPrimary={i === 0}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex md:hidden justify-center items-center gap-4 mt-5">
            <button
              type="button"
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 mt-8 sm:mt-10">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial pair starting at ${index + 1}`}
                className="p-1"
              >
                <motion.span
                  className={`block rounded-full ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                      : 'bg-neutral-300 dark:bg-neutral-700'
                  }`}
                  animate={{ width: index === currentIndex ? 28 : 8, height: 8 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing {currentIndex + 1} & {((currentIndex + 1) % total) + 1} of {total}
          </p>
        </div>
      </div>
    </section>
  )
}
