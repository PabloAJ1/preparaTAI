import { onMounted, onUnmounted, Ref } from "vue";

export function useInfiniteScroll(
	callback: () => void,
	sentinelRef: Ref<HTMLElement | null>
) {
	let observer: IntersectionObserver | null = null;

	onMounted(() => {
		if (!sentinelRef.value) return;

		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				callback();
			}
		});

		observer.observe(sentinelRef.value);
	});

	onUnmounted(() => {
		observer?.disconnect();
	});
}