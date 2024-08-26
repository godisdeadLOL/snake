import Victor from "victor"
import { lerp } from "./utils"

class Circle {
	position: Victor
	direction: Victor = new Victor(-1, 0)

	_radius: number
	radiusMod: number = 0

	constructor(position: Victor, radius: number) {
		this.position = position
		this._radius = radius
	}

	get radius() {
		return Math.max(0, this._radius + this.radiusMod)
	}

	collide(other: Circle) {
		const dir = this.position.clone().subtract(other.position)
		const dist = dir.length()
		dir.normalize()

		const overlap = Math.max(0.0, this.radius + other.radius - dist)

		return { is_overlap: overlap > 0.0, offset: dir.multiplyScalar(overlap) }
	}

	collideBounds(width: number, height: number) {
		const left = Math.max(0, -(this.position.x - this.radius))
		const top = Math.max(0, -(this.position.y - this.radius))

		const right = Math.max(0, -(width - this.position.x - this.radius))
		const bottom = Math.max(0, -(height - this.position.y - this.radius))

		return { is_overlap: left + top + right + bottom > 0.0, offset: new Victor(left - right, top - bottom) }
	}

	getRelativePoint(pos: Victor) {
		const perp = this.direction.clone().rotateDeg(90)
		return this.position.clone().add(this.direction.clone().multiplyScalar(pos.x)).add(perp.multiplyScalar(pos.y))
	}

	getPoint(angle: number) {
		return this.position.clone().add(this.direction.clone().multiplyScalar(this.radius).rotateDeg(angle))
	}

	getRange(from: number, to: number, total: number) {
		const points = []

		for (let i = 0; i < total; i++) {
			let t = i / (total - 1.0)

			points.push(this.getPoint(lerp(from, to, t)))
		}

		return points
	}
}

export default Circle
