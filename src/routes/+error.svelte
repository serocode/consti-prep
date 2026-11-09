<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>Not found · ALAC Consti Practice</title></svelte:head>

<main class="page">
	<div class="col">
		<div class="card" style="padding:32px;text-align:center;display:flex;flex-direction:column;gap:8px;align-items:center">
			<h1 style="font-size:20px">{page.status === 404 ? 'That problem doesn’t exist.' : 'Something went wrong.'}</h1>
			<p class="muted">{page.error?.message}</p>
			<a class="btn btn-primary" href="/">All problems</a>
		</div>
	</div>
</main>
