import {svelte} from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import tailwindcss from 'tailwindcss'
import {defineConfig} from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  plugins: [
    svelte({
      preprocess: [sveltePreprocess()],
    }),
  ],
})
