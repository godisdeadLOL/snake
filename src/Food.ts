import { Graphics, Sprite } from "pixi.js"
import Circle from "./Circle"
import Snake from "./Snake"
import Victor from "victor"
import Game from "./Game"
import { lerp } from "./utils"

class Food {
	private current: Circle = new Circle(new Victor(256, 256), 8)
	private scale: number = 0.4

	sprite: Sprite = new Sprite()

	constructor() {
		this.sprite = new Sprite({ position: { x: 256, y: 256 }, texture: Game.instance.resources.apple!, scale: 0.4, pivot: 64 })
	}

	update(delta: number) {
		this.scale = lerp(this.scale, 0.4, delta * 10.0)
		this.sprite.scale = this.scale
	}

	collide(snake: Snake) {
		const { is_overlap } = snake.head.collide(this.current)
		return is_overlap
	}

	place(width: number, height: number) {
		this.current.position.x = Math.random() * width
		this.current.position.y = Math.random() * height

		this.sprite.position.x = this.current.position.x
		this.sprite.position.y = this.current.position.y

		this.scale = 0
	}

	drawDebug(gr: Graphics) {
		gr.circle(this.current.position.x, this.current.position.y, this.current.radius)
		gr.stroke({ color: 0xffffff, width: 2 })
	}
}

export default Food
