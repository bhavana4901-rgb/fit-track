export default function StatsCard({ title = 'Stat', value = 0, icon, trend }) {
  return <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg">{title}: {value}</div>
}
