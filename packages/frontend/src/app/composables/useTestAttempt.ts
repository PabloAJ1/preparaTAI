export function useTestAttempt(cuestionarioId: string) {
	const attemptKey = `testAttempt-${cuestionarioId}`;

	function getAttempt() {
		let attempt = sessionStorage.getItem(attemptKey);

		if (!attempt) {
			const attemptId = crypto.randomUUID();
			const seed = crypto.getRandomValues(new Uint32Array(1))[0];

			attempt = JSON.stringify({
				attemptId,
				seed,
			});

			sessionStorage.setItem(attemptKey, attempt);
		}

		return JSON.parse(attempt);
	}

	function clearAttempt() {
		sessionStorage.removeItem(attemptKey);
	}

	return {
		getAttempt,
		clearAttempt,
	};
}
