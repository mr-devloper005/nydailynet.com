import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

const services = [
  { name: 'Web app', detail: 'Reader & newsroom surfaces', status: 'Operational' },
  { name: 'API', detail: 'Feeds & integrations', status: 'Operational' },
  { name: 'Media CDN', detail: 'Images & static assets', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      eyebrow="Operations"
      title="System status"
      description="Uptime snapshot for core services that power reading, search, and distribution."
      actions={<Link href="/contact">Report an issue</Link>}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.name} className="border border-black/10 bg-white/50 p-6 sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#0c0c0c]">{service.name}</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#6b6560]">{service.detail}</p>
            <p className="mt-6 inline-flex border border-black/20 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0c0c0c]">
              {service.status}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-black/10 bg-white/50 p-6 sm:p-10">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0c0c0c]">Incident history</h3>
        <p className="mt-2 max-w-2xl text-sm text-[#4a4540]">Recent events affecting readers or publishing workflows.</p>
        <ul className="mt-8 space-y-4">
          {incidents.map((incident) => (
            <li key={incident.title} className="flex flex-col gap-1 border-b border-black/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b6560]">{incident.date}</p>
                <p className="mt-1 text-sm font-semibold text-[#0c0c0c]">{incident.title}</p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b6560]">{incident.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
