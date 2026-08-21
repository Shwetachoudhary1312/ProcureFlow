export const CATEGORIES = [
  'Drives & Motors',
  'Sensors & Controls',
  'PLCs & Automation',
  'Industrial Electronics',
]

export const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Global']

export function getPriceDeviationSeverity(deviationPercent) {
  const abs = Math.abs(deviationPercent)
  if (abs >= 20) return 'High'
  if (abs >= 10) return 'Medium'
  return null
}

export function getLeadTimeDelaySeverity(daysDelayed) {
  if (daysDelayed >= 7) return 'High'
  if (daysDelayed >= 3) return 'Medium'
  return null
}

export function calcPriceDeviation(quoted, actual) {
  if (!quoted) return 0
  return ((actual - quoted) / quoted) * 100
}

export function detectPriceAnomaly(quoted, actual) {
  const deviation = calcPriceDeviation(quoted, actual)
  const severity = getPriceDeviationSeverity(deviation)
  if (!severity) return null
  return { type: 'Price Mismatch', deviation, severity }
}

export function detectLeadTimeAnomaly(expected, actual) {
  const daysDelayed = actual - expected
  const severity = getLeadTimeDelaySeverity(daysDelayed)
  if (!severity) return null
  return { type: 'Lead Time Delay', daysDelayed, severity }
}

export const vendors = [
  {
    id: 'v1',
    name: 'EU Automation',
    category: 'PLCs & Automation',
    region: 'Europe',
    contact: { name: 'James Whitfield', email: 'j.whitfield@euautomation.com', phone: '+44 1785 303300' },
    relationshipStart: '2019-03-15',
    status: 'attention',
    deliveryReliability: 87,
    avgLeadTime: 14,
    priceVariance: 12.4,
    totalPOs: 342,
    flagsRaised: 8,
  },
  {
    id: 'v2',
    name: 'Turck',
    category: 'Sensors & Controls',
    region: 'North America',
    contact: { name: 'Sarah Chen', email: 's.chen@turck.com', phone: '+1 763 553 7300' },
    relationshipStart: '2017-08-22',
    status: 'healthy',
    deliveryReliability: 96,
    avgLeadTime: 7,
    priceVariance: 3.2,
    totalPOs: 518,
    flagsRaised: 2,
  },
  {
    id: 'v3',
    name: 'Lenze',
    category: 'Drives & Motors',
    region: 'Europe',
    contact: { name: 'Klaus Weber', email: 'k.weber@lenze.com', phone: '+49 5154 82 0' },
    relationshipStart: '2018-01-10',
    status: 'attention',
    deliveryReliability: 82,
    avgLeadTime: 21,
    priceVariance: 18.7,
    totalPOs: 276,
    flagsRaised: 11,
  },
  {
    id: 'v4',
    name: 'Rockwell Automation',
    category: 'PLCs & Automation',
    region: 'North America',
    contact: { name: 'Michael Torres', email: 'm.torres@rockwellautomation.com', phone: '+1 414 382 2000' },
    relationshipStart: '2016-05-01',
    status: 'healthy',
    deliveryReliability: 94,
    avgLeadTime: 10,
    priceVariance: 5.1,
    totalPOs: 891,
    flagsRaised: 4,
  },
  {
    id: 'v5',
    name: 'Festo Dynamics',
    category: 'Drives & Motors',
    region: 'Europe',
    contact: { name: 'Anna Müller', email: 'a.mueller@festodynamics.com', phone: '+49 711 347 0' },
    relationshipStart: '2020-06-18',
    status: 'critical',
    deliveryReliability: 71,
    avgLeadTime: 18,
    priceVariance: 24.3,
    totalPOs: 154,
    flagsRaised: 15,
  },
  {
    id: 'v6',
    name: 'SICK Sensors Co',
    category: 'Sensors & Controls',
    region: 'Global',
    contact: { name: 'David Park', email: 'd.park@sick-sensors.com', phone: '+49 7681 202 0' },
    relationshipStart: '2018-11-03',
    status: 'attention',
    deliveryReliability: 89,
    avgLeadTime: 12,
    priceVariance: 14.8,
    totalPOs: 423,
    flagsRaised: 6,
  },
  {
    id: 'v7',
    name: 'Omron Industrial',
    category: 'Sensors & Controls',
    region: 'Asia Pacific',
    contact: { name: 'Yuki Tanaka', email: 'y.tanaka@omron-industrial.com', phone: '+81 75 344 7171' },
    relationshipStart: '2019-09-12',
    status: 'healthy',
    deliveryReliability: 93,
    avgLeadTime: 9,
    priceVariance: 4.6,
    totalPOs: 367,
    flagsRaised: 1,
  },
  {
    id: 'v8',
    name: 'Siemens Automation Partners',
    category: 'PLCs & Automation',
    region: 'Europe',
    contact: { name: 'Thomas Bauer', email: 't.bauer@siemens-automation.com', phone: '+49 911 895 0' },
    relationshipStart: '2015-02-28',
    status: 'healthy',
    deliveryReliability: 97,
    avgLeadTime: 8,
    priceVariance: 2.8,
    totalPOs: 1204,
    flagsRaised: 3,
  },
  {
    id: 'v9',
    name: 'ABB Motion Systems',
    category: 'Drives & Motors',
    region: 'Global',
    contact: { name: 'Elena Rossi', email: 'e.rossi@abb-motion.com', phone: '+41 58 586 1111' },
    relationshipStart: '2017-04-07',
    status: 'attention',
    deliveryReliability: 85,
    avgLeadTime: 16,
    priceVariance: 11.2,
    totalPOs: 612,
    flagsRaised: 7,
  },
  {
    id: 'v10',
    name: 'Phoenix Contact Industrial',
    category: 'Industrial Electronics',
    region: 'Europe',
    contact: { name: 'Hans Fischer', email: 'h.fischer@phoenix-contact.com', phone: '+49 5235 3 0' },
    relationshipStart: '2021-01-25',
    status: 'healthy',
    deliveryReliability: 91,
    avgLeadTime: 11,
    priceVariance: 6.3,
    totalPOs: 198,
    flagsRaised: 2,
  },
  {
    id: 'v11',
    name: 'Schneider Electric Supply',
    category: 'Industrial Electronics',
    region: 'North America',
    contact: { name: 'Lisa Nguyen', email: 'l.nguyen@schneider-supply.com', phone: '+1 888 778 2733' },
    relationshipStart: '2018-07-14',
    status: 'critical',
    deliveryReliability: 74,
    avgLeadTime: 22,
    priceVariance: 21.5,
    totalPOs: 445,
    flagsRaised: 13,
  },
  {
    id: 'v12',
    name: 'Banner Engineering Co',
    category: 'Sensors & Controls',
    region: 'North America',
    contact: { name: 'Robert Hayes', email: 'r.hayes@bannereng.com', phone: '+1 763 544 3164' },
    relationshipStart: '2020-03-09',
    status: 'healthy',
    deliveryReliability: 95,
    avgLeadTime: 6,
    priceVariance: 3.9,
    totalPOs: 289,
    flagsRaised: 0,
  },
]

