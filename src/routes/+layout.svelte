<script>
	import '../app.css';
	import '$lib/scss/global.scss';
</script>

<nav>
	<a href="http://mtelsys.no/">mtelsys.no</a>
</nav>

<main>
	<slot></slot>
</main>

<footer>
	<p>© 2024 mtelsys.no</p>
</footer>

<style lang="scss">
	nav {
		color: $grey-darken-5;
		padding: 1rem;

		a {
			color: $grey-darken-5;
			text-decoration: none;
			font-weight: bold;
			font-size: 1rem;

			&:hover {
				text-decoration: none !important;
			}

			&:visited {
				color: $grey-darken-5;
			}
		}
		a:hover {
			text-decoration: underline;
		}
	}

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
