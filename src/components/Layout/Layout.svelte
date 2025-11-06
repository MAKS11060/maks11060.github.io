<script lang="ts">
  import type {Snippet} from 'svelte'
  import Header from '../Header.svelte'

  interface Props {
    children: Snippet
    title?: string
  }

  let {children, title}: Props = $props()
</script>

<Header {title}></Header>
{@render children?.()}