export const purchaseOrders = [
  { id: 'po1', vendorId: 'v1', poNumber: 'PO-2025-0847', date: '2025-07-12', quotedPrice: 12400, actualPrice: 14880, expectedLeadTime: 12, actualLeadTime: 18, status: 'Delivered' },
  { id: 'po2', vendorId: 'v1', poNumber: 'PO-2025-0793', date: '2025-06-28', quotedPrice: 8900, actualPrice: 8900, expectedLeadTime: 10, actualLeadTime: 11, status: 'Delivered' },
  { id: 'po3', vendorId: 'v1', poNumber: 'PO-2025-0712', date: '2025-05-15', quotedPrice: 15600, actualPrice: 17160, expectedLeadTime: 14, actualLeadTime: 14, status: 'Delivered' },
  { id: 'po4', vendorId: 'v2', poNumber: 'PO-2025-0861', date: '2025-07-18', quotedPrice: 4200, actualPrice: 4200, expectedLeadTime: 7, actualLeadTime: 7, status: 'Delivered' },
  { id: 'po5', vendorId: 'v3', poNumber: 'PO-2025-0834', date: '2025-07-08', quotedPrice: 28500, actualPrice: 34200, expectedLeadTime: 18, actualLeadTime: 26, status: 'Delivered' },
  { id: 'po6', vendorId: 'v3', poNumber: 'PO-2025-0766', date: '2025-06-10', quotedPrice: 19200, actualPrice: 21120, expectedLeadTime: 20, actualLeadTime: 24, status: 'Delivered' },
  { id: 'po7', vendorId: 'v4', poNumber: 'PO-2025-0875', date: '2025-07-22', quotedPrice: 67800, actualPrice: 67800, expectedLeadTime: 10, actualLeadTime: 9, status: 'Delivered' },
  { id: 'po8', vendorId: 'v5', poNumber: 'PO-2025-0820', date: '2025-07-02', quotedPrice: 9800, actualPrice: 12740, expectedLeadTime: 15, actualLeadTime: 24, status: 'Delivered' },
  { id: 'po9', vendorId: 'v5', poNumber: 'PO-2025-0744', date: '2025-05-28', quotedPrice: 11200, actualPrice: 14560, expectedLeadTime: 16, actualLeadTime: 22, status: 'Delivered' },
  { id: 'po10', vendorId: 'v6', poNumber: 'PO-2025-0855', date: '2025-07-15', quotedPrice: 7600, actualPrice: 9120, expectedLeadTime: 10, actualLeadTime: 14, status: 'Delivered' },
  { id: 'po11', vendorId: 'v9', poNumber: 'PO-2025-0840', date: '2025-07-10', quotedPrice: 34500, actualPrice: 37950, expectedLeadTime: 14, actualLeadTime: 17, status: 'Delivered' },
  { id: 'po12', vendorId: 'v11', poNumber: 'PO-2025-0801', date: '2025-06-20', quotedPrice: 22100, actualPrice: 28730, expectedLeadTime: 18, actualLeadTime: 28, status: 'Delivered' },
  { id: 'po13', vendorId: 'v11', poNumber: 'PO-2025-0733', date: '2025-05-22', quotedPrice: 18400, actualPrice: 22080, expectedLeadTime: 20, actualLeadTime: 25, status: 'Delivered' },
  { id: 'po14', vendorId: 'v8', poNumber: 'PO-2025-0880', date: '2025-07-25', quotedPrice: 45200, actualPrice: 45200, expectedLeadTime: 8, actualLeadTime: 8, status: 'In Transit' },
  { id: 'po15', vendorId: 'v7', poNumber: 'PO-2025-0868', date: '2025-07-20', quotedPrice: 5600, actualPrice: 5600, expectedLeadTime: 9, actualLeadTime: 9, status: 'Processing' },
  { id: 'po16', vendorId: 'v10', poNumber: 'PO-2025-0859', date: '2025-07-16', quotedPrice: 8900, actualPrice: 8900, expectedLeadTime: 11, actualLeadTime: 11, status: 'Delivered' },
  { id: 'po17', vendorId: 'v12', poNumber: 'PO-2025-0872', date: '2025-07-21', quotedPrice: 3200, actualPrice: 3200, expectedLeadTime: 6, actualLeadTime: 6, status: 'Delivered' },
  { id: 'po18', vendorId: 'v1', poNumber: 'PO-2025-0885', date: '2025-07-28', quotedPrice: 9800, actualPrice: null, expectedLeadTime: 12, actualLeadTime: null, status: 'Pending' },
  { id: 'po19', vendorId: 'v3', poNumber: 'PO-2025-0888', date: '2025-07-30', quotedPrice: 21000, actualPrice: null, expectedLeadTime: 18, actualLeadTime: null, status: 'Pending' },
  { id: 'po20', vendorId: 'v6', poNumber: 'PO-2025-0878', date: '2025-07-24', quotedPrice: 5400, actualPrice: null, expectedLeadTime: 10, actualLeadTime: null, status: 'Pending' },
]

