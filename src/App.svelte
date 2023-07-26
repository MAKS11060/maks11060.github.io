<script lang="ts">
	import Background from './component/Background.svelte'

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

<Background/>
<header class="border-b">
	<nav>
		<ul>
			{#each [
				{href: '/', name: 'Main'}
			] as {href, name}}
				<li class="flex"><a class="p-2" {href}>{name}</a></li>
			{/each}
		</ul>
	</nav>
</header>
<main class="flex justify-center">
</main>
