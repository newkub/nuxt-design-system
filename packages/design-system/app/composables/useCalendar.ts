import { useCalendarStore } from "~/stores/calendar";
import type {
	CalendarEvent,
	CalendarItem,
	CalendarWeek,
	EventForm,
	WeekDay,
} from "~/types/calendar";
import { eventFormSchema } from "~/types/calendar";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const eventColors = [
	{ class: "bg-blue-500", name: "Blue", value: "blue" },
	{ class: "bg-green-500", name: "Green", value: "green" },
];

export const useCalendar = (selectedCalendars: Ref<string[]>) => {
	const calendarStore = useCalendarStore();
	const currentDate = ref(new Date());
	const showCreateModal = ref(false);
	const newAttendee = ref("");
	const eventFormErrors = ref<Record<string, string[]>>({});

	const eventForm = ref<EventForm>({
		allDay: false,
		attendees: [],
		color: "blue",
		description: "",
		endDate: new Date(),
		location: "",
		startDate: new Date(),
		title: "",
	});

	// --- DATA FETCHING with useAsyncData ---
	const {
		data: calendarItems,
		pending: isLoadingCalendars,
		refresh: fetchCalendars,
	} = useAsyncData<CalendarItem[]>(
		"calendars",
		() => $fetch("/api/calendar/calendars"),
		{
			default: () => [
				{ color: "blue", id: "1", name: "Personal", visible: true },
				{ color: "green", id: "2", name: "Work", visible: true },
			],
		},
	);

	const {
		data: events,
		pending: isLoadingEvents,
		refresh: fetchEvents,
	} = useAsyncData<CalendarEvent[]>(
		"events",
		() => {
			const ids = selectedCalendars.value;
			if (ids.length === 0) return Promise.resolve([]);
			return $fetch("/api/calendar/events", {
				query: { calendars: ids.join(",") },
			});
		},
		{
			default: () => [],
			watch: [selectedCalendars],
		},
	);

	// --- COMPUTED ---
	const state = computed(() => ({
		currentDate: currentDate.value,
		events: events.value ?? [],
		viewMode: calendarStore.settings.defaultViewMode,
	}));
	const year = computed(() => currentDate.value.getFullYear());
	const month = computed(() => currentDate.value.getMonth());
	const monthName = computed(() =>
		currentDate.value.toLocaleString("default", { month: "long" }),
	);

	const calendarWeeks = computed<CalendarWeek[]>(() => {
		const y = year.value;
		const m = month.value;

		const firstDay = new Date(y, m, 1);
		const lastDay = new Date(y, m + 1, 0);
		const startDay = new Date(firstDay);
		startDay.setDate(firstDay.getDate() - firstDay.getDay());
		const endDay = new Date(lastDay);
		endDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

		const weeks: CalendarWeek[] = [];
		const currentDay = new Date(startDay);

		while (currentDay <= endDay) {
			const days: WeekDay[] = [];
			for (let i = 0; i < 7; i++) {
				const date = new Date(currentDay);
				days.push({
					date,
					isCurrentMonth: date.getMonth() === m,
				});
				currentDay.setDate(currentDay.getDate() + 1);
			}
			weeks.push({ days, weekNumber: 0 /* Placeholder */ });
		}

		return weeks;
	});

	const calendarWeeksWithEvents = computed(() => {
		return (calendarWeeks.value ?? []).map((week) => ({
			...week,
			days: week.days.map((day) => {
				const date = new Date(day.date);
				const dayEvents = (events.value ?? []).filter((event) => {
					const eventDate = new Date(event.startDate);
					return (
						eventDate.getDate() === date.getDate() &&
						eventDate.getMonth() === date.getMonth() &&
						eventDate.getFullYear() === date.getFullYear()
					);
				});
				return { ...day, events: dayEvents };
			}),
		}));
	});

	// --- METHODS: NAVIGATION & EVENT HANDLING ---
	const handleNavigate = (direction: "next" | "previous") => {
		const newDate = new Date(currentDate.value);
		const increment = direction === "next" ? 1 : -1;
		if (state.value.viewMode === "month")
			newDate.setMonth(newDate.getMonth() + increment);
		else if (state.value.viewMode === "week")
			newDate.setDate(newDate.getDate() + 7 * increment);
		else newDate.setDate(newDate.getDate() + increment);
		currentDate.value = newDate;
	};

	const handleSaveEvent = async () => {
		const result = eventFormSchema.safeParse(eventForm.value);
		if (!result.success) {
			eventFormErrors.value = result.error.flatten().fieldErrors;
			return;
		}
		eventFormErrors.value = {};
		try {
			await calendarStore.createEvent(result.data);
			showCreateModal.value = false;
			fetchEvents();
		} catch (error) {
			console.error("Failed to save event:", error);
		}
	};

	const handleDeleteEvent = async (eventId: string) => {
		try {
			await calendarStore.deleteEvent(eventId);
			fetchEvents();
		} catch (error) {
			console.error("Failed to delete event:", error);
		}
	};

	const addAttendee = () => {
		if (
			newAttendee.value &&
			!eventForm.value.attendees.includes(newAttendee.value)
		) {
			eventForm.value.attendees.push(newAttendee.value);
			newAttendee.value = "";
		}
	};

	// --- RETURN ---
	return {
		addAttendee,
		calendarItems,
		calendarWeeks: calendarWeeksWithEvents,
		currentDate,
		dayNames,
		eventColors,
		eventForm,
		eventFormErrors,
		events,
		fetchCalendars,
		fetchEvents,
		handleCancelEvent: () => {
			showCreateModal.value = false;
		},
		handleCreateEvent: () => {
			showCreateModal.value = true;
		},
		handleDaySelect: (date: Date) => {
			currentDate.value = new Date(date);
		},
		handleDeleteEvent,
		handleGoToday: () => {
			currentDate.value = new Date();
		},
		handleNavigate,
		handleSaveEvent,
		handleViewModeUpdate: (view: "month" | "week" | "day") => {
			calendarStore.updateSettings({ defaultViewMode: view });
		},
		isLoadingCalendars,
		isLoadingEvents,
		monthName,
		newAttendee,
		removeAttendee: (index: number) => {
			eventForm.value.attendees.splice(index, 1);
		},
		showCreateModal,
		state,
		year,
	};
};
