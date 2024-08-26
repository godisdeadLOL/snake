import Victor from "victor"
import Circle from "./Circle"
import { angularLerp, lerp, moveTowards } from "./utils"
import { Graphics } from "pixi.js"
import { easeInBack } from "js-easing-functions"
import { Particles } from "./Particles"
import Joystick from "./Joystick"
import Impulse from "./Impulse"
import Game from "./Game"

class Snake {
	segments: Circle[]
	step: number

	route: Victor[]
	// target: Victor

	is_alive: boolean = true

	head: Circle
	tail: Circle

	radiusMin: number
	radiusMax: number

	foods: number[] = []

	// timer: number = 0

	speed: number = 200.0

	_prevHeadPosition: Victor
	_preDeathTotal: number = 0
	_hideEyes: boolean = false

	lostTimer: number = 0
	dyingTimer: number = 0

	impulse: Impulse = new Impulse()

	constructor(total: number, start: Victor, step: number, radiusMin: number, radiusMax: number) {
		this.step = step

		this.segments = []
		this.route = []

		this.radiusMin = radiusMin
		this.radiusMax = radiusMax

		for (let i = 0; i < total; i++) {
			const segment = new Circle(start.clone().addScalarX(i * step), 0)
			this.segments.push(segment)
			this.route.push(segment.position.clone())
		}

		this.head = this.segments[0]
		this.tail = this.segments[this.segments.length - 1]

		this.calculateRadiuses()

		this._prevHeadPosition = this.head.position.clone()

		// this.target = this.head.position
	}
	updateAlive(delta: number) {
		// head towards mouse
		let target = this.head.position.clone()
		// const dir = Joystick.instance.direction.clone() // mouse.clone().subtract(this.head.position)

		this.head.direction.copy(angularLerp(this.head.direction, Joystick.instance.direction, delta * 10.0))

		const dir = this.head.direction.clone()

		this.head.position.add(dir.clone().multiplyScalar(delta * this.speed))
		this.head.direction.copy(dir)

		// if (dir.length() > 5) {
		// 	// snake like movement
		// 	// const perp = dir.clone()
		// 	// perp.rotateDeg(90)
		// 	// perp.multiplyScalar(Math.sin(this.timer * 0.1) * 0.6)

		// 	dir.normalize()
		// 	target.add(dir.clone().multiplyScalar(this.step * 0.0))
		// 	this.head.position.add(dir.clone().multiplyScalar(delta * this.speed))

		// 	this.head.direction.copy(dir)
		// }

		// routing
		if (target.distance(this.route[0]) > this.step) {
			this.route.unshift(this.route.pop()?.copy(target)!)

			// food consume step
			for (let i = this.foods.length - 1; i >= 0; i--) {
				this.foods[i] += 1
			}

			if (this.foods[0] > this.segments.length) {
				this.grow(6)
				this.foods.shift()
			}
		}

		// lerp circles towards route

		for (let i = 1; i < this.segments.length; i++) {
			// this.segments[i].position.mix(this.route[i], delta * 0.1)

			// this.segments[i].position.
			this.segments[i].position.copy(moveTowards(this.segments[i].position, this.route[i], delta * this.speed))
		}

		// directions
		for (let i = 1; i < this.segments.length; i++) {
			const from = this.segments[i]
			const to = this.segments[i - 1]

			this.segments[i].direction.copy(to.position).subtract(from.position).normalize()
		}

		// food display
		for (let i = 0; i < this.segments.length; i++) {
			let filled = 0

			for (let food of this.foods) {
				const k = 2
				const d = (k - Math.min(k, Math.abs(food - i))) / k

				filled += d
			}

			this.segments[i].radiusMod = lerp(this.segments[i].radiusMod, filled * 16.0, delta * 10.0)
		}

		// impulse
		this.impulse.update(delta)
		this.head.position.add(this.impulse.getOffset(delta))

		// collide
		for (let i = 3; i < this.segments.length; i++) {
			const other = this.segments[i]

			const { is_overlap, offset } = this.head.collide(other)

			if (is_overlap) {
				// offset.multiplyScalar(delta)
				this.head.position.add(offset)
				// this.head.radiusMod = -10
				// this.target.add(offset)
			}
		}

		const { is_overlap, offset } = this.head.collideBounds(512, 512)

		if (is_overlap) {
			// this.impulse.push(offset.clone().normalize(), 300)

			// offset.multiplyScalar(delta * this.speed * 0.5)
			this.head.position.add(offset)

			// this.head.radiusMod = Math.max(0, this.head.radiusMod - 1)

			// this.head.direction.add( offset.normalize() ).normalize()
		}

		this._preDeathTotal = this.segments.length
	}

