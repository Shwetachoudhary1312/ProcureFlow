import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Upload, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { CATEGORIES } from '../data/mockData'

const steps = [
  { number: 1, title: 'Basic Info' },
  { number: 2, title: 'Compliance' },
  { number: 3, title: 'SLA & Terms' },
  { number: 4, title: 'Review' },
]

const initialForm = {
  name: '',
  category: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  region: '',
  documents: [],
  leadTimeDays: '',
  priceBenchmarks: [{ product: '', benchmark: '' }],
  notes: '',
}

export default function VendorOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function addBenchmark() {
    setForm((prev) => ({
      ...prev,
      priceBenchmarks: [...prev.priceBenchmarks, { product: '', benchmark: '' }],
    }))
  }

  function updateBenchmark(index, field, value) {
    setForm((prev) => ({
      ...prev,
      priceBenchmarks: prev.priceBenchmarks.map((b, i) =>
        i === index ? { ...b, [field]: value } : b
      ),
    }))
  }

  function handleFileDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer?.files ?? e.target.files ?? [])
    setForm((prev) => ({
      ...prev,
      documents: [
        ...prev.documents,
        ...files.map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` })),
      ],
    }))
  }

  function canProceed() {
    if (step === 1) {
      return form.name && form.category && form.contactName && form.contactEmail
    }
    if (step === 3) {
      return form.leadTimeDays && form.priceBenchmarks.some((b) => b.product && b.benchmark)
    }
    return true
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
          <CheckCircle2 className="h-8 w-8 text-accent-600" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Vendor Onboarded!</h2>
        <p className="mt-2 text-gray-500">
          <strong>{form.name}</strong> has been added to VendorPulse and is pending compliance review.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Dashboard
          </button>
          <button
            onClick={() => {
              setSubmitted(false)
              setStep(1)
              setForm(initialForm)
            }}
            className="btn-secondary"
          >
            Onboard Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Onboard New Vendor</h1>
        <p className="mt-1 text-sm text-gray-500">Add a new supplier to your vendor network</p>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.number} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
                    step > s.number
                      ? 'bg-accent-600 text-white'
                      : step === s.number
                      ? 'bg-accent-600 text-white ring-4 ring-accent-100'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step > s.number ? <Check className="h-4 w-4" /> : s.number}
                </div>
                <span
                  className={`mt-2 hidden text-xs font-medium sm:block ${
                    step >= s.number ? 'text-accent-700' : 'text-gray-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${step > s.number ? 'bg-accent-600' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="card">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-base font-semibold text-gray-900">Basic Information</h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Vendor Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., Festo Dynamics"
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="input-field"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Region</label>
              <select
                value={form.region}
                onChange={(e) => updateField('region', e.target.value)}
                className="input-field"
              >
                <option value="">Select region...</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="Global">Global</option>
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Name</label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-base font-semibold text-gray-900">Compliance & Documents</h2>
            <p className="text-sm text-gray-500">
              Upload required compliance documents (ISO certificates, insurance, agreements)
            </p>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition ${
                dragOver ? 'border-accent-400 bg-accent-50' : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="mt-3 text-sm font-medium text-gray-700">
                Drag & drop files here, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</p>
              <label className="btn-secondary mt-4 cursor-pointer">
                Browse Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileDrop}
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
            {form.documents.length > 0 && (
              <div className="space-y-2">
                {form.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-2"
                  >
                    <span className="text-sm text-gray-700">{doc.name}</span>
                    <span className="text-xs text-gray-400">{doc.size}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-base font-semibold text-gray-900">SLA & Terms Setup</h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Expected Lead Time (days)
              </label>
              <input
                type="number"
                min="1"
                value={form.leadTimeDays}
                onChange={(e) => updateField('leadTimeDays', e.target.value)}
                placeholder="e.g., 14"
                className="input-field max-w-xs"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Agreed Price Benchmarks
              </label>
              <div className="space-y-3">
                {form.priceBenchmarks.map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      type="text"
                      value={b.product}
                      onChange={(e) => updateBenchmark(i, 'product', e.target.value)}
                      placeholder="Product / Category"
                      className="input-field flex-1"
                    />
                    <input
                      type="text"
                      value={b.benchmark}
                      onChange={(e) => updateBenchmark(i, 'benchmark', e.target.value)}
                      placeholder="Benchmark price ($)"
                      className="input-field w-40"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addBenchmark}
                className="mt-2 text-sm font-medium text-accent-600 hover:text-accent-700"
              >
                + Add another benchmark
              </button>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={3}
                placeholder="Any special terms or conditions..."
                className="input-field resize-none"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-base font-semibold text-gray-900">Review & Confirm</h2>
            <p className="text-sm text-gray-500">Please review the vendor details before submitting.</p>
            <dl className="divide-y divide-gray-100 rounded-lg border border-gray-100">
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Vendor Name</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">{form.name || '—'}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Category</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">{form.category || '—'}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Contact</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">
                  {form.contactName} · {form.contactEmail}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Region</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">{form.region || '—'}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Documents</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">
                  {form.documents.length} file(s) uploaded
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Lead Time</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">
                  {form.leadTimeDays ? `${form.leadTimeDays} days` : '—'}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-sm text-gray-500">Benchmarks</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-900">
                  {form.priceBenchmarks.filter((b) => b.product).map((b) => (
                    <span key={b.product} className="mr-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs">
                      {b.product}: ${b.benchmark}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
            className="btn-secondary disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              Confirm & Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
