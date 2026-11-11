<script lang="ts">
	import { page } from '$app/state';

	// Send people back to the list for the subject they were in.
	const back = $derived(
		page.url.pathname.startsWith('/crimpro')
			? { missing: 'That twist set doesn’t exist.', href: '/crimpro', label: 'All twist sets' }
			: page.url.pathname.startsWith('/statcon')
				? { missing: 'That problem doesn’t exist.', href: '/statcon/problems', label: 'All StatCon problems' }
				: page.url.pathname.startsWith('/crimlaw')
					? { missing: 'That problem doesn’t exist.', href: '/crimlaw/problems', label: 'All Crim Law problems' }
					: { missing: 'That problem doesn’t exist.', href: '/', label: 'All problems' }
	);
</script>

<svelte:head><title>Not found · 1Law-C</title></svelte:head>

<main class="page">
	<div class="col">
		<div class="card" style="padding:32px;text-align:center;display:flex;flex-direction:column;gap:8px;align-items:center">
			<h1 style="font-size:20px">{page.status === 404 ? back.missing : 'Something went wrong.'}</h1>
			<p class="muted">{page.error?.message}</p>
			<a class="btn btn-primary" href={back.href}>{back.label}</a>
		</div>
	</div>
</main>
