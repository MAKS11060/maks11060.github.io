<script lang="ts">
  import {Link} from '@maks11060/svelte5-router'
  import Drawer from '../components/Drawer.svelte'
  import Layout from '../components/Layout/Layout.svelte'

  interface Props {}

  let {}: Props = $props()
  let drawerOpen = $state(false)

  const toggleDrawer = () => {
    drawerOpen = !drawerOpen
  }

  //
  const tools = [
    {
      title: 'Bookmarks parser',
      href: '/bookmarks',
    },
  ]
</script>

<Drawer {content} bind:open={drawerOpen}>
  {#snippet drawer()}
    <div class="flex justify-end">
      <button
        class="btn btn-sm btn-circle btn-ghost right-2 top-2"
        onclick={toggleDrawer}
        onselect={toggleDrawer}
      >
        ✕
      </button>
    </div>
  {/snippet}
</Drawer>

{#snippet content()}
  <Layout>
    <!-- <button class="btn btn-primary" onclick={toggleDrawer}>Open</button> -->
    <!-- <h1 class="font-mono text-xl text-center">Empty page</h1> -->

    <div class="grid gap-4">
      <section class="grid m-4">
        <h2 class="text-3xl">Tools</h2>

        <ul class="mt-4 grid grid-cols-4">
          {#each tools as tool}
            <li>
              <Link class="btn btn-lg btn-primary btn-outline" to={tool.href}>{tool.title}</Link>
            </li>
          {/each}
        </ul>
      </section>
    </div>
  </Layout>
{/snippet}
