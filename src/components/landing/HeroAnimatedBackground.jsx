import { motion } from 'framer-motion'
export default function HeroAnimatedBackground() {
  return (
    <div className="hero-animated-bg absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {}
      <div className="hero-light-base absolute inset-0" />
      {}
      <div className="hero-light-wash absolute inset-0" />
      {}
      <div className="hero-aurora-mesh absolute inset-[-20%] w-[140%] h-[140%]" />
      {}
      <motion.div
        className="hero-light-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(160vw,1100px)] h-[min(160vw,1100px)] rounded-full"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      />
      {}
      <motion.div
        className="hero-light-orb absolute -top-20 -left-16 w-[32rem] h-[32rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.45) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-light-orb absolute top-1/4 -right-24 w-[36rem] h-[36rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.4) 0%, transparent 70%)' }}
        animate={{ x: [0, -70, 0], y: [0, 50, 0], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-light-orb absolute bottom-0 left-[10%] w-[28rem] h-[28rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(251,207,232,0.38) 0%, transparent 70%)' }}
        animate={{ x: [0, 50, 0], y: [0, -60, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-light-orb absolute bottom-1/4 right-[15%] w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,243,208,0.35) 0%, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 35, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-light-orb absolute top-[45%] left-[40%] w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(191,219,254,0.3) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {}
      <div className="hero-light-dots absolute inset-0" />
      {}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-neutral-950 dark:to-transparent" />
    </div>
  )
}
