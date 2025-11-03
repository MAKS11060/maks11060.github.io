<script lang="ts">
  import type {Snippet} from 'svelte'
  import Header from '../Header.svelte'

  interface Props {
    children: Snippet
  }

  let {children}: Props = $props()
</script>

<Header></Header>
{@render children?.()}
