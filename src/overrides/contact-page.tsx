import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Editorial desk"
      description="For corrections, announcement requests, syndication, or publishing enquiries, use the channels below. Contributors may also reply through their author account."
      actions={
        <>
          <Link href="/updates">Archive</Link>
          <Link href="/">Home</Link>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        <div className="border border-black/10 bg-white/50 p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b6560]">Editorial</p>
          <p className="mt-5 text-base font-semibold text-[#0c0c0c]">editor@example.com</p>
          <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">Stories, fact-checks, corrections, and column pitches.</p>
        </div>
        <div className="border border-black/10 bg-white/50 p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b6560]">General</p>
          <p className="mt-5 text-base font-semibold text-[#0c0c0c]">contact@example.com</p>
          <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">Partnerships, technical issues, and other requests.</p>
        </div>
      </div>

      <div className="mt-12 max-w-2xl border-t border-black/10 pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b6560]">Response time</p>
        <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">
          We aim to acknowledge editorial mail within two business days. Urgent corrections are prioritized same-day when flagged in
          the subject line.
        </p>
      </div>
    </PageShell>
  )
}
