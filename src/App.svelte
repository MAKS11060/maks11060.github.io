<script lang="ts">
  import {navigate, Route, Router} from '@maks11060/svelte5-router'

  import NotFound from './pages/404.svelte'
  import Main from './pages/Main.svelte'
  import Test1 from './pages/Test1.svelte'
  import Codec from './pages/Tools/Codec.svelte'
  import Bookmarks from './pages/Tools/Parser/Bookmarks.svelte'
  import Hash from './pages/Tools/Hash.svelte'

  let uri = $state(new URL(location.href))

  // GitHub SPA 404 handler
  if (uri.searchParams.get('status') === '404') {
    console.log(Object.fromEntries(uri.searchParams.entries()))
    const prevHref = uri.searchParams.get('href')
    if (prevHref) {
      uri.searchParams.delete('status')
      uri.searchParams.delete('href')
      uri.pathname = new URL(prevHref).pathname
      navigate(uri.toString(), {replace: true})
    }
  }
</script>

<Router>
  <Route path="/" component={Main} />

  <Route path="/test1" component={Test1} />

  <Route path="/bookmarks" component={Bookmarks} />
  <Route path="/codec" component={Codec} />
  <Route path="/hash" component={Hash} />

  <Route component={NotFound} />
</Router>
