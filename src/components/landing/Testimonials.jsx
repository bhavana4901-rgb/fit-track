import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Fitness Enthusiast',
    initials: 'SC',
    gradient: 'from-primary-500 to-primary-600',
    rating: 5,
    quote: 'FitTrack completely transformed my fitness journey. The analytics are so detailed and motivating. I can see my progress in real-time!'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Personal Trainer',
    initials: 'MJ',
    gradient: 'from-secondary-500 to-secondary-600',
    rating: 5,
    quote: 'As a trainer, I recommend FitTrack to all my clients. The features are comprehensive and the UI is intuitive. Game changer!'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    title: 'Health Coach',
    initials: 'ER',
    gradient: 'from-success-500 to-success-600',
    rating: 5,
    quote: 'The nutrition tracking and meal planning features are exceptional. My clients love the integration with their daily workouts.'
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Athlete',
    initials: 'DK',
    gradient: 'from-accent-500 to-accent-600',
    rating: 5,
    quote: 'Finally, an app that understands advanced training. The progress analytics helped me optimize my performance significantly.'
  },
  {
    id: 5,
    name: 'Jessica Williams',
    title: 'Wellness Expert',
    initials: 'JW',
    gradient: 'from-warning-500 to-warning-600',
    rating: 5,
    quote: 'The community features make fitness fun. I love the challenges and being able to connect with others pursuing similar goals.'
  },
  {
    id: 6,
    name: 'Alex Thompson',
    title: 'Marathon Runner',
    initials: 'AT',
    gradient: 'from-secondary-400 to-secondary-500',
    rating: 5,
    quote: 'Training with FitTrack gave me insights I never had before. The detailed metrics helped me run my personal best!'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
}

const cardHoverVariants = {
  hover: { y: -8, transition: { duration: 0.3 } }
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Loved by Thousands
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Real success stories from our community. See how FitTrack is transforming lives every day.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={cardHoverVariants.hover}
              className="group bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-900/20 transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star
                      className="w-4 h-4 fill-warning-400 text-warning-400"
                      strokeWidth={0}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-700 dark:text-neutral-300 mb-6 line-clamp-4">
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                >
                  {testimonial.initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-lg"
              >
                {/* Stars */}
                <div className="flex gap-1.5 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-warning-400 text-warning-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-700 dark:text-neutral-300 mb-8 text-base">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentIndex].gradient} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                  >
                    {testimonials[currentIndex].initials}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {testimonials[currentIndex].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary-600'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
