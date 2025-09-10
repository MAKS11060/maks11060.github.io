<script lang="ts">
  import { onMount, type Snippet } from 'svelte'

  interface Props {
    children?: Snippet<[{text: string; date: Date}]>
    time?: number | Date
    relative?: boolean
    locale?: string
    style?: Intl.RelativeTimeFormatStyle
    live?: boolean
  }

  let {
    children,
    time = new Date(),
    live,
    locale = navigator.language,
    relative = false,
    style = 'short',
  }: Props = $props()

  if (live === undefined) live = relative

  // Current timestamp
  let currentDate = $state(time instanceof Date ? time : new Date(time))
  let active = $derived(document.visibilityState === 'visible')
  let text = $derived.by(() => {
    return relative //
      ? getRelativeTime(time)
      : currentDate.toLocaleString()
  })

  const unitMap: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [3600, 'minute'],
    [86400, 'hour'],
    [86400 * 7, 'day'],
    [86400 * 30, 'week'],
    [86400 * 365, 'month'],
    [Infinity, 'year'],
  ]

  const getRelativeTime = (timestamp: number | Date) => {
    timestamp = timestamp instanceof Date ? timestamp.getTime() : timestamp

    const deltaSeconds = Math.round((timestamp - Date.now()) / 1000)
    const unitIndex = unitMap.findIndex(([value]) => value > Math.abs(deltaSeconds))
    const divisor = unitIndex ? unitMap[unitIndex - 1][0] : 1
    const val = Math.round(deltaSeconds / divisor)

    const rtf = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
      style,
    })
    return rtf.format(val, unitMap[unitIndex][1])
  }

  const onVisibilityChange = () => {
    active = document.visibilityState === 'visible'
  }

  const updateTime = () => {
    if (!active) return // prevent update
    // currentDate = new Date()
    // time = new Date()
  }

  updateTime()

  live && onMount(() => {
    const updateTimer = setInterval(updateTime, 250)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      clearInterval(updateTimer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  })
</script>

{#if children}
  {@render children?.({text, date: currentDate})}
{:else}
  <time datetime={currentDate.toISOString()} title={currentDate.toISOString()}>
    {text}
  </time>
{/if}

<!--
<script lang="ts">
  import {onMount} from 'svelte'

  // Code from: https://www.builder.io/blog/relative-time

  export let time: number | Date = new Date()
  export let relative = false
  export let locale = navigator.language
  export let style: Intl.RelativeTimeFormatStyle = 'short'
  export let live = false

  // Current timestamp
  let date = time instanceof Date ? time : new Date(time)
  let text = date.toLocaleString()
  let active = document.visibilityState === 'visible'

  const unitMap: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [3600, 'minute'],
    [86400, 'hour'],
    [86400 * 7, 'day'],
    [86400 * 30, 'week'],
    [86400 * 365, 'month'],
    [Infinity, 'year'],
  ]

  const getRelativeTime = (timestamp: number | Date) => {
    timestamp = timestamp instanceof Date ? timestamp.getTime() : timestamp

    const deltaSeconds = Math.round((timestamp - Date.now()) / 1000)
    const index = unitMap.findIndex(
      ([value, u]) => value > Math.abs(deltaSeconds)
    )
    const divisor = index ? unitMap[index - 1][0] : 1

    const rtf = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
      style,
    })
    return rtf.format(Math.round(deltaSeconds / divisor), unitMap[index][1])
  }

  const updateTime = () => {
    if (!active) return // prevent update
    text = getRelativeTime(date)
  }

  const onVisibilityChange = (ev: DocumentEventMap['visibilitychange']) => {
    active = document.visibilityState === 'visible'
  }

  if (relative) {
    onMount(() => {
      updateTime()
      const t = setInterval(updateTime, 1000)
      document.addEventListener('visibilitychange', onVisibilityChange)
      return () => {
        clearInterval(t)
        document.removeEventListener('visibilitychange', onVisibilityChange)
      }
    })
  } else if (live) {
    onMount(() => {
      const updateTime = () => {
        if (!active) return // prevent update
        date = new Date()
        text = date.toJSON() // print default
      }

      updateTime()
      const t = setInterval(updateTime, 250)
      document.addEventListener('visibilitychange', onVisibilityChange)
      return () => {
        clearInterval(t)
        document.removeEventListener('visibilitychange', onVisibilityChange)
      }
    })
  }
</script>

<time datetime={date.toISOString()} title={date.toISOString()} {...$$restProps}>
  <slot time={date}>
    {text}
  </slot>
</time>

-->
