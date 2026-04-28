import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const ghost =
  'inline-flex items-center justify-center border border-[#0c0c0c] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0c0c0c] transition-colors hover:bg-[#0c0c0c] hover:text-[#F5F1EB]'

export function FooterOverride() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black/10 bg-[#ebe6df] text-[#0c0c0c]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#5c5650]">Don&apos;t miss a dispatch</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4a4540]">
              Headlines and media updates from the newsroom. Subscribe for alerts when new articles publish.
            </p>
            <Link href="/register" className={`${ghost} mt-8`}>
              Subscribe
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c5650]">Information</h4>
              <ul className="mt-5 space-y-3 text-sm text-[#3d3a36]">
                <li>
                  <Link href="/about" className="transition-colors hover:text-[#0c0c0c]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/updates" className="transition-colors hover:text-[#0c0c0c]">
                    Archive
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-[#0c0c0c]">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-[#0c0c0c]">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c5650]">Distribution</h4>
              <ul className="mt-5 space-y-3 text-sm text-[#3d3a36]">
                <li>
                  <Link href="/updates" className="transition-colors hover:text-[#0c0c0c]">
                    Latest updates
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="transition-colors hover:text-[#0c0c0c]">
                    Search articles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c5650]">Contact us</h4>
              <ul className="mt-5 space-y-3 text-sm text-[#3d3a36]">
                <li>
                  <Link href="/contact" className="transition-colors hover:text-[#0c0c0c]">
                    Editorial desk
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="transition-colors hover:text-[#0c0c0c]">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden border-t border-black/10 pt-10 lg:mt-24">
          <p className="whitespace-nowrap text-[clamp(2.5rem,11vw,7.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-[#0c0c0c]">
            {SITE_CONFIG.name}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#6b6560] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>{SITE_CONFIG.domain}</span>
          <span>Media distribution · {year}</span>
          <span>Editorial quality</span>
        </div>
      </div>
    </footer>
  )
}
