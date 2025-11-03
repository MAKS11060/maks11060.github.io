<script lang="ts">
  import {Link} from '@maks11060/svelte5-router'

  interface Props {}

  let {}: Props = $props()
  const links = [
    {href: '/', title: 'Main'},
    {href: '/cmd', title: 'cmd'},
  ]
</script>

<header class="navbar bg-base-300">
  <nav class="navbar-start">
    <ul class="flex gap-1">
      {#each links as {href, title}}
        <li>
          <Link
            class="btn btn-primary not-data-[active-link=page]:btn-outline data-[active-link=step]:btn-accent"
            to={href}
          >
            {title}
          </Link>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="navbar-center">
    <!-- <span class="font-mono text-xl btn">MAKS11060</span> -->
  </div>
  <div class="navbar-end">
    <ul>
      <!-- <li>
        <a class="btn btn-link" href="https://github.com/maks11060">
          GitHub
          <img
            class="mask mask-circle"
            src="https://avatars.githubusercontent.com/u/31521952?v=4&s=48"
            alt="MAKS11060 user avatar"
            loading="lazy"
          />
        </a>
      </li> -->
    </ul>
  </div>
</header>
