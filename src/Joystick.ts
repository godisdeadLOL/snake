import Victor from "victor"

class Joystick {
	static instance: Joystick

	body: HTMLElement
	handle: HTMLElement
	canvasWrapper: HTMLElement

	startX = 0
	startY = 0

	direction: Victor = new Victor(-1, 0)

	constructor(canvas: HTMLElement) {
		Joystick.instance = this

		this.body = document.getElementById("joystick_body")!
		this.handle = document.getElementById("joystick_handle")!
		this.canvasWrapper = document.getElementById("canvas_wrapper")!

		document.onpointerdown = (e) => {
			if (e.y < canvas.getBoundingClientRect().y) return

			// this.canvasWrapper.style.touchAction = "none"

			this.body.style.left = `${e.x}px`
			this.body.style.top = `${e.y}px`
			this.body.style.display = "block"

			this.handle.style.left = `0px`
			this.handle.style.top = `0px`

			this.startX = e.x
			this.startY = e.y

			this.enable()
		}

		document.onpointerup = (e) => {
			// this.canvasWrapper.style.touchAction = "auto"

			this.body.style.display = "none"
			this.disable()
		}

		document.onpointercancel = document.onpointerup
	}

	enable() {
		document.onpointermove = (e) => {
			const dir = new Victor(e.x, e.y).subtract(new Victor(this.startX, this.startY))
			const dist = dir.magnitude()

			if (dist > 64) dir.normalize().multiplyScalar(64)

			this.handle.style.left = `${dir.x}px`
			this.handle.style.top = `${dir.y}px`

			if (dist > 0) {
				this.direction.copy(dir.normalize())
			}
		}
	}

	disable() {
		document.onpointermove = null
	}
}

export default Joystick
