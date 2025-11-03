<script lang="ts">
  import Drawer from '../components/Drawer.svelte'
  import Layout from '../components/Layout/Layout.svelte'

  interface Props {}

  let {}: Props = $props()
  let drawerOpen = $state(false)

  const toggleDrawer = () => {
    drawerOpen = !drawerOpen
  }
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
    <h1 class="font-mono text-xl text-center">Empty page</h1>
  </Layout>
{/snippet}
