<script lang="ts" >
  import { Link } from '@maks11060/svelte5-router'
  import { onMount } from 'svelte'
  import { isAuth, logout, token } from '../../../src2/lib/auth.ts'
  import { userStore } from '../../../src2/lib/user.ts'
  import Drawer from '../Drawer.svelte'

  // let {}: {} = $props()

  let drawerOpen = $state(false)

  const links = [
    {href: '/profile', text: 'Your profile'},
    {href: '/settings', text: 'Settings'},
    {},
  ]

  // dev
  // drawerOpen = true
  const bc = new BroadcastChannel('dev2')
  bc.onmessage = (e) => {
    if (e.data === 'reload') location.reload()
    if (e.data === 'console') console.clear()
  }
  onMount(() => {
    return () => bc.close()
  })
</script>

<header class="shadow-sm navbar bg-neutral">
  <div class="navbar-start">
    <Link class="text-xl btn btn-neutral" to="/">Mdb</Link>
  </div>

  <div class="navbar-end">
<!--     <button
      class="mr-4 btn btn-primary btn-sm"
      onclick={() => {
        console.clear()
        bc.postMessage('console')
      }}
    >
      Clear
    </button>
    <button
      class="mr-4 btn btn-primary btn-sm"
      onclick={() => {
        location.reload()
        bc.postMessage('reload')
      }}
    >
      Reload <span class="font-mono">{$token?.slice(-4)}</span>
    </button> -->
    {#if $isAuth}
      <button
        tabindex="0"
        class="btn btn-ghost btn-circle avatar"
        onclick={() => drawerOpen = true}
        onselect={() => drawerOpen = true}
      >
        <div class="w-10 rounded-full">
          {#if $userStore?.avatar}
            <img alt="User avatar" src={$userStore?.avatar} referrerpolicy="no-referrer" />
          {:else}
            <div class="w-full h-full bg-primary"></div>
          {/if}
        </div>
      </button>
    {:else}
      <Link class="btn btn-primary" to="/login">
        Login
      </Link>
    {/if}
  </div>
</header>

{#if $isAuth}
  <Drawer bind:open={drawerOpen}>
    {#snippet drawer()}
      <div class="flex flex-row items-center justify-between">
        <div class="avatar">
          <div class="w-8 rounded-full">
            {#if $userStore?.avatar}
              <img alt="User avatar" src={$userStore?.avatar} referrerpolicy="no-referrer" />
            {:else}
              <div class="w-full h-full bg-primary"></div>
            {/if}
          </div>
          <span class="ml-2 text-xl">{$userStore?.username}</span>
        </div>

        <button
          class="btn btn-sm btn-circle btn-ghost right-2 top-2"
          onclick={() => drawerOpen = false}
          onselect={() => drawerOpen = false}
        >
          ✕
        </button>
      </div>

      <div class="mt-8">
        <ul class="flex flex-col select-none">
          {#each links as {href, text}}
            {#if href}
              <li>
                <Link class="btn btn-block not-data-[active-link]:btn-ghost data-[active-link]:btn-primary" to={href}>
                  <div class="flex w-full">{text}</div>
                </Link>
              </li>
            {:else}
              <li class="divider"></li>
            {/if}
          {/each}
          <li class="">
            <button class="btn btn-ghost btn-block hover:bg-base-300" onclick={() => logout()}>
              <span class="flex w-full">Sing out</span>
            </button>
          </li>
        </ul>
      </div>
    {/snippet}
  </Drawer>
{/if}

<!-- <script lang="ts">
  import { Link } from '@maks11060/svelte5-router'

  // let {paths}: {paths: {href: string; text: string}[]} = $props()

  const paths = {
    Main: '/',
    Generator: '/generator',
    openapi: '/oas',
    test: '/test',
  } as const
</script>

<header>
  <nav>
    <Link class="link btn data-[active-link=page]:bg-primary" to={paths.Main}>Main</Link>
    <Link class="link btn data-[active-link=page]:bg-primary" to={paths.Generator}>Generator</Link>
    <Link class="link btn data-[active-link=page]:bg-primary" to={paths.openapi}>Openapi</Link>
    <Link class="link btn data-[active-link=page]:bg-primary" to={paths.test}>Test</Link>
  </nav>
</header> -->
