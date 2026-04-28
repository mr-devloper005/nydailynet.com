import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Dispatches published', value: '240+' },
  { label: 'Readers monthly', value: '18k' },
  { label: 'Corrections SLA', value: '24h' },
]

const values = [
  {
    title: 'Accuracy first',
    description: 'Every article is edited for clarity, attribution, and factual rigor before it reaches the wire.',
  },
  {
    title: 'Calm reading',
    description: 'We favour spacious layouts and restrained typography so long-form coverage stays legible on any device.',
  },
  {
    title: 'Open newsroom',
    description: 'Corrections, syndication requests, and reader feedback are routed straight to the editorial desk.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={`${SITE_CONFIG.name}`}
      description={SITE_CONFIG.description}
      actions={
        <>
          <Link href="/team">Meet the team</Link>
          <Link href="/contact">Contact editorial</Link>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <article className="border border-black/10 bg-white/50 p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6560]">Our story</p>
          <h2 className="mt-4 text-2xl font-bold uppercase leading-tight tracking-tight text-[#0c0c0c] sm:text-3xl">
            Independent media distribution
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[#4a4540]">
            {SITE_CONFIG.name} publishes announcements, analysis, and field reporting for readers who expect a single, authoritative
            source—without algorithmic noise or recycled press releases.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="border border-black/10 bg-[#F5F1EB] px-4 py-5 text-center sm:text-left">
                <div className="text-2xl font-bold tabular-nums text-[#0c0c0c]">{item.value}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6560]">{item.label}</div>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-4">
          {values.map((value) => (
            <div key={value.title} className="border border-black/10 bg-white/50 p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0c0c0c]">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-black/10 pt-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6560]">Editorial roster</p>
        <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-[#0c0c0c] sm:text-3xl">Newsroom</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="border border-black/10 bg-white/50 p-6 transition-colors hover:bg-black/[0.02]">
              <div className="flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-black/10">
                  <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" width={56} height={56} />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-[#0c0c0c]">{member.name}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b6560]">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#4a4540]">{member.bio}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6b6560]">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
