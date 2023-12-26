<script lang="ts">
  import {onMount} from 'svelte'
  import {fRender} from '../../lib/utils.ts'

  let canvas: HTMLCanvasElement
  let pTime = 0
  let fps

  onMount(() => {
    const ctx = canvas.getContext('2d')
    let t = 0

    return fRender((time) => {
      const {width, height} = canvas

      ctx.clearRect(0, 0, width, height)

      t += 0.3

      // grid
      // ctx.strokeStyle = 'gray'
      // for (let i = 0; i < width; i += 50) {
      // 	for (let j = 0; j < height; j += 50) {
      // 		ctx.strokeRect(i, j, 50, 50)
      // 	}
      // }

      // y center line
      ctx.strokeStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.lineTo(width / 2, height)
      ctx.stroke()

      // x center line
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()

      ctx.strokeStyle = 'hotpink'
      ctx.beginPath()

      let cx = 0
      let cy = height / 2
      ctx.moveTo(cx, cy) // set start
      for (let i = 0; i < 200; i++) {
        let x = i * 3
        let y = Math.sin(10 * i + (t / 180) * Math.PI) * 200
        ctx.lineTo(cx + x, cy + y)
      }
      ctx.stroke()

      // for (let i = 0; i < 5; i++) {
      // 	for (let j = 0; j < 5; j++) {
      // 		ctx.beginPath();
      // 		const x = 25 + j * 50; // x coordinate
      // 		const y = 25 + i * 50; // y coordinate
      // 		const radius = 20; // Arc radius
      // 		const startAngle = 0; // Starting point on circle
      // 		const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
      // 		const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise
      //
      // 		ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
      //
      // 		if (i > 1) {
      // 			ctx.fill();
      // 		} else {
      // 			ctx.stroke();
      // 		}
      // 	}
      // }

      /*ctx.clearRect(0, 0, width, height)
			ctx.save()
			ctx.translate(width / 2, height / 2)
			ctx.rotate(time * 0.0001)

			const range = Math.max(width, height) * 0.8
			const size = 64 + Math.sin(time * 0.0001) * 50
			for (let i = 0; i < range; i += size) {
				ctx.fillStyle = hsla(i / range * 0.3 + time * 0.0001, 1, 0.5, 1)
				ctx.fillRect(i, -range, size, range * 2)
				ctx.fillRect(-i, -range, size, range * 2)
			}

			ctx.restore()*/

      // FPS Counter
      fps = (1 / ((time - pTime) / 1000)).toFixed(1)
      pTime = time
    })
  })

  onMount(() => {
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight - 1
    })

    observer.observe(canvas)
    return () => observer.disconnect()
  })
</script>

<main class="flex">
  <samp class="fixed inset-0 text-right -z-10">FPS {fps}</samp>
  <canvas class="block h-full w-full bg-black" bind:this={canvas}></canvas>
</main>
