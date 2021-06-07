<script>
	import { onMount } from 'svelte'

	const tree = (audioData) => {
		const canvas = createCanvas(500, 500)
		const ctx = canvas[0]
		const canvasWidth = canvas[1]
		const canvasHeight = canvas[2]

		function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
			// console.log(
			// 	`startX: ${startX}, startY: ${startY}, len: ${len}, angle: ${angle}, branchWidth: ${branchWidth}, trunk: ${color1}, leaves: ${color2}`,
			// )
			ctx.beginPath()
			ctx.save()
			ctx.strokeStyle = color1
			ctx.fillStyle = color2
			// ctx.shadowBlur = 15
			// ctx.shadowColor = 'black'
			ctx.lineWidth = branchWidth
			ctx.translate(startX, startY)
			ctx.rotate((angle * Math.PI) / 180)
			ctx.moveTo(0, 0)
			//ctx.lineTo(0, -len);
			if (angle > 0) {
				ctx.bezierCurveTo(10, -len / 2, 20, -len / 2, 0, -len)
			} else {
				ctx.bezierCurveTo(10, -len / 2, -20, -len / 2, 0, -len)
			}

			ctx.stroke()

			if (len < 5) {
				ctx.beginPath()
				ctx.arc(0, -len, 10, 0, Math.PI / 2)
				ctx.fill()
				ctx.restore()
				return
			}
			const curve = Math.random() * 10 + 10

			drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6, color1, color2)
			drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6, color1, color2)

			ctx.restore()
		}

		function createCanvas(width, height) {
			const section = document.querySelector('#visualizer')
			const canvas = document.createElement('canvas')
			canvas.setAttribute('width', width)
			canvas.setAttribute('height', height)
			const canvasContext = canvas.getContext('2d')
			section.insertAdjacentElement('beforeend', canvas)
			return [canvasContext, canvas.width, canvas.height]
		}

		drawTree(canvasWidth / 2, canvasHeight - 0, 120, 0, 25, '#8a7362', '#668d64')
	}

	onMount(() => {
		tree()
	})
</script>

<div id="visualizer" />

<style>
	#visualizer {
		display: flex;
		justify-content: center;
	}
</style>
