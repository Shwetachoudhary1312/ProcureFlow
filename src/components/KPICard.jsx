export default function KPICard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50">
            <Icon className="h-4 w-4 text-accent-600" />
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-semibold tracking-tight text-gray-900">{value}</p>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        {trend && (
          <p className={`mt-1 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  )
}
