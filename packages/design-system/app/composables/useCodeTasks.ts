/**
 * Code IDE Tasks composable
 * Manages task list for code editor
 */

export interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	category: "Feature" | "Bug" | "Refactor" | "AI";
	priority: "Low" | "Medium" | "High";
	assignedTo?: string;
	createdAt: Date;
}

export function useCodeTasks() {
	const tasks = ref<Task[]>([
		{
			assignedTo: "John Doe",
			category: "Feature",
			completed: false,
			createdAt: new Date("2023-05-15"),
			description:
				"Create login and registration functionality with JWT tokens",
			id: 1,
			priority: "High",
			title: "Implement user authentication",
		},
		{
			assignedTo: "Jane Smith",
			category: "Bug",
			completed: true,
			createdAt: new Date("2023-05-10"),
			description: "Responsive design breaks on screens smaller than 480px",
			id: 2,
			priority: "Medium",
			title: "Fix layout issue on mobile",
		},
		{
			assignedTo: "Mike Johnson",
			category: "Refactor",
			completed: false,
			createdAt: new Date("2023-05-20"),
			description: "Improve code organization and error handling",
			id: 3,
			priority: "Low",
			title: "Refactor API service layer",
		},
		{
			assignedTo: "Sarah Williams",
			category: "Feature",
			completed: true,
			createdAt: new Date("2023-05-05"),
			description: "Implement theme switching functionality",
			id: 4,
			priority: "Medium",
			title: "Add dark mode toggle",
		},
		{
			assignedTo: "AI Assistant",
			category: "AI",
			completed: false,
			createdAt: new Date("2023-05-25"),
			description: "AI suggested performance improvements for slow queries",
			id: 5,
			priority: "High",
			title: "Optimize database queries",
		},
	]);

	const newTask = ref({
		category: "Feature" as Task["category"],
		description: "",
		priority: "Medium" as Task["priority"],
		title: "",
	});

	const isAddingTask = ref(false);

	// Helper functions
	function getCategoryClass(category: Task["category"]) {
		switch (category) {
			case "Feature":
				return "bg-blue-500/10 text-blue-400";
			case "Bug":
				return "bg-red-500/10 text-red-400";
			case "Refactor":
				return "bg-yellow-500/10 text-yellow-400";
			case "AI":
				return "bg-purple-500/10 text-purple-400";
		}
	}

	function getPriorityClass(priority: Task["priority"]) {
		switch (priority) {
			case "Low":
				return "bg-green-500/10 text-green-400";
			case "Medium":
				return "bg-yellow-500/10 text-yellow-400";
			case "High":
				return "bg-red-500/10 text-red-400";
		}
	}

	// Actions
	function toggleTaskCompletion(task: Task) {
		task.completed = !task.completed;
	}

	function addTask() {
		if (!newTask.value.title.trim()) return;

		tasks.value.push({
			category: newTask.value.category,
			completed: false,
			createdAt: new Date(),
			description: newTask.value.description,
			id: tasks.value.length + 1,
			priority: newTask.value.priority,
			title: newTask.value.title,
		});

		// Reset form
		newTask.value = {
			category: "Feature",
			description: "",
			priority: "Medium",
			title: "",
		};

		isAddingTask.value = false;
	}

	function deleteTask(taskId: number) {
		tasks.value = tasks.value.filter((task) => task.id !== taskId);
	}

	return {
		// State
		tasks,
		newTask,
		isAddingTask,
		// Helpers
		getCategoryClass,
		getPriorityClass,
		// Actions
		toggleTaskCompletion,
		addTask,
		deleteTask,
	};
}
