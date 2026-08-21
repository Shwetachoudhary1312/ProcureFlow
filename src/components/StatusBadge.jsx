const statusStyles = {
  healthy: 'bg-green-50 text-green-700 ring-green-600/20',
  attention: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  critical: 'bg-red-50 text-red-700 ring-red-600/20',
}

const statusLabels = {
  healthy: 'Healthy',
  attention: 'Needs Attention',
  critical: 'Critical',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[status] ?? statusStyles.attention}`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          status === 'healthy' ? 'bg-green-500' : status === 'attention' ? 'bg-yellow-500' : 'bg-red-500'
        }`}
      />
      {statusLabels[status] ?? status}
    </span>
  )
}

export function SeverityBadge({ severity }) {
  const styles = {
    Medium: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    High: 'bg-red-50 text-red-700 ring-red-600/20',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[severity]}`}
    >
      {severity}
    </span>
  )
}
