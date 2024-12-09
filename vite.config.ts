import {svelte} from '@sveltejs/vite-plugin-svelte'
import tailwind from 'tailwindcss'
import {defineConfig, type Plugin} from 'vite'

const noCrossOrigin = (): Plugin => {
  return {
    name: 'no-crossorigin',
    transformIndexHtml(html) {
      return html.replaceAll(`crossorigin `, '')
    },
  }
}

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    //
    svelte(),
    // noCrossOrigin(),
  ],
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  // server: {hmr: {host: 'localhost', protocol: 'ws', clientPort: 5173}},
})
