import { motion } from 'framer-motion'

/**
 * Full-page animated background for Login (reuses hero light/aurora styles from index.css)
 */
export default function LoginAnimatedBackground() {
  return (
    <div className="hero-animated-bg absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="hero-light-base absolute inset-0" />
      <div className="hero-light-wash absolute inset-0" />
      <div className="hero-aurora-mesh absolute inset-[-15%] w-[130%] h-[130%]" />

      <motion.div
        className="hero-light-orbit absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[min(140vw,900px)] h-[min(140vw,900px)] rounded-full"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="hero-light-orb absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.4) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-light-orb absolute top-1/3 -right-28 w-[32rem] h-[32rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.38) 0%, transparent 70%)' }}
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-light-orb absolute -bottom-24 left-[20%] w-[26rem] h-[26rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(251,207,232,0.35) 0%, transparent 70%)' }}
        animate={{ x: [0, 35, 0], y: [0, -45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="hero-light-dots absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-neutral-950/50" />
    </div>
  )
}
