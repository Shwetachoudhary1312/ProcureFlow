import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts'
import { Users, FileText, Truck, AlertTriangle, Search } from 'lucide-react'
import KPICard from '../components/KPICard'
import StatusBadge from '../components/StatusBadge'
import {
  dashboardKPIs,
  deliveryTrend,
  getVendorsNeedingAttention,
  CATEGORIES,
  REGIONS,
} from '../data/mockData'

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')

  const attentionVendors = useMemo(() => getVendorsNeedingAttention(), [])

  const filteredVendors = useMemo(() => {
    return attentionVendors.filter((v) => {
      const matchesSearch =
        !search ||
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter
      const matchesRegion = regionFilter === 'all' || v.region === regionFilter
      return matchesSearch && matchesCategory && matchesStatus && matchesRegion
    })
  }, [attentionVendors, search, categoryFilter, statusFilter, regionFilter])

  const chartData = deliveryTrend.map((d) => ({
    ...d,
    onTimePercent: Math.round((d.onTime / d.total) * 100),
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of vendor performance across {dashboardKPIs.totalActiveVendors.toLocaleString()} records
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Total Active Vendors"
          value={dashboardKPIs.totalActiveVendors.toLocaleString()}
          subtitle={`${dashboardKPIs.dailyActiveRelationships} active today`}
          icon={Users}
        />
        <KPICard
          title="Pending POs"
          value={dashboardKPIs.pendingPOs}
          subtitle="Awaiting delivery or processing"
          icon={FileText}
        />
        <KPICard
          title="On-Time Delivery"
          value={`${dashboardKPIs.onTimeDeliveryPercent}%`}
          subtitle="Last 30 days"
          icon={Truck}
          trend={{ value: '2.1% vs last month', positive: true }}
        />
        <KPICard
          title="Anomalies This Month"
          value={dashboardKPIs.anomaliesThisMonth}
          subtitle="Price & lead time flags"
          icon={AlertTriangle}
          trend={{ value: '3 new this week', positive: false }}
        />
      </div>

      {/* Chart */}
      <div className="card">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900">Delivery Performance Trend</h2>
          <p className="text-sm text-gray-500">On-time delivery rate over the last 6 months</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontSize: '13px',
                }}
                formatter={(value, name) => {
                  if (name === 'onTimePercent') return [`${value}%`, 'On-Time Rate']
                  if (name === 'total') return [value, 'Total Deliveries']
                  return [value, name]
                }}
              />
              <Bar yAxisId="right" dataKey="total" fill="#ccfbf1" radius={[4, 4, 0, 0]} barSize={32} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="onTimePercent"
                stroke="#0d9488"
                strokeWidth={2.5}
                dot={{ fill: '#0d9488', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-600" />
            On-Time Rate
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-200" />
            Total Deliveries
          </span>
        </div>
      </div>

      {/* Vendors Needing Attention */}
      <div className="card">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Vendors Needing Attention</h2>
            <p className="text-sm text-gray-500">Flagged for price mismatch or lead time delays</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select-field"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field"
          >
            <option value="all">All Statuses</option>
            <option value="attention">Needs Attention</option>
            <option value="critical">Critical</option>
          </select>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="select-field"
          >
            <option value="all">All Regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="pb-3 pr-4">Vendor</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Region</th>
                <th className="pb-3 pr-4">Issues</th>
                <th className="pb-3 pr-4">Open Flags</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No vendors match your filters
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="group hover:bg-gray-50/50">
                    <td className="py-4 pr-4">
                      <Link
                        to={`/vendor/${vendor.id}`}
                        className="font-medium text-gray-900 hover:text-accent-600"
                      >
                        {vendor.name}
                      </Link>
                    </td>
                    <td className="py-4 pr-4 text-gray-600">{vendor.category}</td>
                    <td className="py-4 pr-4 text-gray-600">{vendor.region}</td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap gap-1">
                        {vendor.issues.map((issue) => (
                          <span
                            key={issue}
                            className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="font-medium text-gray-900">{vendor.openFlags}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <StatusBadge status={vendor.status} />
                    </td>
                    <td className="py-4">
                      <Link
                        to={`/vendor/${vendor.id}`}
                        className="text-sm font-medium text-accent-600 opacity-0 transition group-hover:opacity-100 hover:text-accent-700"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
