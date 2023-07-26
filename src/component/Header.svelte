<script lang="ts">
	import {pages} from '../store.ts'
</script>

<header class="flex sm:px-3 p-0.5">
	<nav class="flex">
		<ul class="flex">
			{#each [
				{href: '/', name: 'Main'},
				...pages
			] as {href, name}}
				<li><a class="block rounded-md p-2 px-3 hover:bg-white hover:bg-opacity-30" {href}>{name}</a></li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		@apply border-b border-[#292a2d];
	}
</style>
