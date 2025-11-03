<script lang="ts">
  import Headers from './Headers.svelte'

  const links = $state({
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com/maks11060',
        bg: '#f0f6fc',
        color: '#000',
      },
      {
        name: 'Telegram',
        href: 'https://t.me/maks11060',
        bg: '#1c93e3',
        color: '#fff',
      },
    ],
    packages: [
      {
        name: 'JSR',
        href: 'https://jsr.io/@maks11060',
        bg: '#f8e230',
        color: '#000',
      },
      {
        name: 'NPM',
        href: 'https://www.npmjs.com/~maks11060',
        bg: '#cd0000',
        color: '#fff',
      },
    ],
  })
</script>

<Headers />

{#snippet linkGroup(
  title: string,
  links: {name: string; href: string; bg?: string; color?: string}[],
)}
  <div class="">
    <h2 class="text-center text-3xl font-mono">{title}</h2>
    <ul class="grid grid-cols-2 mt-4 gap-4 justify-center content-center">
      {#each links as {name, href, color, bg}}
        <li class="flex justify-center">
          {#if bg}
            <a
              class="btn btn-outline bg-[--btn-color] text-[--text-color] w-[150px] text-xl"
              style:--btn-color={bg}
              style:--text-color={color}
              {href}
            >{name}</a>
          {:else}
            <a class="btn btn-accent w-[150px] text-xl" {href}>{name}</a>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/snippet}

<main class="flex mt-8">
  <div class="mx-auto mt-8 flex flex-col gap-12">
    {@render linkGroup('Links', links.social)}
    {@render linkGroup('Packages', links.packages)}
  </div>
</main>
