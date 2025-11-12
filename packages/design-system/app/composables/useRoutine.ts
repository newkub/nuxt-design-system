import { computed, ref } from "vue";
import type { Habit, JournalEntry } from "~/types/routine";

export function useRoutine() {
	// --- Reactive State ---
	const habits = ref<Habit[]>([
		{
			completed: true,
			description: "30 minutes of cardio or strength training",
			frequency: "daily",
			id: "1",
			lastCompleted: "2025-10-14T08:30:00",
			name: "Morning Exercise",
			streak: 7,
		},
		{
			completed: false,
			description: "Read a book or article for personal development",
			frequency: "daily",
			id: "2",
			lastCompleted: "2025-10-13T21:15:00",
			name: "Read 30 Minutes",
			streak: 3,
		},
		{
			completed: false,
			description: "10 minutes of mindfulness meditation",
			frequency: "daily",
			id: "3",
			lastCompleted: "2025-10-13T07:00:00",
			name: "Meditation",
			streak: 5,
		},
		{
			completed: false,
			description: "Review goals and progress for the week",
			frequency: "weekly",
			id: "4",
			lastCompleted: "2025-10-08T19:30:00",
			name: "Weekly Review",
			streak: 4,
		},
	]);

	const journalEntries = ref<JournalEntry[]>([
		{
			content:
				"Today was a very productive day. I completed all my tasks ahead of schedule and had a great meeting with the team. Feeling accomplished!",
			date: "2025-10-14T21:30:00",
			id: "1",
			mood: "happy",
			tags: ["work", "productivity", "success"],
			title: "Productive Day at Work",
		},
		{
			content:
				"Started the day with meditation and a healthy breakfast. Feeling centered and ready to tackle whatever comes my way.",
			date: "2025-10-14T07:15:00",
			id: "2",
			mood: "neutral",
			tags: ["mindfulness", "morning"],
			title: "Morning Reflections",
		},
		{
			content:
				"Planning a hiking trip this weekend with friends. Looking forward to spending time in nature and disconnecting from work.",
			date: "2025-10-13T19:45:00",
			id: "3",
			mood: "excited",
			tags: ["weekend", "outdoors", "friends"],
			title: "Weekend Plans",
		},
		{
			content:
				"Had a difficult day dealing with some unexpected issues at work. Feeling a bit drained but managed to resolve everything.",
			date: "2025-10-12T22:30:00",
			id: "4",
			mood: "tired",
			tags: ["work", "challenges", "resilience"],
			title: "Challenging Day",
		},
	]);

	// --- Computed Properties ---
	const routineTabs = computed(() => [
		{ name: "Overview", path: "/routine/[tab]/overview" },
		{ name: "Habbit", path: "/routine/[tab]/habbit" },
		{ name: "Journal", path: "/routine/[tab]/journal" },
	]);

	const activeHabits = computed(() => habits.value.length);
	const completedHabits = computed(
		() => habits.value.filter((h) => h.completed).length,
	);
	const journalCount = computed(() => journalEntries.value.length);

	// --- Utility Functions ---
	const getFrequencyText = (frequency: string) => {
		const freqMap: Record<string, string> = {
			daily: "Daily",
			monthly: "Monthly",
			weekly: "Weekly",
		};
		return freqMap[frequency] || frequency;
	};

	const getStreakColor = (streak: number) => {
		if (streak >= 7) return "text-green-500";
		if (streak >= 3) return "text-yellow-500";
		return "text-gray-500";
	};

	const getMoodIcon = (mood: string) => {
		const iconMap: Record<string, string> = {
			excited: "i-mdi-emoticon-excited",
			happy: "i-mdi-emoticon-happy",
			neutral: "i-mdi-emoticon-neutral",
			sad: "i-mdi-emoticon-sad",
			tired: "i-mdi-emoticon-tired",
		};
		return iconMap[mood] || "i-mdi-emoticon-neutral";
	};

	const getMoodColor = (mood: string) => {
		const colorMap: Record<string, string> = {
			excited: "text-orange-500",
			happy: "text-yellow-500",
			neutral: "text-gray-500",
			sad: "text-blue-500",
			tired: "text-purple-500",
		};
		return colorMap[mood] || "text-gray-500";
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleString("th-TH", {
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			month: "short",
			year: "numeric",
		});
	};

	const formatDateShort = (date: string | null) => {
		if (!date) return "Never";
		return new Date(date).toLocaleDateString("th-TH", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	// --- Methods ---
	const toggleHabit = (habit: Habit) => {
		habit.completed = !habit.completed;
		if (habit.completed) {
			habit.streak += 1;
			habit.lastCompleted = new Date().toISOString();
		} else {
			habit.streak = Math.max(0, habit.streak - 1);
		}
	};

	const handleNewEntry = () => {
		// In a real app, this would open a modal or navigate to a create page
		console.log("Create new journal entry");
	};

	// Return all reactive state, computed properties, and methods
	return {
		activeHabits,
		completedHabits,
		formatDate,
		formatDateShort,

		// Utility functions
		getFrequencyText,
		getMoodColor,
		getMoodIcon,
		getStreakColor,
		// State
		habits,
		handleNewEntry,
		journalCount,
		journalEntries,

		// Computed
		routineTabs,

		// Methods
		toggleHabit,
	};
}
