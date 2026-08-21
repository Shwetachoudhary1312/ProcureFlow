import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, DollarSign, Clock, CheckCircle, ArrowUpRight } from 'lucide-react'
import { SeverityBadge } from '../components/StatusBadge'
import { anomalies as initialAnomalies } from '../data/mockData'

export default function AnomalyDetection() {
  const [anomalyList, setAnomalyList] = useState(initialAnomalies)
  const [typeFilter, setTypeFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const filtered = useMemo(() => {
    return anomalyList.filter((a) => {
      const matchesType = typeFilter === 'all' || a.type === typeFilter
      const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter
      return matchesType && matchesSeverity && a.status !== 'Resolved'
    })
  }, [anomalyList, typeFilter, severityFilter])

  const stats = useMemo(() => ({
    total: anomalyList.filter((a) => a.status !== 'Resolved').length,
    price: anomalyList.filter((a) => a.type === 'Price Mismatch' && a.status !== 'Resolved').length,
    leadTime: anomalyList.filter((a) => a.type === 'Lead Time Delay' && a.status !== 'Resolved').length,
    high: anomalyList.filter((a) => a.severity === 'High' && a.status !== 'Resolved').length,
  }), [anomalyList])

  function handleAction(id, action) {
    setAnomalyList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: action === 'resolve' ? 'Resolved' : 'Escalated' }
          : a
      )
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Anomaly Detection</h1>
        <p className="mt-1 text-sm text-gray-500">
          Flagged price mismatches and lead time delays across active vendors
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Open Anomalies', value: stats.total, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
          { label: 'Price Mismatch', value: stats.price, icon: DollarSign, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Lead Time Delay', value: stats.leadTime, icon: Clock, color: 'text-orange-600 bg-orange-50' },
          { label: 'High Severity', value: stats.high, icon: ArrowUpRight, color: 'text-red-600 bg-red-50' },
        ].map((s) => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="select-field"
        >
          <option value="all">All Types</option>
          <option value="Price Mismatch">Price Mismatch</option>
          <option value="Lead Time Delay">Lead Time Delay</option>
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="select-field"
        >
          <option value="all">All Severities</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <p className="flex items-center text-sm text-gray-500 sm:ml-auto">
          Showing {filtered.length} anomal{filtered.length === 1 ? 'y' : 'ies'}
        </p>
      </div>

      {/* Anomaly Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card py-16 text-center">
            <CheckCircle className="mx-auto h-10 w-10 text-green-400" />
            <p className="mt-4 text-lg font-medium text-gray-900">All clear!</p>
            <p className="mt-1 text-sm text-gray-500">No anomalies match your current filters.</p>
          </div>
        ) : (
          filtered.map((anomaly) => (
            <div
              key={anomaly.id}
              className={`card transition ${
                anomaly.status === 'Escalated' ? 'border-red-200 bg-red-50/30' : ''
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/vendor/${anomaly.vendorId}`}
                      className="text-base font-semibold text-gray-900 hover:text-accent-600"
                    >
                      {anomaly.vendorName}
                    </Link>
                    <SeverityBadge severity={anomaly.severity} />
                    {anomaly.status === 'Escalated' && (
                      <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                        Escalated
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium ${
                        anomaly.type === 'Price Mismatch'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-orange-50 text-orange-700'
                      }`}
                    >
                      {anomaly.type === 'Price Mismatch' ? (
                        <DollarSign className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                      {anomaly.type}
                    </span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500">PO: {anomaly.poNumber}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500">Raised: {anomaly.dateRaised}</span>
                  </div>

                  <div className="mt-3 rounded-lg bg-gray-50 px-4 py-3 text-sm">
                    {anomaly.type === 'Price Mismatch' ? (
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        <span>
                          Quoted: <strong>${anomaly.quotedPrice.toLocaleString()}</strong>
                        </span>
                        <span>
                          Invoiced: <strong>${anomaly.actualPrice.toLocaleString()}</strong>
                        </span>
                        <span
                          className={`font-semibold ${
                            Math.abs(anomaly.deviation) >= 20 ? 'text-red-600' : 'text-yellow-600'
                          }`}
                        >
                          {anomaly.deviation > 0 ? '+' : ''}
                          {anomaly.deviation.toFixed(1)}% deviation
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        <span>
                          Expected: <strong>{anomaly.expectedLeadTime} days</strong>
                        </span>
                        <span>
                          Actual: <strong>{anomaly.actualLeadTime} days</strong>
                        </span>
                        <span
                          className={`font-semibold ${
                            anomaly.daysDelayed >= 7 ? 'text-red-600' : 'text-yellow-600'
                          }`}
                        >
                          {anomaly.daysDelayed} days delayed
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {anomaly.status === 'Open' && (
                  <div className="flex gap-2 sm:flex-col">
                    <button
                      onClick={() => handleAction(anomaly.id, 'resolve')}
                      className="btn-secondary text-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Resolve
                    </button>
                    <button
                      onClick={() => handleAction(anomaly.id, 'escalate')}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-soft transition hover:bg-red-50"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Escalate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Threshold Reference */}
      <div className="card bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-700">Detection Thresholds</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-700">Price Mismatch</p>
            <ul className="mt-1 space-y-0.5 text-xs">
              <li>Flag: ≥10% deviation from quoted price</li>
              <li>Medium: 10–20% deviation</li>
              <li>High: 20%+ deviation</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700">Lead Time Delay</p>
            <ul className="mt-1 space-y-0.5 text-xs">
              <li>Flag: ≥3 days later than expected</li>
              <li>Medium: 3–6 days late</li>
              <li>High: 7+ days late</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
