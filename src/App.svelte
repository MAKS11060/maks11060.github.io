<script lang="ts">
	import Background from './component/Background.svelte'
	import Layout from './layout/Layout.svelte'
	import {pages} from './store.ts'

	const uri = new URL(location.href)
	if (uri.searchParams.has('status')) {
		const status = Number(uri.searchParams.get('status'))
		if (status === 404) {
			uri.searchParams.delete('status')
			console.log('from', status)
			history.replaceState(null, '', uri.searchParams.get('path'))
		}
	}
</script>

<Layout>
	{#each [...pages] as {component, href}}
		{#if location.pathname.startsWith(href)}
			<svelte:component this={component}/>
		{/if}
	{/each}
</Layout>

{#if !pages.find(v => location.pathname.startsWith(v.href))}
	<Background/>
{/if}
