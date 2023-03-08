<script lang="javascript">
	export let data
</script>

<div class="flex flex-col space-y-2 mx-auto mt-4">
	{#each data.pas.map(s => s.subject).sort() as subject }
		<a href="/{subject}" class="bg-blue-200 p-2 rounded"> {subject} </a>
	{/each}
</div>