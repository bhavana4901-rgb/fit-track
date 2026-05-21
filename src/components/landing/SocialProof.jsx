import { motion } from 'framer-motion'
import { Star, Users, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PARTNER_LOGOS } from './PartnerLogos'

export default function SocialProof() {
  const [userCount, setUserCount] = useState(0)
  const [rating, setRating] = useState(0)
  const finalUserCount = 50000
  const finalRating = 4.9

  useEffect(() => {
    const userInterval = setInterval(() => {
      setUserCount((prev) => (prev < finalUserCount ? Math.min(prev + finalUserCount / 60, finalUserCount) : prev))
    }, 30)
    const ratingInterval = setInterval(() => {
      setRating((prev) => (prev < finalRating ? Math.min(prev + finalRating / 60, finalRating) : prev))
    }, 30)
    return () => {
      clearInterval(userInterval)
      clearInterval(ratingInterval)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-neutral-950">
      {/* Dark trust-section atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.12),_transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-14 md:space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Social proof
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                thousands
              </span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Join our growing community of fitness enthusiasts achieving their goals every day
            </p>
          </motion.div>

          {/* Stats — asymmetric glass panels (not box cards) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
            {/* Users — wide glass panel with ring */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-3 relative overflow-hidden rounded-3xl p-8 md:p-10 backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-transparent" />
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="relative flex-shrink-0">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <motion.circle
                      cx="60" cy="60" r="52" fill="none" stroke="url(#userRingGrad)" strokeWidth="8"
                      strokeLinecap="round" strokeDasharray="327" strokeDashoffset="65"
                      initial={{ strokeDashoffset: 327 }}
                      whileInView={{ strokeDashoffset: 65 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="userRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary-400" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-5xl md:text-6xl font-black text-white tracking-tight">
                    {Math.round(userCount).toLocaleString()}
                    <span className="text-primary-400">+</span>
                  </p>
                  <p className="text-lg font-semibold text-neutral-200 mt-1">Active Users</p>
                  <p className="text-sm text-neutral-500 mt-2">Growing every single day</p>
                  <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                    {['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'].map((c, i) => (
                      <motion.div
                        key={c}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="w-8 h-8 rounded-full border-2 border-neutral-950"
                        style={{ backgroundColor: c, marginLeft: i > 0 ? -12 : 0 }}
                      />
                    ))}
                    <span className="text-xs text-neutral-500 self-center ml-2">+50K joined</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rating — compact gold-accent panel */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-warning-500/20 via-neutral-900 to-neutral-950 border border-warning-500/30"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.25),transparent_60%)]" />
              <div className="relative">
                <div className="flex gap-1 mb-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.08, type: 'spring' }}
                    >
                      <Star className="w-7 h-7 text-warning-400 fill-warning-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-6xl font-black text-white">{rating.toFixed(1)}</p>
                <p className="text-warning-300 font-semibold mt-1">App Store Rating</p>
                <p className="text-xs text-neutral-500 mt-2">10,000+ verified reviews</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Partners — hexagon logo strip */}
          <motion.div variants={itemVariants} className="space-y-5">
            <p className="text-center text-neutral-500 text-sm uppercase tracking-widest font-medium">
              Trusted by leading companies
            </p>
            <div className="relative rounded-2xl py-8 px-4 bg-white/[0.03] border border-white/5 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
              <motion.div
                className="flex gap-8 md:gap-12 items-center justify-center flex-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {PARTNER_LOGOS.map((partner, i) => {
                  const Logo = partner.Logo
                  return (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -6, scale: 1.05 }}
                      className="group flex-shrink-0"
                      title={partner.name}
                    >
                      <div
                        className="w-[88px] h-[88px] flex items-center justify-center transition-all duration-300"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
                        }}
                      >
                        <div
                          className="w-[80px] h-[80px] flex items-center justify-center bg-neutral-900/80 group-hover:bg-neutral-800/90 transition-colors px-3"
                          style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          }}
                        >
                          <Logo className={`h-7 w-full ${partner.color}`} />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>


          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border border-primary-500/30">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500" />
              </span>
              <p className="text-sm font-medium text-primary-200">
                Join 50,000+ members transforming their lives
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
