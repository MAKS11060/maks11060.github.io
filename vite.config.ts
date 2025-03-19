import {svelte} from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
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
    // deno(),
    svelte(),
    tailwindcss(),
    // noCrossOrigin(),
  ],
  server: {hmr: {host: 'localhost', protocol: 'ws', clientPort: 5173}},
})
