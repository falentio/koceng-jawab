<script>
	import { browser } from "$app/environment"
	export let data
	let current = 1
	$: current = Math.max(1, current)
	$: current = Math.min(data.questions.length, current)
	$: question = data.questions.find(q => q.number === current)
	let answ = []
	let x = null
	let l = false
	if (browser) {
		try {
			const str = localStorage.getItem("answ-" + data.subject) || "[]"
			answ = JSON.parse(str)
			l = true
		} catch {
		}
	}
	$: l && browser && localStorage.setItem("answ-" + data.subject, JSON.stringify(answ))
</script>

<div class="flex flex-row overflow-x-auto space-x-2">
	{#each data.questions as { number }}
		<button 
			class="py-2 px-8 rounded"
			class:bg-green-300={number === current}
			class:bg-blue-300={number !== current}
			on:click={() => current = number}
		> 
			<span> {number} </span>
			<span> {answ[number] || "-"} </span>
		</button>
	{/each}
</div>

<div class="flex flex-col mt-4 space-y-2 p-4">
	<div class="w-full flex-row flex">
		<h1> Jawab </h1>
		<div class="flex-auto"></div>
		<button class="bg-blue-300 rounded p-2" on:click={() => {
			let text = ""
			for (let i = 1; i <= data.questions.length; i++) {
				const a = answ[i]
				text += `${i}.) ${a || ""}`
				text += "\n"
			}
			navigator.clipboard?.writeText(text)
		}}> Copy All </button>
	</div>
	<div class="w-full flex-row flex space-x-2">
		{#each ["A", "B", "C", "D", "E", "-"] as a}
			<button 
				class="p-2 w-full rounded"
				class:bg-green-300={a === answ[current]}
				class:bg-blue-300={a !== answ[current]}
				on:click={() => {
					answ[current] = a
					answ = answ
				}}
			> 
				<span> {a} </span>
			</button>
		{/each}
	</div>
	{#key current}
		<img src={question.image} />
	{/key}
</div>


