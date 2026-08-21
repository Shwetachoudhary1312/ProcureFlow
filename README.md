# VendorPulse

A vendor management dashboard for industrial automation procurement — tracking 4,000+ vendor records and daily supplier relationships.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** — Linear/Notion-inspired SaaS aesthetic
- **Recharts** — delivery performance charts
- **React Router** — multi-screen navigation
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Screens

1. **Dashboard** — KPIs, delivery trend chart, vendors needing attention with search/filters
2. **Vendor Profile** — scorecard, sortable PO history, documents, communication log
3. **Vendor Onboarding** — 4-step form with progress indicator
4. **Anomaly Detection** — price mismatch & lead time delay flags with resolve/escalate actions

## Anomaly Thresholds

| Type | Flag | Medium | High |
|------|------|--------|------|
| Price Mismatch | ≥10% deviation | 10–20% | 20%+ |
| Lead Time Delay | ≥3 days late | 3–6 days | 7+ days |

## Sample Vendors

EU Automation, Turck, Lenze, Rockwell Automation, Festo Dynamics, SICK Sensors Co, Omron Industrial, Siemens Automation Partners, ABB Motion Systems, Phoenix Contact Industrial, Schneider Electric Supply, Banner Engineering Co.
