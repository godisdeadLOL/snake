import { Application, Graphics } from "pixi.js"
import Food from "./Food"
import { Particles } from "./Particles"
import Snake from "./Snake"
import Joystick from "./Joystick"
import Resources from "./Resources"
import SnakeRenderer from "./SnakeRenderer"
import Victor from "victor"

class Game {
	static instance: Game

	application: Application
	resources: Resources

	snake: Snake | null = null
	snakeRenderer: SnakeRenderer | null = null

	food: Food
	particles: Particles
	joystick: Joystick

	graphics: Graphics

	state = "start"

	score: number = 0
	highscore: number = 0

	// ui
	scoreLabel: HTMLElement
	highscoreLabel: HTMLElement
	playButton: HTMLElement

	constructor(application: Application, resources: Resources) {
		Game.instance = this

		this.resources = resources
		this.application = application

		this.food = new Food()
		this.application.stage.addChild(this.food.sprite)

		this.particles = new Particles()
		this.joystick = new Joystick(application.canvas)

		this.scoreLabel = document.getElementById("score_value")!
		this.highscoreLabel = document.getElementById("highscore_value")!
		this.playButton = document.getElementById("play_button")!

		this.snakeRenderer = new SnakeRenderer()
		this.application.stage.addChild(this.snakeRenderer.mesh)

		this.graphics = new Graphics()
		this.application.stage.addChild(this.graphics)

		// load highscore
		const highscore = localStorage.getItem("highscore")
		if (!highscore) this.highscore = 0
		else this.highscore = Number.parseInt(highscore)

		this.highscoreLabel.innerText = this.highscore.toString()

		// ui
		this.playButton.onclick = () => this.restart()
	}

	loop(delta: number) {
		this.particles.update(delta)
		this.food.update(delta)

		if (this.state == "playing") this.playingState(delta)
		else if (this.state == "over") this.overState(delta)

		this.graphics.clear()

		if (this.snake?.head && this.snakeRenderer?.snake) {
			this.snakeRenderer!.updatePoints()
			this.snakeRenderer!.generateMesh()

			this.snakeRenderer!.drawOutline(this.graphics)
			if (!this.snake._hideEyes) this.snakeRenderer!.drawEyes(this.graphics)
		}

		this.particles.draw(this.graphics)
	}

	restart() {
		this.snake = new Snake(6, new Victor(256, 256), 12, 8, 20)
		this.snakeRenderer!.snake = this.snake

		this.joystick.direction = new Victor(-1, 0)

		this.playButton.innerText = "Restart"
		this.state = "playing"

		this.food.place(512, 512)

		this.updateScore(0)
	}

	playingState(delta: number) {
		this.snake?.updateAlive(delta)

		if (this.food.collide(this.snake!)) {
			this.snake?.feed()
			this.particles.generateSplash(new Victor(this.food.sprite.x, this.food.sprite.y), 5, 300, 0xff0000)
			this.food.place(512, 512)

			this.particles.generateSplash(new Victor(this.food.sprite.x, this.food.sprite.y), 3, 350, 0xff0000)

			this.updateScore(this.score + 1)
		}

		if (this.snake?.checkDied(delta)) this.state = "over"
	}
	overState(delta: number) {
		if (this.snake) this.snake?.updateDying(delta)
	}

	updateScore(score: number) {
		this.score = score
		this.scoreLabel.innerText = this.score.toString()

		// update highscore
		if (this.score > this.highscore) {
			this.highscore = this.score
			localStorage.setItem("highscore", this.highscore.toString())
			this.highscoreLabel.innerText = this.highscore.toString()
		}
	}
}

export default Game
