import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Acceptable use',
    body: 'No harassment, spam, malware, or illegal content. Comments and submissions must respect copyright and the dignity of others.',
  },
  {
    title: 'Content & syndication',
    body: 'Unless otherwise noted, editorial content is owned by the publication or licensed contributors. Syndication requires written permission.',
  },
  {
    title: 'Accounts',
    body: 'Keep credentials secure. We may suspend accounts that compromise platform integrity or violate these terms.',
  },
  {
    title: 'Disclaimer',
    body: 'Coverage is provided for general information. Verify critical facts independently before acting on announcements or analysis.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      description={`Rules for reading, commenting on, and contributing to ${SITE_CONFIG.name}.`}
      actions={<Link href="/privacy">Privacy</Link>}
    >
      <div className="max-w-3xl border border-black/10 bg-white/50 p-6 sm:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]">Last updated · April 2026</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-black/10 pb-8 last:border-0 last:pb-0">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0c0c0c]">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
