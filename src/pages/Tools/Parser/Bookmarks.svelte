<script lang="ts">
  import {Link} from '@maks11060/svelte5-router'
  import {get} from 'svelte/store'
  import {useSessionStorage} from '../../../lib/hooks.ts'

  let files: FileList | undefined = $state()
  let links: {
    title: string
    href: string
    date: Date
  }[] = $state([])
  let filterVal: string = $state('https://')

  const bookmarksStore = useSessionStorage('bookmarks', [] as typeof links)
  links = get(bookmarksStore)

  // options
  const outputFormatOptions = [/* 'List', */ 'Json', 'Json (href)'] as const
  const sortOrderOptions = ['default', 'desc', 'asc'] as const
  const sortByOptions: (keyof typeof links[number])[] = ['href', 'date', 'title']

  const bookmarksOptionsStore = useSessionStorage<{
    outputFormat: typeof outputFormatOptions[number]
    sortOrder: typeof sortOrderOptions[number]
    sortBy: typeof sortByOptions[number]
  }>('bookmarks-options', {
    outputFormat: 'Json',
    sortOrder: 'default',
    sortBy: 'date',
  })

  let options = $state(get(bookmarksOptionsStore))

  // $inspect(options)

  // result
  let items = $derived.by(() => {
    filterVal

    // filter
    let res = links.filter((v) => {
      if (!filterVal.trim()) return
      return v.href.startsWith(filterVal.trim())
    })

    // sort
    if (options.sortOrder !== 'default') {
      res = res.sort((a, b) => {
        // return
        if (options.sortBy === 'href' || options.sortBy === 'title') {
          return (options.sortOrder === 'desc' ? -1 : 1) * a[options.sortBy].localeCompare(b[options.sortBy])
        }

        if (options.sortBy === 'date') {
          return (options.sortOrder === 'desc' ? -1 : 1) *
              Date.parse(a[options.sortBy].toString()) - Date.parse(b[options.sortBy].toString())
        }

        return 0
      })
    }

    if (options.outputFormat === 'Json (href)') {
      return res.flatMap((v) => v.href)
    }

    return res
  })

  const parseBookmarks = async () => {
    const file = files?.item(0)
    if (!file) return null
    const doc = new DOMParser().parseFromString(await file.text(), 'text/html')

    links = Array.from(doc.querySelectorAll('a'), (el) => {
      return {
        href: el.href,
        title: el.textContent,
        date: new Date(
          parseInt(el.getAttribute('add_date')!, 10) * 1000,
        ),
      }
    })
  }

  const copyJson = () => {
    navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': JSON.stringify(items, null, 2),
      }),
    ])
  }

  $effect(() => {
    parseBookmarks()
  })
  // update store
  $effect(() => bookmarksStore.set(links))
  $effect(() => bookmarksOptionsStore.set(options))
</script>

<Link class="m-1 btn btn-primary btn-outline absolute" to="/">Main</Link>

<h1 class="font-semibold text-center text-2xl">Browser Bookmarks Parser</h1>

<main class="grid gap-2 justify-center mt-4">
  <div>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Pick a bookmarks.html</legend>
      <input class="file-input file-input-accent" type="file" accept="text/html" bind:files>
    </fieldset>

    <button class="btn btn-sm btn-error btn-outline" onclick={() => links = []}>Clear</button>
    <span class="opacity-80">Stored links: <span class="font-mono">{links.length}</span></span>
  </div>
</main>

<div class="grid grid-cols-1 sm:grid-cols-[110px_2fr_1fr] m-2 p-2 bg-base-300 rounded-box border border-primary gap-2">
  <fieldset class="fieldset row-start-2 sm:row-start-auto">
    <legend class="fieldset-legend">Format</legend>
    <select class="select select-primary w-full" bind:value={options.outputFormat}>
      <option disabled selected>Output format</option>
      {#each outputFormatOptions as value}
        <option {value}>{value}</option>
      {/each}
    </select>
  </fieldset>

  <fieldset class="fieldset row-start-1 col-span-2 sm:row-start-auto sm:col-span-1">
    <legend class="fieldset-legend">Link filter</legend>
    <input class="input input-accent w-full" type="text" placeholder="filter" bind:value={filterVal}>
  </fieldset>

  <div class="grid grid-cols-2 gap-1 row-start-2 sm:row-start-auto">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Sort By</legend>

      <select class="select select-primary" bind:value={options.sortBy}>
        {#each sortByOptions as value}
          <option {value}>{value}</option>
        {/each}
      </select>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Sort Order</legend>

      <select class="select select-primary" bind:value={options.sortOrder}>
        {#each sortOrderOptions as value}
          <option {value}>{value}</option>
        {/each}
      </select>
    </fieldset>
  </div>
</div>

<div class="m-4 relative">
  {#if options.outputFormat === 'Json' || options.outputFormat === 'Json (href)'}
    <div class="bg-base-300 p-2 rounded-box opacity-70">
      <span class="select-none">view items: {items.length}</span>
      <div class="absolute right-2">
        <div class="tooltip tooltip-left" data-tip="Copy">
          <button class="btn btn-primary btn-outline" aria-label="Copy" onclick={() => copyJson()}>
            <span class="iconify mdi--content-copy"></span>
          </button>
        </div>
      </div>

      <pre><code class="text-pretty break-all ">{JSON.stringify(items, null, 2)}</code></pre>
    </div>
  {/if}
</div>
