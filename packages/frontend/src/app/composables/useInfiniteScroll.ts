import { onMounted, onUnmounted } from 'vue';

export function useInfiniteScroll(callback: () => void) {
	let observer: IntersectionObserver | null = null;

	onMounted(() => {
		const sentinel = document.querySelector('#sentinel');

		if (!sentinel) return;

		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					callback();
				}
			},
			{
				root: null,
				rootMargin: '800px',
				threshold: 0,
			}
		);

		observer.observe(sentinel);
	});

	onUnmounted(() => {
		observer?.disconnect();
	});
}
