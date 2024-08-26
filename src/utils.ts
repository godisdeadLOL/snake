import Victor from "victor"
import Circle from "./Circle"

export function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t
}

export function moveTowards(a: Victor, b: Victor, speed: number) {
	const diff = b.clone().subtract(a)

	if (diff.magnitude() < speed) return b.clone()
	else return a.clone().add(diff.normalize().multiplyScalar(speed))
}

export function generateCap(segment: Circle, from: number, to: number, total: number, uStart: number, tiling: number) {
	const points = segment.getRange(from, to, total)

	const verts = []
	const uvs = []

	for (let i = 0; i < points.length - 1; i++) {
		const a = points[i]
		const b = points[i + 1]

		const u = uStart // (segmentCount - 1) * 0.3

		const angle1 = lerp(0, Math.PI, i / (12.0 - 1.0))
		const angle2 = lerp(0, Math.PI, (i + 1.0) / (12.0 - 1.0))

		const uv1 = new Victor(-Math.sin(angle1) * tiling, Math.cos(angle1))
		const uv2 = new Victor(-Math.sin(angle2) * tiling, Math.cos(angle2))

		verts.push(...[segment.position.x, segment.position.y, a.x, a.y, b.x, b.y])
		uvs.push(...[u, 0.5, u + uv1.x, 0.5 - uv1.y * 0.5, u + uv2.x, 0.5 - uv2.y * 0.5])
	}

	return { verts: verts, uvs: uvs }
}

function lerpDegrees(a: number, b: number, t: number) {
	let result
	let diff = b - a

	if (diff < -180) {
		b += 360
		result = lerp(a, b, t)
		if (result >= 360) {
			result -= 360
		}
	} else if (diff > 180) {
		b -= 360
		result = lerp(a, b, t)
		if (result < 0) {
			result += 360
		}
	} else {
		result = lerp(a, b, t)
	}

	return result
}

function degToRad(degrees: number) {
	return degrees * (Math.PI / 180)
}

export function angularLerp(v1: Victor, v2: Victor, t: number) {
	const angle1 = v1.angleDeg()
	const angle2 = v2.angleDeg()
	const angle = degToRad(lerpDegrees(angle1, angle2, t))

	return new Victor(Math.cos(angle), Math.sin(angle))
}
