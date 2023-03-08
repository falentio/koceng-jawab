import pas from "$lib/pas.json" assert { type: "json" }

export function load({ params }) {
	return pas.find(p => p.subject === params.subject)
}