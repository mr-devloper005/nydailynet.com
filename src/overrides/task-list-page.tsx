import Link from 'next/link'
import { ArchiveSearchForm } from '@/components/shared/archive-search-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full post for the complete update.'
  return value.length > 220 ? value.slice(0, 217).trimEnd() + '...' : value
}

const ghost =
  'inline-flex items-center justify-center border border-[#0c0c0c] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0c0c0c] transition-colors hover:bg-[#0c0c0c] hover:text-[#F5F1EB]'

export async function TaskListPageOverride(_: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })
  const recent = posts.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#0c0c0c]">
      <NavbarShell />
      <header className="border-b border-black/10 px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6b6560]">Archive</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">All articles &amp; updates</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4a4540]">Browse every published dispatch in chronological order. Select a headline to read the full piece.</p>
      </header>
      <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:px-14 lg:py-16">
        <div className="space-y-16 lg:space-y-20">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-black/10 pb-14 last:border-0">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6560]">{String((post.content as { category?: string })?.category || 'Update')}</p>
              <h2 className="mx-auto mt-4 max-w-4xl text-center text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">{post.title}</h2>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5c5650]">
                <span>{new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>·</span>
                <span>by {post.authorName || 'Editorial Desk'}</span>
              </div>
              <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-[#3d3a36]">{excerpt(post.summary)}</p>
              <div className="mt-8 flex justify-center">
                <Link href={`/updates/${post.slug}`} className={ghost}>
                  Continue reading
                </Link>
              </div>
            </article>
          ))}
        </div>
        <aside className="space-y-8">
          <div className="border border-black/10 bg-white/50 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]">Search</p>
            <ArchiveSearchForm />
          </div>
          <div className="border border-black/10 bg-white/50 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]">Latest</p>
            <div className="mt-5 space-y-4">
              {recent.map((post) => (
                <Link key={post.id} href={`/updates/${post.slug}`} className="block border-b border-black/10 pb-4 text-sm font-medium leading-snug last:border-0 last:pb-0 hover:text-[#0c0c0c]">
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
