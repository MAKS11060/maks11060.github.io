<script lang="ts">
  import Links from './components/Links.svelte'
  import Main from './components/Main.svelte'

  const uri = new URL(location.href)
  if (uri.searchParams.has('status')) {
    const status = Number(uri.searchParams.get('status'))
    if (status === 404) {
      uri.searchParams.delete('status')
      console.log('from', status)
      history.replaceState(null, '', uri.searchParams.get('path'))
    }
  }

  const pages = {
    '/': Main,
    '/links': Links,
  }

  let currentPages = pages[uri.pathname]
</script>

<svelte:component this={currentPages}/>

<!-- <Layout>
  {#each [...pages] as { component, href }}
    {#if location.pathname.startsWith(href)}
      <svelte:component this={component} />
    {/if}
  {/each}
</Layout>

{#if !pages.find((v) => location.pathname.startsWith(v.href))}
  <Background />
{/if} -->
