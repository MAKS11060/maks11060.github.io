<script lang="ts">
  const uri = new URL(location.href)

  const pages = [
    {title: 'Main', href: '/'},
    {title: 'Links', href: '/links'},
  ]
</script>

<header class="navbar bg-base-100">
  <nav class="navbar-start">
    <ul class="flex gap-2">
      {#each pages as { href, title }}
        <li>
          <a class="btn" class:btn-primary={uri.pathname === href} {href}>
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="navbar-center">
    <span class="btn text-xl font-mono">MAKS11060</span>
  </div>
  <div class="navbar-end">
    <ul>
      <li>
        <a class="btn btn-link" href="https://github.com/maks11060">
          GitHub
          <img
            class="mask mask-circle"
            src="https://avatars.githubusercontent.com/u/31521952?v=4&s=48"
            alt="MAKS11060 user avatar"
            loading="lazy"
          />
        </a>
      </li>
    </ul>
  </div>
</header>