	updateDying(delta: number) {
		this.dyingTimer += delta

		let toDelete = false
		for (let i = 0; i < this.segments.length; i++) {
			const off = this._preDeathTotal - (this.segments.length - i)
			const t = Math.max(0, this.dyingTimer - off * 0.05) / 0.2

			if (t > 1.0) toDelete = true

			this.segments[i].radiusMod = this.segments[i]._radius * -easeInBack(t, 0, 1.0, 1.0)
		}

		if (toDelete) {
			Game.instance.particles.generateSplash(this.head.position, 3, 400, 0x44cf7e)

			this._hideEyes = true
			this.segments.shift()
			this.head = this.segments[0]
		}
	}

	checkDied(delta: number) {
		const realSpeed = this._prevHeadPosition.subtract(this.head.position).magnitude()
		this._prevHeadPosition.copy(this.head.position)

		if (realSpeed < delta * this.speed * 0.6) this.lostTimer += delta
		else this.lostTimer = Math.max(0, this.lostTimer - delta * 0.5)

		return this.lostTimer > 0.15
	}

	feed() {
		this.foods.push(0)
	}
	grow(count: number = 1) {
		for (let i = 0; i < count; i++) {
			const segment = new Circle(this.tail.position.clone(), 0)

			this.segments.push(segment)
			this.route.push(segment.position.clone())

			segment.position.add(this.tail.direction.clone().multiplyScalar(-this.step * 0.1))
			segment.direction.copy(this.tail.direction)

			segment.radiusMod = -2 - i * 2

			this.tail = this.segments[this.segments.length - 1]
		}

		this.calculateRadiuses()
	}

	calculateRadiuses() {
		for (let i = 0; i < this.segments.length; i++) {
			const t = i / (this.segments.length - 1.0)

			this.segments[i]._radius = lerp(this.radiusMax, this.radiusMin, t)
		}

		this.head._radius *= 1.25
	}

	drawDebug(gr: Graphics) {
		// segments
		for (const segment of this.segments) {
			gr.circle(segment.position.x, segment.position.y, segment.radius)
		}
		gr.stroke({ color: 0xffffff, width: 2 })

		// directions
		// for (const segment of this.segments) {
		// 	gr.circle(segment.position.x, segment.position.y, 2)
		// 	gr.circle(segment.position.x + segment.direction.x * 6, segment.position.y + segment.direction.y * 6, 2)
		// }

		// gr.stroke({ color: 0x00ff00, width: 1 })

		// sides
		for (const segment of this.segments) {
			const left = segment.getPoint(-90)
			const right = segment.getPoint(90)

			gr.circle(left.x, left.y, 2)
			gr.circle(right.x, right.y, 2)

			// gr.circle(segment.position.x, segment.position.y, 2)
			// gr.circle(segment.position.x + segment.direction.x * 6, segment.position.y + segment.direction.y * 6, 2)
		}

		gr.stroke({ color: 0x0000ff, width: 1 })

		// route
		for (const point of this.route) {
			gr.circle(point.x, point.y, 2)
		}
		gr.stroke({ color: 0xff0000, width: 1 })
	}
}

export default Snake
