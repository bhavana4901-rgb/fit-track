/** Snappy dashboard entrance animations */
export const dashboardTransition = { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }

export const dashboardContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

export const dashboardItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: 'easeOut' },
  },
}
