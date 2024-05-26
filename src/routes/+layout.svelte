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

<footer class="w-full">
	<img src="./images/footer-separator.svg" alt="Elsys Logo" />
	<div class="footer-content w-full h-auto px-6 py-6">
		<h2 class="font-bold">MTELSYS</h2>
		<p>mtelsys.no © 2024</p>
	</div>
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
			max-width: 960px;
		}
	}

	footer {
		position: absolute;
		bottom: 0;
		height: 450px;
		width: 100%;
		background: $blue;
		color: $blue-lighten-4;
	}
</style>
