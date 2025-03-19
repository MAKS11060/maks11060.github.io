<script lang="ts">
  import {Route, Router, navigate} from 'svelte5-router'
  import Links from './components/Links.svelte'
  import Main from './components/Main.svelte'

  let url = $state('')
  let uri = $state(new URL(location.href))

  // GitHub SPA 404 handler
  if (uri.searchParams.get('status') === '404') {
    console.log(Object.fromEntries(uri.searchParams.entries()))
    const prevUri = new URL(uri.searchParams.get('href'))
    uri.searchParams.delete('status')
    uri.searchParams.delete('href')
    uri.pathname = prevUri.pathname
    navigate(uri.toString(), {replace: true})
    // history.replaceState(null, '', uri ?? '/')
  }
</script>

<Router {url}>
  <Route path="/" component={Main} />
  <Route path="/links" component={Links} />
</Router>
