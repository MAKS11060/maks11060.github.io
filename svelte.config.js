import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess({
    script: true,
    style: true,
  }),

	compilerOptions: {
		experimental: {
			async: true
		}
	}
}
