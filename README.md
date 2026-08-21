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
<img width="1895" height="934" alt="image" src="https://github.com/user-attachments/assets/9f697751-d101-4633-a2a2-2b73023bae7c" />


## Screens

1. **Dashboard** — KPIs, delivery trend chart, vendors needing attention with search/filters
2. **Vendor Profile** — scorecard, sortable PO history, documents, communication log
   <img width="1890" height="920" alt="image" src="https://github.com/user-attachments/assets/a54b07b7-874c-4141-8874-cf2092a8e104" />

4. **Vendor Onboarding** — 4-step form with progress indicator
   <img width="751" height="872" alt="image" src="https://github.com/user-attachments/assets/dbe5577f-1177-489e-8019-c9b4abcedfab" />

6. **Anomaly Detection** — price mismatch & lead time delay flags with resolve/escalate actions

## Anomaly Thresholds

| Type | Flag | Medium | High |
|------|------|--------|------|
| Price Mismatch | ≥10% deviation | 10–20% | 20%+ |
| Lead Time Delay | ≥3 days late | 3–6 days | 7+ days |

## Sample Vendors

EU Automation, Turck, Lenze, Rockwell Automation, Festo Dynamics, SICK Sensors Co, Omron Industrial, Siemens Automation Partners, ABB Motion Systems, Phoenix Contact Industrial, Schneider Electric Supply, Banner Engineering Co.
