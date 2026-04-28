'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

function styleActions(actions: ReactNode): ReactNode {
  if (!actions) return null
  return <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>
}

export function PageShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string
  description?: string
  /** Small caps label above the title (e.g. "Legal", "System"). */
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#0c0c0c]">
      <NavbarShell />
      <main>
        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                {eyebrow ? (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6b6560]">{eyebrow}</p>
                ) : null}
                <h1 className="mt-2 text-3xl font-bold uppercase leading-tight tracking-tight text-[#0c0c0c] sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4a4540]">{description}</p>
                ) : null}
              </div>
              {actions ? (
                <div className="[&_a]:inline-flex [&_a]:h-11 [&_a]:items-center [&_a]:justify-center [&_a]:border [&_a]:border-[#0c0c0c] [&_a]:bg-transparent [&_a]:px-5 [&_a]:text-[10px] [&_a]:font-semibold [&_a]:uppercase [&_a]:tracking-[0.2em] [&_a]:text-[#0c0c0c] [&_a]:transition-colors [&_a]:no-underline [&_a:hover]:bg-[#0c0c0c] [&_a:hover]:text-[#F5F1EB] [&_button]:inline-flex [&_button]:h-11 [&_button]:items-center [&_button]:justify-center [&_button]:border [&_button]:border-[#0c0c0c] [&_button]:bg-[#0c0c0c] [&_button]:px-5 [&_button]:text-[10px] [&_button]:font-semibold [&_button]:uppercase [&_button]:tracking-[0.2em] [&_button]:text-[#F5F1EB] [&_button]:shadow-none [&_button:hover]:bg-transparent [&_button:hover]:text-[#0c0c0c] [&_button]:rounded-none [&_input]:h-11 [&_input]:border-black/15 [&_input]:bg-white/80 [&_input]:text-sm">
                  {styleActions(actions)}
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-14 lg:py-16">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
