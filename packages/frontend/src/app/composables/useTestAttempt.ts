export function useTestAttempt(cuestionarioId: string) {
	const attemptKey = `testAttempt-${cuestionarioId}`;

	function getAttempt() {
		let attempt = sessionStorage.getItem(attemptKey);

		if (!attempt) {
			let seed = 0;
			try {
			seed = crypto.getRandomValues(new Uint32Array(1))[0];
			} catch {
			seed = Math.floor(Math.random() * 1000000);
			}

			let attemptId = '';
			try {
			attemptId = crypto.randomUUID();
			} catch {
			attemptId = 'attempt-' + Date.now();
			}

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
