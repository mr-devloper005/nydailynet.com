import { PageShell } from '@/components/shared/page-shell'
import { Search } from 'lucide-react'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined,
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as { type?: string }).type)
    if (typeText === 'comment') return false
    const description = compactText((content as { description?: string }).description)
    const body = compactText((content as { body?: string }).body)
    const excerpt = compactText((content as { excerpt?: string }).excerpt)
    const categoryText = compactText((content as { category?: string }).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <PageShell
      eyebrow="Search"
      title="Archive search"
      description={
        query
          ? `Results for “${query}” across articles and updates.`
          : 'Browse the latest posts across every enabled surface, or enter a query to narrow the list.'
      }
      actions={
        <form action="/search" className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6560]" aria-hidden />
            <input
              name="q"
              defaultValue={query}
              placeholder="Headlines, topics, tags…"
              className="h-11 w-full border border-black/15 bg-white/80 py-2 pl-10 pr-3 text-sm text-[#0c0c0c] outline-none placeholder:text-[#6b6560] focus:border-black/30"
            />
          </div>
          <button
            type="submit"
            className="h-11 shrink-0 border border-[#0c0c0c] bg-[#0c0c0c] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F1EB] transition-colors hover:bg-transparent hover:text-[#0c0c0c]"
          >
            Search
          </button>
        </form>
      }
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const taskKey = getPostTaskKey(post)
            const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
            return <TaskPostCard key={post.id} post={post} href={href} />
          })}
        </div>
      ) : (
        <div className="border border-dashed border-black/20 bg-white/40 px-8 py-16 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b6560]">No matches</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4a4540]">
            Try a shorter keyword, check spelling, or clear filters—new dispatches appear here as soon as they publish.
          </p>
        </div>
      )}
    </PageShell>
  )
}