export const deliveryTrend = [
  { month: 'Mar', onTime: 91, total: 142 },
  { month: 'Apr', onTime: 88, total: 156 },
  { month: 'May', onTime: 85, total: 168 },
  { month: 'Jun', onTime: 89, total: 151 },
  { month: 'Jul', onTime: 87, total: 174 },
  { month: 'Aug', onTime: 92, total: 138 },
]

export function buildAnomalies() {
  const anomalies = []
  let counter = 1

  purchaseOrders.forEach((po) => {
    if (po.actualPrice != null && po.quotedPrice) {
      const priceAnomaly = detectPriceAnomaly(po.quotedPrice, po.actualPrice)
      if (priceAnomaly) {
        const vendor = vendors.find((v) => v.id === po.vendorId)
        anomalies.push({
          id: `a${counter++}`,
          vendorId: po.vendorId,
          vendorName: vendor?.name ?? 'Unknown',
          poNumber: po.poNumber,
          type: 'Price Mismatch',
          severity: priceAnomaly.severity,
          dateRaised: po.date,
          quotedPrice: po.quotedPrice,
          actualPrice: po.actualPrice,
          deviation: priceAnomaly.deviation,
          status: 'Open',
        })
      }
    }

    if (po.actualLeadTime != null && po.expectedLeadTime != null) {
      const leadAnomaly = detectLeadTimeAnomaly(po.expectedLeadTime, po.actualLeadTime)
      if (leadAnomaly) {
        const vendor = vendors.find((v) => v.id === po.vendorId)
        anomalies.push({
          id: `a${counter++}`,
          vendorId: po.vendorId,
          vendorName: vendor?.name ?? 'Unknown',
          poNumber: po.poNumber,
          type: 'Lead Time Delay',
          severity: leadAnomaly.severity,
          dateRaised: po.date,
          expectedLeadTime: po.expectedLeadTime,
          actualLeadTime: po.actualLeadTime,
          daysDelayed: leadAnomaly.daysDelayed,
          status: 'Open',
        })
      }
    }
  })

  return anomalies.sort((a, b) => new Date(b.dateRaised) - new Date(a.dateRaised))
}

