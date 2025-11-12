import { onMounted, ref } from "vue";

import type { Column, Project, Task, TaskList } from "~/types/task";

export const useTask = () => {
	const route = useRoute();

	// Reactive data
	const tasks = ref<Task[]>([]);
	const columns = ref<Column[]>([]);
	const calendarAttributes = ref<any[]>([]);

	// Projects data
	const projects = ref<Project[]>([
		{
			color: "bg-blue-500",
			icon: "i-mdi-account",
			id: "personal",
			name: "Personal",
			taskCount: 8,
		},
		{
			color: "bg-green-500",
			icon: "i-mdi-briefcase",
			id: "work",
			name: "Work",
			taskCount: 12,
		},
		{
			color: "bg-purple-500",
			icon: "i-mdi-cart",
			id: "shopping",
			name: "Shopping",
			taskCount: 5,
		},
		{
			color: "bg-red-500",
			icon: "i-mdi-heart",
			id: "health",
			name: "Health",
			taskCount: 3,
		},
	]);

	// Lists data
	const lists = ref<TaskList[]>([
		{ icon: "i-mdi-view-list", id: "all", name: "All Tasks" },
		{ icon: "i-mdi-calendar-today", id: "today", name: "Today" },
		{ icon: "i-mdi-star", id: "important", name: "Important" },
		{ icon: "i-mdi-calendar-clock", id: "planned", name: "Planned" },
	]);

	// Determine the current context from route
	const getContext = (): string => {
		// For project routes like /task/personal/list
		const pathSegments = route.path.split("/").filter(Boolean);

		// Check if this is a project route (e.g., /task/personal/list)
		if (
			pathSegments.length >= 2 &&
			pathSegments[0] === "task" &&
			pathSegments[2] === "list"
		) {
			return pathSegments[1] || "all"; // Returns 'personal', 'work', etc.
		}

		// For list routes like /task/all/list
		if (
			pathSegments.length >= 2 &&
			pathSegments[0] === "task" &&
			pathSegments[2] === "list"
		) {
			return pathSegments[1] || "all"; // Returns 'all', 'today', etc.
		}

		// Fallback to 'all'
		return "all";
	};

	// Fetch tasks from server
	const fetchTasks = async () => {
		const context = getContext();
		try {
			const response = await $fetch(`/api/tasks/${context}`);
			tasks.value = response as Task[];
		} catch (error) {
			console.error("Error fetching tasks:", error);
			tasks.value = [];
		}
	};

	// Fetch columns from server
	const fetchColumns = async () => {
		const context = getContext();
		try {
			const response = await $fetch(`/api/columns/${context}`);
			columns.value = response as Column[];
		} catch (error) {
			console.error("Error fetching columns:", error);
			columns.value = [];
		}
	};

	// Fetch calendar data from server
	const fetchCalendarData = async () => {
		const context = getContext();
		try {
			const response = await $fetch(`/api/calendar/${context}`);
			calendarAttributes.value = response as any[];
		} catch (error) {
			console.error("Error fetching calendar data:", error);
			calendarAttributes.value = [];
		}
	};

	// Initialize data
	onMounted(() => {
		fetchTasks();
		fetchColumns();
		fetchCalendarData();
	});

	// Return computed properties and functions
	return {
		fetchCalendarData,
		fetchColumns,
		fetchTasks,
		getCalendarAttributes: calendarAttributes,
		getColumns: columns,
		getContext,
		getTasks: tasks,
		lists,
		projects,
	};
};
