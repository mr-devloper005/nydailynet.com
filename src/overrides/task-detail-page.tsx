import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArchiveSearchForm } from '@/components/shared/archive-search-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getHeroImage(post: { media?: { url?: string }[]; content?: unknown; summary?: string | null }) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const recent = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 5)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')

  const ghost =
    'inline-flex items-center justify-center border border-[#0c0c0c] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0c0c0c] transition-colors hover:bg-[#0c0c0c] hover:text-[#F5F1EB]'

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#0c0c0c]">
      <NavbarShell />
      <section className="border-b border-black/10 px-5 pb-14 pt-12 sm:px-8 lg:px-14 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6b6560]">Article</p>
          <h1 className="mt-5 text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#5c5650]">
            <span>{new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="hidden sm:inline">·</span>
            <span>by {post.authorName || 'Editorial Desk'}</span>
          </div>
          <nav className="mt-8 flex flex-wrap justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b6560]">
            <Link href="/" className="hover:text-[#0c0c0c]">
              Home
            </Link>
            <span aria-hidden>·</span>
            <Link href="/updates" className="hover:text-[#0c0c0c]">
              Archive
            </Link>
          </nav>
        </div>
        <div className="relative mx-auto mt-12 aspect-[21/9] max-w-5xl overflow-hidden bg-black/5 sm:mt-16">
          <ContentImage src={getHeroImage(post)} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 80vw" priority />
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 lg:px-14 lg:py-16">
        <article>
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-p:text-[#2d2a26] prose-a:text-[#0c0c0c]">
            <RichContent html={html} />
          </div>
          <div className="mt-14 grid gap-0 border border-black/10 md:grid-cols-2">
            {recent.slice(0, 2).map((item, index) => (
              <Link
                key={item.id}
                href={`/updates/${item.slug}`}
                className={`border-black/10 p-6 transition-colors hover:bg-black/[0.02] ${index === 0 ? 'border-b md:border-b-0 md:border-r md:border-black/10' : ''}`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]">{index === 0 ? 'Previous' : 'Next read'}</p>
                <p className="mt-3 text-base font-semibold uppercase leading-snug tracking-tight text-[#0c0c0c]">{item.title}</p>
                <span className={`${ghost} mt-5`}>Open</span>
              </Link>
            ))}
          </div>
        </article>

        <aside className="space-y-8">
          <div className="border border-black/10 bg-white/50 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]">Search</p>
            <ArchiveSearchForm />
          </div>
          <div className="border border-black/10 bg-white/50 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6560]">More updates</p>
            <div className="mt-5 space-y-4">
              {recent.map((item) => (
                <Link key={item.id} href={`/updates/${item.slug}`} className="block border-b border-black/10 pb-4 text-sm font-medium leading-snug text-[#2d2a26] last:border-0 last:pb-0 hover:text-[#0c0c0c]">
                  {item.title}
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
