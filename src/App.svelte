<script lang="ts">
  import Links from './components/Links.svelte'
  import Main from './components/Main.svelte'

  let uri = $state(new URL(location.href))

  // GitHub SPA 404 handler
  if (uri.searchParams.get('status') === '404') {
    console.log(Object.fromEntries(uri.searchParams.entries()))
    uri.searchParams.delete('status')
    uri.pathname = uri.searchParams.get('path')
    history.replaceState(null, '', uri.searchParams.get('path') ?? '/')
  }

  const pages = {
    '/': Main,
    '/links': Links,
  }

  let currentPages = $derived(pages[uri.pathname] ?? pages['/'])
</script>

<svelte:component this={currentPages} />
