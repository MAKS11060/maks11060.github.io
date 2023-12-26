<script lang="ts">
  import {onMount} from 'svelte'

  let canvas: HTMLCanvasElement

  onMount(() => {
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight - 1
    })

    observer.observe(canvas)
    return () => observer.disconnect()
  })

  onMount(() => {
    const ctx = canvas.getContext('2d')

    const hsla = (h, s, l, a) =>
      `hsla(${h * 360}, ${s * 100}%, ${l * 100}%, ${a})`

    return fRender((time) => {
      const {width, height} = canvas

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(time * 0.0001)

      const range = Math.max(width, height) * 0.8
      const size = 64 + Math.sin(time * 0.0001) * 50
      for (let i = 0; i < range; i += size) {
        ctx.fillStyle = hsla((i / range) * 0.3 + time * 0.0001, 1, 0.5, 1)
        ctx.fillRect(i, -range, size, range * 2)
        ctx.fillRect(-i, -range, size, range * 2)
      }

      ctx.restore()
    })
  })
</script>

<main class="flex">
  <canvas class="block h-full w-full bg-black" bind:this={canvas}></canvas>
</main>
