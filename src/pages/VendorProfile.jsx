import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  MessageSquare,
  ArrowUpDown,
} from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import {
  vendors,
  getVendorPOs,
  vendorDocuments,
  communicationLogs,
} from '../data/mockData'

const tabs = ['Overview', 'PO History', 'Documents', 'Communication Log']

export default function VendorProfile() {
  const { id } = useParams()
  const vendor = vendors.find((v) => v.id === id)
  const [activeTab, setActiveTab] = useState('Overview')
  const [sortField, setSortField] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const pos = useMemo(() => getVendorPOs(id), [id])

  const sortedPOs = useMemo(() => {
    return [...pos].sort((a, b) => {
      let cmp = 0
      if (sortField === 'date') {
        cmp = new Date(a.date) - new Date(b.date)
      } else if (sortField === 'deviation') {
        cmp = (a.deviation ?? 0) - (b.deviation ?? 0)
      } else if (sortField === 'poNumber') {
        cmp = a.poNumber.localeCompare(b.poNumber)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [pos, sortField, sortDir])

  const docs = vendorDocuments[id] ?? []
  const comms = communicationLogs[id] ?? []

  function toggleSort(field) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  if (!vendor) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-gray-500">Vendor not found</p>
        <Link to="/" className="mt-4 text-accent-600 hover:text-accent-700">
          Return to Dashboard
        </Link>
      </div>
    )
  }

  const scorecard = [
    { label: 'Delivery Reliability', value: `${vendor.deliveryReliability}%` },
    { label: 'Avg Lead Time', value: `${vendor.avgLeadTime} days` },
    { label: 'Price Variance', value: `${vendor.priceVariance}%` },
    { label: 'Total POs', value: vendor.totalPOs },
    { label: 'Flags Raised', value: vendor.flagsRaised },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">{vendor.name}</h1>
              <StatusBadge status={vendor.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">{vendor.category}</p>
          </div>
          <Link to="/anomalies" className="btn-secondary text-sm">
            View Anomalies
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-500">{vendor.contact.name}</p>
              <p className="text-gray-900">{vendor.contact.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <p className="text-gray-900">{vendor.contact.phone}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-500">Relationship since</p>
              <p className="text-gray-900">
                {new Date(vendor.relationshipStart).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <p className="text-gray-900">{vendor.region}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition ${
                activeTab === tab
                  ? 'border-accent-600 text-accent-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {scorecard.map((item) => (
            <div key={item.label} className="card text-center">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p className="mt-1 text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'PO History' && (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="pb-3 pr-4">
                  <button
                    onClick={() => toggleSort('poNumber')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    PO Number <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="pb-3 pr-4">
                  <button
                    onClick={() => toggleSort('date')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Date <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="pb-3 pr-4">Quoted Price</th>
                <th className="pb-3 pr-4">Actual Price</th>
                <th className="pb-3 pr-4">Expected LT</th>
                <th className="pb-3 pr-4">Actual LT</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">
                  <button
                    onClick={() => toggleSort('deviation')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    % Deviation <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedPOs.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-medium text-gray-900">{po.poNumber}</td>
                  <td className="py-3 pr-4 text-gray-600">{po.date}</td>
                  <td className="py-3 pr-4 text-gray-600">${po.quotedPrice.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {po.actualPrice != null ? `$${po.actualPrice.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{po.expectedLeadTime}d</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {po.actualLeadTime != null ? `${po.actualLeadTime}d` : '—'}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        po.status === 'Delivered'
                          ? 'bg-green-50 text-green-700'
                          : po.status === 'Pending'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {po.deviation != null ? (
                      <span
                        className={`font-medium ${
                          Math.abs(po.deviation) >= 20
                            ? 'text-red-600'
                            : Math.abs(po.deviation) >= 10
                            ? 'text-yellow-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {po.deviation > 0 ? '+' : ''}
                        {po.deviation.toFixed(1)}%
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Documents' && (
        <div className="card">
          {docs.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No documents uploaded</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {docs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
                      <FileText className="h-5 w-5 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded {doc.date} · {doc.size}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-accent-600 hover:text-accent-700">
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'Communication Log' && (
        <div className="card">
          {comms.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No communication records</p>
          ) : (
            <div className="space-y-4">
              {comms.map((log, i) => (
                <div key={i} className="flex gap-4 rounded-lg border border-gray-100 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {log.type}
                      </span>
                      <span className="text-xs text-gray-400">{log.date}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">{log.subject}</p>
                    <p className="mt-0.5 text-xs text-gray-500">From: {log.from}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
