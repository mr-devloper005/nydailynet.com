import { Search } from 'lucide-react'

/**
 * Sidebar search: submits to `/search` with the same query params as the main search page.
 */
export function ArchiveSearchForm() {
  return (
    <form action="/search" method="get" className="mt-4 flex border border-black/15 bg-[#F9F8F6]">
      <input type="hidden" name="master" value="1" />
      <input
        type="search"
        name="q"
        className="h-11 min-w-0 flex-1 border-0 bg-transparent px-3 font-serif text-sm text-[#0c0c0c] outline-none placeholder:font-serif placeholder:text-[#6b6560]"
        placeholder="Search the archive"
        autoComplete="off"
        aria-label="Search the archive"
      />
      <button
        type="submit"
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border-l border-black/10 text-[#3d3a36] transition-colors hover:bg-black/[0.04]"
        aria-label="Search"
      >
        <Search className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </form>
  )
}
