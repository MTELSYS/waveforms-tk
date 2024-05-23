<script>
	import '../app.css';
	import '$lib/scss/global.scss';

	import { Navbar, NavBrand } from 'flowbite-svelte'
</script>

<Navbar rounded color="none">
	<NavBrand href="http://mtelsys.no">
		<img src="./images/elsys-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Elsys Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold">MTELSYS</span>
	</NavBrand>
</Navbar>

<main>
	<slot></slot>
</main>

<footer>
	<p>© 2024 mtelsys.no</p>
</footer>

<style lang="scss">
	main {
		padding-inline: 1rem;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		padding-bottom: 500px;

		@include desktop {
			max-width: 900px;
		}
	}

	footer {
		position: absolute;
		bottom: 0;
		height: 450px;
		width: 100%;
		background: $blue;
	}
</style>
