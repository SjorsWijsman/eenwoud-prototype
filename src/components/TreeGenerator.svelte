<script>
	import { onMount } from 'svelte'
	import { progress } from '$lib/store'

	let branchLength,
		branchSplitDegrees,
		branchWidthRatio,
		branchWidth,
		startingPoints = [],
		canvas,
		ctx,
		canvasWidth,
		canvasHeight,
		progressOffset = 0,
		animationCycle = 0

	const maxAnimationCycles = 10

	progress.subscribe((value) => {
		if (value - progressOffset > 1 / maxAnimationCycles) {
			branches()
			progressOffset += 1 / maxAnimationCycles
			animationCycle += 1
		} else if (value - progressOffset < 0) {
			treeCanvas()
			animationCycle = 0
			progressOffset = 0
		}
	})

	onMount(() => {
		ctx = canvas.getContext('2d')
		canvasWidth = canvas.width
		canvasHeight = canvas.height

		treeCanvas()
	})

	function treeCanvas() {
		// Leeg de canvas
		ctx.clearRect(0, 0, canvasWidth, canvasHeight)

		trunk()
	}

	function trunk() {
		// De lengte van de tak is een willekeurig getal tussen de 100 en 150px
		branchLength = randrange(100, 150)

		// De dikte van de stam
		branchWidth = randrange(15, 20)

		// De aflopende dikte van de takken
		branchWidthRatio = (5 + Math.random()) / 8

		// Overige data over de boomstam
		let stam = {
			x: canvasWidth / 2,
			y: branchLength + 100,
			angle: randrange(10, 70),
		}

		// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

		// Teken de boomstam op de canvas
		ctx.beginPath()

		// Positie van de stam
		ctx.moveTo(stam.x, canvasHeight - 10)
		ctx.lineTo(stam.x, canvasHeight - stam.y)

		// zet de kleur van de stam
		ctx.strokeStyle = '#8a7362'

		// zet de dikte van de stam
		ctx.lineWidth = branchWidth

		// teken de stam
		ctx.stroke()

		// update de startpunten
		startingPoints = []
		startingPoints.push(stam)
	}

	function branches() {
		// De takLengte en takDikte dunner / kleiner maken
		branchLength = branchLength * branchWidthRatio
		branchWidth = branchWidth * branchWidthRatio

		ctx.lineWidth = branchWidth

		// Teken de takken op de canvas
		ctx.beginPath()
		const newStartingPoints = []

		// Create random amount of new branches from old starting points
		for (let i = 0; i < startingPoints.length; i++) {
			branchSplitDegrees = randrange(10, 70)
			let startingPoint = startingPoints[i]

			let branchEndLeft = calculateBranchEnd(
				startingPoint.x,
				startingPoint.y,
				startingPoint.angle + branchSplitDegrees - 35,
				branchLength,
			)
			let branchEndRight = calculateBranchEnd(
				startingPoint.x,
				startingPoint.y,
				startingPoint.angle + branchSplitDegrees,
				branchLength,
			)
			let branchEndMiddle = calculateBranchEnd(
				startingPoint.x,
				startingPoint.y,
				startingPoint.angle + branchSplitDegrees + 35,
				branchLength,
			)

			// takken aan de linkerkant
			ctx.moveTo(startingPoint.x, canvasHeight - startingPoint.y)
			ctx.lineTo(branchEndRight.x, canvasHeight - branchEndRight.y)

			// takken in het midden
			ctx.moveTo(startingPoint.x, canvasHeight - startingPoint.y)
			ctx.lineTo(branchEndMiddle.x, canvasHeight - branchEndMiddle.y)

			// takken aan de rechterkant
			ctx.moveTo(startingPoint.x, canvasHeight - startingPoint.y)
			ctx.lineTo(branchEndLeft.x, canvasHeight - branchEndLeft.y)

			// de draaihoek van de takken berekenen
			branchEndLeft.angle = startingPoint.angle + branchSplitDegrees
			branchEndMiddle.angle = startingPoint.angle + branchSplitDegrees + 35
			branchEndRight.angle = startingPoint.angle - branchSplitDegrees

			// update de nieuwe start punten
			newStartingPoints.push(branchEndLeft)
			newStartingPoints.push(branchEndRight)
			newStartingPoints.push(branchEndMiddle)
		}

		// Zorg dat het einde van de tak, het nieuwe startpunt wordt van de nieuwe tak
		startingPoints = newStartingPoints

		if (animationCycle > maxAnimationCycles * 0.5) {
			ctx.strokeStyle = 'green'
		} else {
			ctx.strokeStyle = '#8a7362'
		}

		// Voeg de takken toe aan de canvas
		ctx.stroke()
	}

	function calculateBranchEnd(x, y, a, length) {
		let branchEndX = x + length * Math.cos((a * Math.PI) / 180)
		let branchEndY = y + length * Math.sin((a * Math.PI) / 180)
		return { x: branchEndX, y: branchEndY }
	}

	function randrange(min, max) {
		return Math.random() * (max - min + 1) + min
	}
</script>

<canvas width="1000" height="1000" bind:this={canvas} />

<style>
	canvas {
		position: relative;
		max-width: 100rem;
		max-height: 100rem;
		object-fit: contain;
		bottom: -30%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
