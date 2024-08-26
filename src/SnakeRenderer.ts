import { Assets, Geometry, GL_WRAP_MODES, Graphics, Mesh, Shader, Texture } from "pixi.js"
import Snake from "./Snake"
import Victor from "victor"
import Circle from "./Circle"
import { generateCap, lerp } from "./utils"
import Resources from "./Resources"
import Game from "./Game"

class SnakeRenderer {
	snake: Snake | null = null

	geometry: Geometry
	mesh: Mesh<Geometry, Shader>

	leftPoints: Victor[] = []
	rightPoints: Victor[] = []

	tiling: number = 0.3

	constructor() {
		this.geometry = new Geometry({
			attributes: {
				aPosition: [],
				aUV: [],
			},
		})

		this.mesh = new Mesh({ geometry: this.geometry, texture: Game.instance.resources.snake! })
	}

	updatePoints() {
		this.leftPoints = []
		this.rightPoints = []

		for (const segment of this.snake!.segments) {
			this.leftPoints.push(segment.getPoint(-90))
			this.rightPoints.push(segment.getPoint(90))
		}
	}

	generateMesh() {
		this.updatePoints()

		const verts = []
		const uvs = []

		const totalPoints = this.leftPoints.length

		// body
		for (let i = 0; i < totalPoints - 1; i++) {
			const p1 = this.leftPoints[i]
			const p2 = this.rightPoints[i]

			const p3 = this.leftPoints[i + 1]
			const p4 = this.rightPoints[i + 1]

			const u1 = i * this.tiling
			const u2 = (i + 1) * this.tiling

			verts.push(...[p1.x, p1.y, p4.x, p4.y, p2.x, p2.y, p1.x, p1.y, p3.x, p3.y, p4.x, p4.y])
			uvs.push(...[u1, 0.0, u2, 1.0, u1, 1.0, u1, 0.0, u2, 0.0, u2, 1.0])
		}

		// caps

		// head
		const { verts: headVerts, uvs: headUvs } = generateCap(this.snake!.head, 90, -90, 12, 0, this.tiling)

		verts.push(...headVerts)
		uvs.push(...headUvs)

		// tail
		const { verts: tailVerts, uvs: tailUvs } = generateCap(this.snake!.tail, -90, -270, 12, (totalPoints - 1) * this.tiling, -this.tiling)

		verts.push(...tailVerts)
		uvs.push(...tailUvs)

		this.geometry.getBuffer("aPosition").data = new Float32Array(verts)
		this.geometry.getBuffer("aUV").data = new Float32Array(uvs)
	}

	drawOutline(gr: Graphics) {
		gr.moveTo(this.rightPoints[0].x, this.rightPoints[0].y)

		for (let i = 0; i < this.rightPoints.length; i++) {
			const point = this.rightPoints[i]
			gr.lineTo(point.x, point.y)
		}

		for (const point of this.snake!.tail.getRange(90, 270, 12)) {
			gr.lineTo(point.x, point.y)
		}

		for (let i = this.leftPoints.length - 1; i >= 0; i--) {
			const point = this.leftPoints[i]
			gr.lineTo(point.x, point.y)
		}

		for (const point of this.snake!.head.getRange(-90, 90, 12)) {
			gr.lineTo(point.x, point.y)
		}

		gr.stroke({ color: 0x000000, width: 2 })
	}

	drawEyes(gr: Graphics) {
		const eye1 = this.snake!.head.getRelativePoint(new Victor(2, -(this.snake!.head.radius - 4)))
		const eye2 = this.snake!.head.getRelativePoint(new Victor(2, this.snake!.head.radius - 4))

		gr.circle(eye1.x, eye1.y, 10)
		gr.circle(eye2.x, eye2.y, 10)

		gr.fill({ color: 0xffffff })

		gr.circle(eye1.x, eye1.y, 4)
		gr.circle(eye2.x, eye2.y, 4)

		gr.fill({ color: 0x000000 })
	}
}

export default SnakeRenderer
