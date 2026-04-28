import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Editors and producers behind ${SITE_CONFIG.name}.`,
  })
}

export default function TeamPage() {
  return (
    <PageShell
      eyebrow="People"
      title="Newsroom team"
      description={`Editors, producers, and engineers behind ${SITE_CONFIG.name}—built for careful media distribution and reader trust.`}
      actions={
        <>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </>
      }
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {mockTeamMembers.map((member) => (
          <article key={member.id} className="flex flex-col border border-black/10 bg-white/50 p-6 sm:p-8 transition-colors hover:bg-black/[0.02]">
            <div className="flex items-start gap-4">
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-black/10">
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" width={80} height={80} />
              </span>
              <div>
                <h2 className="text-base font-bold uppercase tracking-tight text-[#0c0c0c]">{member.name}</h2>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b6560]">{member.role}</p>
              </div>
            </div>
            <p className="mt-6 grow text-sm leading-relaxed text-[#4a4540]">{member.bio}</p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6b6560]">{member.location}</p>
          </article>
        ))}
      </div>

      <p className="mt-14 max-w-2xl border-t border-black/10 pt-10 text-sm leading-relaxed text-[#4a4540]">
        We are a compact, distributed desk. For syndication, corrections, or contributor onboarding, reach us through{' '}
        <Link href="/contact" className="font-semibold text-[#0c0c0c] underline underline-offset-4 hover:no-underline">
          contact
        </Link>
        .
      </p>
    </PageShell>
  )
}
