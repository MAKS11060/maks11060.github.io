import {readable} from 'svelte/store'
import Canvas1 from './component/canvas/Canvas1.svelte'
import Canvas2 from './component/canvas/Canvas2.svelte'
import Main from './component/Main.svelte'

export const pages = [
  {href: '/', name: 'Main', component: Main},
  {href: '/canvas/1', name: 'Canvas 1', component: Canvas1},
  {href: '/canvas/2', name: 'Canvas 2', component: Canvas2},
]

export const date = readable(new Date(), (set) => {
  const interval = setInterval(() => set(new Date()), 1000)
  return () => clearInterval(interval)
})
