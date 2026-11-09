<script lang="ts">
	/** "Atty. Hoot", a bar-exam owl. Pure SVG, themed with the app's colour tokens. */
	let { size = 64, label = '' }: { size?: number; label?: string } = $props();
</script>

<svg
	class="owl"
	width={size}
	height={size}
	viewBox="0 0 64 64"
	role={label ? 'img' : undefined}
	aria-label={label || undefined}
	aria-hidden={label ? undefined : true}
>
	<!-- feet -->
	<path d="M24 56h6M34 56h6" stroke="#EA580C" stroke-width="3" stroke-linecap="round" />
	<!-- body -->
	<ellipse cx="32" cy="38" rx="19" ry="19" style="fill:var(--text)" />
	<ellipse cx="32" cy="44" rx="11" ry="11" style="fill:var(--surface-3)" />
	<!-- wings -->
	<path d="M13 34c-4 6-3 14 3 18 1-7 1-13-3-18zM51 34c4 6 3 14-3 18-1-7-1-13 3-18z" style="fill:var(--text-2)" />
	<!-- mortarboard cap -->
	<path d="M32 6 10 15l22 8 22-8z" fill="#252525" stroke="#EA580C" stroke-width="1.5" stroke-linejoin="round" />
	<path d="M20 20v6c0 3 5 5 12 5s12-2 12-5v-6l-12 4z" fill="#252525" />
	<path d="M54 15v10" stroke="#EA580C" stroke-width="2" stroke-linecap="round" />
	<circle cx="54" cy="27" r="2.2" fill="#EA580C" />
	<!-- eyes -->
	<circle cx="25" cy="34" r="7" style="fill:var(--surface)" />
	<circle cx="39" cy="34" r="7" style="fill:var(--surface)" />
	<g class="pupils">
		<circle cx="26" cy="35" r="3.2" fill="#252525" />
		<circle cx="38" cy="35" r="3.2" fill="#252525" />
		<circle cx="27" cy="33.8" r="1" fill="#fff" />
		<circle cx="39" cy="33.8" r="1" fill="#fff" />
	</g>
	<g class="lids">
		<circle cx="25" cy="34" r="7" style="fill:var(--text)" />
		<circle cx="39" cy="34" r="7" style="fill:var(--text)" />
	</g>
	<!-- beak -->
	<path d="M29.5 40h5L32 45z" fill="#EA580C" />
</svg>

<style>
	.owl {
		display: block;
		flex: none;
		overflow: visible;
	}
	.lids {
		transform-box: fill-box;
		transform-origin: center;
		transform: scaleY(0);
		animation: blink 5s infinite;
	}
	@keyframes blink {
		0%,
		92%,
		100% {
			transform: scaleY(0);
		}
		95% {
			transform: scaleY(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.lids {
			animation: none;
		}
	}
</style>