export const anomalies = buildAnomalies()

export const dashboardKPIs = {
  totalActiveVendors: 4127,
  dailyActiveRelationships: 34,
  pendingPOs: purchaseOrders.filter((po) => po.status === 'Pending' || po.status === 'Processing').length,
  onTimeDeliveryPercent: 89.2,
  anomaliesThisMonth: anomalies.filter((a) => {
    const d = new Date(a.dateRaised)
    return d.getMonth() === 7 && d.getFullYear() === 2025
  }).length,
}

export const vendorDocuments = {
  v1: [
    { name: 'Master Service Agreement.pdf', date: '2019-03-15', size: '2.4 MB' },
    { name: 'ISO 9001 Certificate.pdf', date: '2024-01-10', size: '890 KB' },
    { name: 'Insurance Certificate.pdf', date: '2025-02-01', size: '1.1 MB' },
  ],
  v3: [
    { name: 'Vendor Agreement.pdf', date: '2018-01-10', size: '3.2 MB' },
    { name: 'Quality Audit Report.pdf', date: '2024-06-15', size: '4.8 MB' },
  ],
  v5: [
    { name: 'NDA Signed.pdf', date: '2020-06-18', size: '560 KB' },
    { name: 'Compliance Checklist.pdf', date: '2025-01-20', size: '780 KB' },
  ],
}

export const communicationLogs = {
  v1: [
    { date: '2025-07-20', type: 'Email', subject: 'Price discrepancy on PO-2025-0847', from: 'Procurement Team' },
    { date: '2025-07-14', type: 'Call', subject: 'Delivery timeline follow-up', from: 'James Whitfield' },
    { date: '2025-06-02', type: 'Email', subject: 'Q3 volume forecast', from: 'Procurement Team' },
  ],
  v3: [
    { date: '2025-07-12', type: 'Email', subject: 'Lead time escalation — PO-2025-0834', from: 'Procurement Team' },
    { date: '2025-06-15', type: 'Meeting', subject: 'Quarterly business review', from: 'Klaus Weber' },
  ],
  v5: [
    { date: '2025-07-08', type: 'Email', subject: 'URGENT: Price variance exceeds 20%', from: 'Procurement Team' },
    { date: '2025-07-03', type: 'Call', subject: 'SLA breach discussion', from: 'Anna Müller' },
  ],
}

export function getVendorPOs(vendorId) {
  return purchaseOrders
    .filter((po) => po.vendorId === vendorId)
    .map((po) => ({
      ...po,
      deviation: po.actualPrice ? calcPriceDeviation(po.quotedPrice, po.actualPrice) : null,
    }))
}

export function getVendorsNeedingAttention() {
  return vendors
    .filter((v) => v.status === 'attention' || v.status === 'critical')
    .map((v) => {
      const vendorAnomalies = anomalies.filter((a) => a.vendorId === v.id && a.status === 'Open')
      const hasPrice = vendorAnomalies.some((a) => a.type === 'Price Mismatch')
      const hasLead = vendorAnomalies.some((a) => a.type === 'Lead Time Delay')
      return {
        ...v,
        issues: [
          ...(hasPrice ? ['Price Mismatch'] : []),
          ...(hasLead ? ['Lead Time Delay'] : []),
        ],
        openFlags: vendorAnomalies.length,
      }
    })
}
