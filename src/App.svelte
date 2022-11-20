<script lang="ts" context="module">
	import './style/style.scss'
</script>

<script lang="ts">
	import {Router, Route, links} from 'svelte-routing'

	let pages: {
		href: string
		name: string
	}[] = [
		{href: '/pages/app-1', name: 'app 1'},
		{href: '/pages/app-2', name: 'app 2'},
	]

	const prefix = 'https://maks11060.keenetic.link'

</script>

<svelte:head>
	<!--	<link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
					integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
					referrerpolicy="no-referrer" rel="stylesheet"/>-->
</svelte:head>

<style lang="scss">
	main {
		max-width: 800px;
		margin: 2rem auto 0;

		nav {
			display: flex;
			padding: 1em;
			border: 1px solid var(--color-border-default);
			border-radius: var(--border-radius);
			background-color: var(--color-canvas-inset);
			gap: 1em;

			a {
				padding: .5em .8em;
				border: 1px solid var(--color-border-default);
				border-radius: var(--border-radius-sm);
				background-color: var(--color-canvas-default);

				&:hover {
					//background-color: var(colo);
				}
			}
		}
	}
</style>

<Router>
	<Route path="/">
		<main use:links>
			<nav>
				{#each pages as page}
					<a href={page.href}>{page.name}</a>
				{/each}
			</nav>
		</main>
	</Route>
<!--	<Route path="/pages/*id" let:params>-->
<!--		{@html `${prefix}/${params.id}`}-->
<!--		<iframe src={`${prefix}/${params.id}`} frameborder="0"></iframe>-->
<!--	</Route>	-->
</Router>
