<script lang="ts">
  import Links from './components/Links.svelte'
  import Main from './components/Main.svelte'

  let uri = $state(new URL(location.href))

  // GitHub SPA 404 handler
  if (uri.searchParams.get('status') === '404') {
    console.log(Object.fromEntries(uri.searchParams.entries()))
    uri.searchParams.delete('status')
    const prevUri = new URL(uri.searchParams.get('href'))
    uri.pathname = prevUri.pathname
    history.replaceState(null, '', uri ?? '/')
  }

  const pages = {
    '/': Main,
    '/links': Links,
  }

  let currentPages = $derived(pages[uri.pathname] ?? pages['/'])
</script>

<svelte:component this={currentPages} />
