<script>
	import { onMount } from 'svelte'
	import { play } from '$lib/store'

	onMount(() => {
		$: console.log($play)
		if (play !== false) {
			$: console.log($play)
		}

		let animationCicle = 0
		let playState = false
		const canvas = document.querySelector('canvas')
		const ctx = canvas.getContext('2d')
		const canvasBreedte = canvas.width
		const canvasHoogte = canvas.height

		let taklengte,
			takkenSplitsing,
			takDikte,
			stamDikte,
			startPunten = []
		let animatieSnelheid = 5

		function boom() {
			if (animationCicle == 1) {
				return false
			} else {
				if (playState == true) {
					// Leeg de canvas
					ctx.fillRect(0, 0, canvasBreedte, canvasHoogte)

					// Maak de stam
					stam()

					// Maak de takken
					takken()

					animationCicle++
				}
			}
		}

		function stam() {
			// De lengte van de tak is een willekeurig getal tussen de 100 en 150px
			taklengte = 100 + Math.round(Math.random() * 50)

			// De dikte van de stam
			stamDikte = 15

			// Met hoeveel graden de takken splitsen (tussen 10 en 70 graden)
			takkenSplitsing = 10 + Math.round(Math.random() * 60)

			// De aflopende dikte van de takken
			takDikte = Math.round(5 + Math.random() * 2) / 10

			// Overige data over de boomstam
			let stam = {
				x: canvasBreedte / 2,
				y: taklengte + 100,
				angle: 10 + Math.round(Math.random() * 60),
			}

			// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

			// Teken de boomstam op de canvas
			ctx.beginPath()

			// Positie van de stam
			ctx.moveTo(stam.x, canvasHoogte - 10)
			ctx.lineTo(stam.x, canvasHoogte - stam.y)

			// zet de kleur van de stam
			ctx.strokeStyle = '#8a7362'

			// zet de dikte van de stam
			ctx.lineWidth = stamDikte

			// teken de stam
			ctx.stroke()

			// update de startpunten
			startPunten = []
			startPunten.push(stam)
		}

		function takken() {
			// De takLengte en takDikte dunner / kleiner maken
			taklengte = taklengte * takDikte
			stamDikte = stamDikte * takDikte
			ctx.lineWidth = stamDikte

			// Teken de takken op de canvas
			ctx.beginPath()
			const nieuweStartPunten = []

			for (let i = 0; i < startPunten.length; i++) {
				let startPunt = startPunten[i]

				let takEindeLinks = berekenTakEinde(
					startPunt.x,
					startPunt.y,
					startPunt.angle + takkenSplitsing,
					taklengte,
				)
				let takEindeRechts = berekenTakEinde(
					startPunt.x,
					startPunt.y,
					startPunt.angle - takkenSplitsing,
					taklengte,
				)
				let takEindeMidden = berekenTakEinde(
					startPunt.x,
					startPunt.y,
					startPunt.angle + takkenSplitsing + 35,
					taklengte,
				)

				// takken aan de rechterkant
				ctx.moveTo(startPunt.x, canvasHoogte - startPunt.y)
				ctx.lineTo(takEindeLinks.x, canvasHoogte - takEindeLinks.y)

				// takken aan de linkerkant
				ctx.moveTo(startPunt.x, canvasHoogte - startPunt.y)
				ctx.lineTo(takEindeRechts.x, canvasHoogte - takEindeRechts.y)

				// takken in het midden
				ctx.moveTo(startPunt.x, canvasHoogte - startPunt.y)
				ctx.lineTo(takEindeMidden.x, canvasHoogte - takEindeMidden.y)

				// de draaihoek van de takken berekenen
				takEindeLinks.angle = startPunt.angle + takkenSplitsing
				takEindeRechts.angle = startPunt.angle - takkenSplitsing
				takEindeMidden.angle = startPunt.angle + takkenSplitsing + 35

				// update de nieuwe start punten
				nieuweStartPunten.push(takEindeLinks)
				nieuweStartPunten.push(takEindeRechts)
				nieuweStartPunten.push(takEindeMidden)
			}

			// Zorg dat het einde van de tak, het nieuwe startpunt wordt van de nieuwe tak
			startPunten = nieuweStartPunten

			if (taklengte < 10) {
				ctx.strokeStyle = 'green'
			} else {
				ctx.strokeStyle = '#8a7362'
			}

			// Voeg de takken toe aan de canvas
			ctx.stroke()

			// animatie & framerate
			setTimeout(() => {
				if (taklengte > 2) {
					window.requestAnimationFrame(takken)
				} else {
					window.requestAnimationFrame(boom)
				}
			}, 1000 / animatieSnelheid)
		}

		function berekenTakEinde(x, y, a, length) {
			let takEindeX = x + length * Math.cos((a * Math.PI) / 180)
			let takEindeY = y + length * Math.sin((a * Math.PI) / 180)
			return { x: takEindeX, y: takEindeY }
		}

		boom()
	})
</script>

<canvas width="1440" height="500" />

<style>
	canvas {
		position: absolute;
		z-index: -1;
		bottom: 0vh;
		left: 0;
		width: 100%;
	}
</style>
