import { Graphics } from "pixi.js"
import Victor from "victor"
import { lerp } from "./utils"

class Particle {
	// position: Victor
	// velocity: Victor
	// dump: number
	// lifetime: number
	// startRadius: number
	// endRadius: number

	private timer: number = 0
	private radius: number = 0

	constructor(
		public position: Victor,
		public velocity: Victor,
		public dump: number,
		public lifetime: number,
		public startRadius: number,
		public endRadius: number,
		public color: number
	) {}

	update(delta: number) {
		this.timer += delta

		this.position.add(this.velocity.clone().multiplyScalar(delta))
		this.velocity.multiplyScalar(1 - this.dump * delta)

		const t = this.timer / this.lifetime
		this.radius = lerp(this.startRadius, this.endRadius, t)

		return this.timer > this.lifetime
	}

	draw(gr: Graphics) {
		gr.circle(this.position.x, this.position.y, this.radius)
		gr.fill({ color: this.color })
	}
}

export class Particles {
	particles: Particle[] = []

	update(delta: number) {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			if (this.particles[i].update(delta)) this.particles.splice(i, 1)
		}
	}

	draw(gr: Graphics) {
		for (const particle of this.particles) {
			particle.draw(gr)
		}
	}

	generateSplash(position: Victor, total: number, power: number, color: number) {
		let angle = 0

		for (let i = 0; i < total; i++) {
			angle = (Math.PI * 2 * i) / total + (Math.random() * 2.0 - 1.0) * 0.4
			const vel = power * 0.5 + power * Math.random()
			const dir = new Victor(Math.cos(angle), Math.sin(angle))

			const radius = 8.0 + 4.0 * (Math.random() * 2.0 - 1.0)

			const particle = new Particle(position.clone(), dir.multiplyScalar(vel), 4.0, 0.4, radius, 0.0, color)

			this.particles.push(particle)
		}
	}
}
