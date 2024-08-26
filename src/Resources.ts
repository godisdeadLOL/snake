import { Assets, GL_WRAP_MODES, Texture, WRAP_MODES } from "pixi.js"

class Resources {
	snake: Texture | null = null
	apple: Texture | null = null
	background: Texture | null = null

	async load() {
		this.snake = await Assets.load("body.png")
		this.snake!.source.wrapMode = "repeat"

		this.apple = await Assets.load("apple.png")

		this.background = await Assets.load("bg.png")
	}
}

export default Resources
