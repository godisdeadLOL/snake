import { Application, Assets, DEPRECATED_SCALE_MODES, Graphics, Sprite, Texture, TilingSprite } from "pixi.js"
import Victor from "victor"
import Snake from "./Snake"
import SnakeRenderer from "./SnakeRenderer"
import { Particles } from "./Particles"
import Joystick from "./Joystick"
import Food from "./Food"
import Resources from "./Resources"
import Game from "./Game"

const app = new Application()
const resources = new Resources()

app
	.init({ width: 512, height: 512, resolution: 2, antialias: true })
	.then(() => {
		return resources.load()
	})
	.then(() => {
		document.getElementById("content")!.appendChild(app.canvas)

		const tilingSprite = new TilingSprite({
			texture: resources.background!,
			width: app.screen.width,
			height: app.screen.height,
			tileScale: { x: 0.4, y: 0.4 },
		})

		app.stage.addChild(tilingSprite)

		const game = new Game(app, resources)

		app.ticker.add(() => {
			const delta = app.ticker.elapsedMS / 1000.0
			game.loop(delta)
		})
	})
