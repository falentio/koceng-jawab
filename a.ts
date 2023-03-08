import path from "npm:path"
import { parseHTML } from "npm:linkedom"

const files = []

for await (const f of Deno.readDir("./pas")) {
	const p = path.resolve("./pas", f.name)
	const content = await Deno.readTextFile(p)
	const [[_opExec, [_zero, json]]] = JSON.parse(content)

	const subject = json.split("|")[3]
	const questions = [] as questions[]
	const { document } = parseHTML(json)
	for (const img of document.querySelectorAll("img")) {
		const question = {
			number: parseInt(/\d+/.exec(img.id)[0]),
			image: img.src.slice(2, -2),
		}
		questions.push(question)
	}

	files.push({ subject, questions })
}

await Deno.writeTextFile("./pas.json", JSON.stringify(files, null, "\t"))
for (
	const { subject, questions } of files
) {
	console.log(subject)
	await Deno.mkdir(`./image/${subject}`).catch(() => {})
	for (const { number, image } of questions) {
		const file = `./image/${subject}/${number}.jpeg`
		try {
			await Deno.stat(file)
			continue
		} catch (e) {
		}

		let res: Response
		let i = 0
		console.log("downloading", number, image)
		while (true) {
			i && console.log("retry", i)
			await delay(i++)
			res = await fetch(image, {
			  "headers": {
			    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			    "accept-language": "en-US,en;q=0.9",
			    "sec-fetch-dest": "document",
			    "sec-fetch-mode": "navigate",
			    "sec-fetch-site": "none",
			    "sec-fetch-user": "?1",
			    "sec-gpc": "1",
			    "upgrade-insecure-requests": "1",
			    // "cookie": "HSID=AgZafwgXf6hEN9jvP; SSID=AEYMTProw5KkjGGhj; APISID=d87EKD52FHDGbkhY/AqJ1BcSRsDKpHq17q; SAPISID=bnX0Yelogj-hWk9N/AIC6_2ZzFM7rmUy-O; __Secure-1PAPISID=bnX0Yelogj-hWk9N/AIC6_2ZzFM7rmUy-O; __Secure-3PAPISID=bnX0Yelogj-hWk9N/AIC6_2ZzFM7rmUy-O; SID=UQjZLCuvHDJXZJ6zRMPWniOMChpFDb1TMDzjKqj0ZLKyd8XvwYqTZ1_3Rihr2BjOgYwoeA.; __Secure-1PSID=UQjZLCuvHDJXZJ6zRMPWniOMChpFDb1TMDzjKqj0ZLKyd8XvI-h6V4ljrspIVkFaF8ejDQ.; __Secure-3PSID=UQjZLCuvHDJXZJ6zRMPWniOMChpFDb1TMDzjKqj0ZLKyd8XvMToxa77iDz91B5f0wHPHog.; 1P_JAR=2023-03-08-08; SEARCH_SAMESITE=CgQI4JcB; AEC=ARSKqsJ-tqu5TI_j2OrHCQFg2acErDk_-e9W6Y9a_BijxpOJx1p3lEGrRQ; NID=511=VzX721Gfhf9ZfaS9R50zf9d3Pfz47Docewp77HGPVgfvN6orQdo9OPmGu4gQnxjbjzwRfyKAMCeK_KnMs1AkC9B43gAeyAhF-fdoG3ZwteGZlAWz43vVaQ2aJhN9BA_0mzZQOHCOfgT8P7aES-fGy-8sc_ns1-M_Lb8DnJ5taTHHbxF3_tsO_3COkb2YZK9vYzosOmrk032ab7xYjFmc9lGZWQFZXGwhDCerNzKG8__E0-WLdsngrXTW; SIDCC=AFvIBn_0yVd3zL24MMxyQdx86qhCfXhzmQAU5fGMP_2OQv2sKysSxr8vzuTetIlqgkavhfLB-A; __Secure-1PSIDCC=AFvIBn_0visIbUYU0GfpxCqA1eowoRFzCZ-njjvqA0uymmpopayVQxD1_xp160PuN74oriI3ew; __Secure-3PSIDCC=AFvIBn9rm1TsjbydHWu8tA2_POBjjb8pP_6n_cf1ce5L5jRt5C2QEXG9vpUfPpevldjfPZgSug",
			  },
			  "referrerPolicy": "strict-origin-when-cross-origin",
			  "body": null,
			  "method": "GET",
			  "mode": "cors",
			  "credentials": "include"
			});
			if (res.ok) {
				break
			}
			console.log(res.status)
		}
		console.log({...res.headers})
		console.log("writing")
		const f = await Deno.create(file)
		const buff = await res.arrayBuffer()
		await f.write(buff)
	}
}

function delay(d = 0) {
	return new Promise(res => setTimeout(res, 0 + d * 5_000))
}