let stdin = ""
const t = new TextDecoder()
for await (const c of Deno.stdin.readable) {
	stdin += t.decode(c)
}

console.log(JSON.parse(stdin))