export const useChatInputRecording = (
	isRecording: Ref<boolean>,
	isPaused: Ref<boolean>,
	formattedDuration: Ref<string>,
	analyser: Ref<AnalyserNode | null>,
	dataArray: Ref<Uint8Array | null>,
) => {
	// Recording state
	let mediaRecorder: MediaRecorder | null = null;
	let audioStream: MediaStream | null = null;
	let animationFrame: number | null = null;
	let startTime = 0;

	const startRecording = async () => {
		try {
			audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(audioStream);

			// Set up audio analysis for visualization
			const audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(audioStream);
			analyser.value = audioContext.createAnalyser();
			analyser.value.fftSize = 256;
			source.connect(analyser.value);
			dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);

			isRecording.value = true;
			isPaused.value = false;
			startTime = Date.now();

			// Update duration display
			const updateDuration = () => {
				if (isRecording.value && !isPaused.value) {
					const elapsed = Date.now() - startTime;
					const seconds = Math.floor(elapsed / 1000);
					const minutes = Math.floor(seconds / 60);
					formattedDuration.value = `${minutes.toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
					animationFrame = requestAnimationFrame(updateDuration);
				}
			};
			updateDuration();

			mediaRecorder.ondataavailable = (event) => {
				// Handle recorded audio data
				console.log("Audio data available:", event.data);
			};

			mediaRecorder.start();
		} catch (error) {
			console.error("Error starting recording:", error);
		}
	};

	const stopRecording = () => {
		if (mediaRecorder && mediaRecorder.state !== "inactive") {
			mediaRecorder.stop();
		}
		if (audioStream) {
			for (const track of audioStream.getTracks()) {
				track.stop();
			}
		}
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
		isRecording.value = false;
		formattedDuration.value = "00:00";
	};

	const togglePause = () => {
		if (mediaRecorder) {
			if (isPaused.value) {
				mediaRecorder.resume();
				isPaused.value = false;
			} else {
				mediaRecorder.pause();
				isPaused.value = true;
			}
		}
	};

	const cancelRecording = () => {
		stopRecording();
		isRecording.value = false;
		isPaused.value = false;
	};

	return {
		cancelRecording,
		startRecording,
		stopRecording,
		togglePause,
	};
};
