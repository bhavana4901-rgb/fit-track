export default function MobileMenu({ isOpen, onClose }) {
  return isOpen ? <div className="fixed inset-0 bg-white dark:bg-neutral-950">Menu</div> : null
}
