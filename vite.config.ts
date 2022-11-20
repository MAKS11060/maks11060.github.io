import {svelte} from '@sveltejs/vite-plugin-svelte'
// @ts-ignore
import minmax from 'postcss-media-minmax'
import {defineConfig} from 'vite'
import {qrcode} from 'vite-plugin-qrcode'

export default defineConfig(env => {
	const isProduction = env.mode === 'production'

	return {
		// root: 'src',
		// publicDir: '../public',

		plugins: [
			qrcode({
				filter: url => url.startsWith('http://192.'),
			}),

			svelte({
				compilerOptions: {
					dev: !isProduction,
					enableSourcemap: !isProduction,
				},
				experimental: {
					useVitePreprocess: true,
				},
			}),
		],
		css: {
			postcss: {
				plugins: [minmax],
			},
		},
		build: {
			// outDir: '../dist',
			minify: isProduction,
		},
	}
})
