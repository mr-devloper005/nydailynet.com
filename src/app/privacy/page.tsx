import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Data we collect',
    body: 'Account details you provide, basic usage signals to keep the site reliable, and content you submit for publication or comments.',
  },
  {
    title: 'How we use data',
    body: 'To operate the newsroom, deliver email you opt into, improve search and reading layouts, and protect against abuse or fraud.',
  },
  {
    title: 'Your choices',
    body: 'Manage marketing preferences from your account, request an export where applicable, or ask us to delete personal data subject to legal retention needs.',
  },
  {
    title: 'Contact',
    body: 'Questions about this policy can be sent through the editorial desk on the contact page.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="How we collect, use, and protect personal information across this publication."
      actions={<Link href="/contact">Contact</Link>}
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
