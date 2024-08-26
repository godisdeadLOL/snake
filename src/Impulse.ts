import Victor from "victor"

class Impulse {
	private direction: Victor = new Victor(0, 0)
	private force: number = 0
	private timer: number = 0

	private duration: number = 0

	private cooldown: number = 0

	push(direction: Victor, force: number) {
		if (this.cooldown > 0) return

		this.direction.copy(direction)
		this.force = force
		this.timer = 0

		this.duration = 0.3
		this.cooldown = 0.2
	}

	update(delta: number) {
		this.timer += delta
		this.cooldown -= delta
	}

	getOffset(delta: number) {
		const t = Math.max(0.0, 1.0 - this.timer / this.duration)

		return this.direction.clone().multiplyScalar(this.force * t * t * delta)
	}
}

export default Impulse
