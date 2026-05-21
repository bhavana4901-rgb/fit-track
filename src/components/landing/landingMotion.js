/** Fast, snappy scroll-reveal presets (avoid sluggish first-time section loads) */
export const viewViewport = { once: true, margin: '-48px 0px -48px 0px' }

export const viewTransition = { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }

export const viewTransitionFast = { duration: 0.22, ease: 'easeOut' }

/** Stagger for child lists */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: viewTransitionFast,
  },
}

/** Spread onto motion.* for fade-up on scroll */
export function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewViewport,
    transition: { ...viewTransition, delay },
  }
}
