<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {ClassValue} from 'svelte/elements'

  let {
    content,
    drawer,
    open = $bindable(false),
    side = 'right',
    ...rest
  }: {
    content?: Snippet
    drawer: Snippet
    open?: boolean
    side?: 'left' | 'right'
    class?: ClassValue
  } = $props()
</script>

<div class={['drawer', side === 'right' && 'drawer-end', rest.class]}>
  <input type="checkbox" class="drawer-toggle" bind:checked={open}>
  <div class="drawer-content">
    <!-- Page content here -->
    {@render content?.()}
  </div>
  <div class="drawer-side">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <label aria-label="close sidebar" class="drawer-overlay" onclick={(e) => open = false}></label>
    <div
      class={[
        'min-h-full p-4 outline-base-300 outline-1 bg-base-100 text-base-content w-80',
        side === 'right' ? ' rounded-l-2xl' : 'rounded-r-2xl',
      ]}
    >
      {@render drawer()}
    </div>
  </div>
</div>
