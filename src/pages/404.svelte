<script lang="ts">
  import {navigate} from '@maks11060/svelte5-router'
  import {onMount, tick} from 'svelte'

  interface Props {}

  let {}: Props = $props()

  onMount(async () => {
    await tick()
    navigate('/')
  })
</script>

<main>404</main>
