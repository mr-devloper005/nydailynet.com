'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const navItems = [
  { label: 'Stories', href: '/' },
  { label: 'Archive', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F5F1EB]/95 text-[#0c0c0c] backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-14">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/80 p-1 shadow-sm">
            <img src="/favicon.png?v=20260423" alt="" width="36" height="36" className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5c5650] sm:block">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center justify-center gap-10 md:flex lg:gap-14">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
                  active ? 'text-[#0c0c0c]' : 'text-[#6b6560] hover:text-[#0c0c0c]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-[#0c0c0c] transition-colors hover:bg-black/[0.04]"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px] stroke-[1.25]" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-[#F5F1EB] px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0c0c0c]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]" onClick={() => setOpen(false)}>
              Search
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
