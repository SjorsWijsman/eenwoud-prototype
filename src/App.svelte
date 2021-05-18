<script>
import Header from './components/Header.svelte';
import AudioPlayer from './components/AudioPlayer.svelte';
</script>

<style>
header {
	background: radial-gradient(ellipse at bottom, var(--color-sky-light) -50%, var(--color-sky-dark) 150%);
	background-repeat: no-repeat;
	background-attachment: fixed;
	min-height: 100vh;
}

main {
	background-image: url('../resources/images/forest-path.jpeg');
	min-height: 150vh;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	margin-top: 35vh;
}
</style>

<AudioPlayer/>	
<header>
	<Header/>
</header>

<main>
<img src="" alt="">
</main>