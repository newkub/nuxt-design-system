import type { App } from "~/types/app";

export type { App };

// Built-in apps - ไม่ต้อง fetch จาก server
export const builtInApps: App[] = [
	{
		category: "System",
		description: "Manage your account and preferences",
		developer: "Wrikka",
		icon: "i-mdi-cog",
		image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
		label: "Settings",
		price: "Free",
		slug: "settings",
		to: "/settings",
		type: "built-in",
	},
	{
		category: "System",
		description: "Your central hub for everything",
		developer: "Wrikka",
		icon: "i-mdi-home",
		image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
		label: "Home",
		price: "Free",
		slug: "home",
		to: "/",
		type: "built-in",
	},
	{
		category: "Productivity",
		description:
			"Schedule and manage events, meetings, and appointments seamlessly",
		developer: "Wrikka",
		icon: "i-mdi-calendar",
		image: "https://images.unsplash.com/photo-1506784983877-45594efa4c85",
		label: "Calendar",
		price: "Free",
		slug: "calendar",
		to: "/calendar",
		type: "built-in",
	},
	{
		category: "Communication",
		description: "Real-time team communication and collaboration platform",
		developer: "Wrikka",
		icon: "i-mdi-message-text",
		image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
		label: "Chat",
		price: "Free",
		slug: "chat",
		to: "/chat",
		type: "built-in",
	},
	{
		category: "Development",
		description:
			"A collaborative code editor with real-time editing and debugging",
		developer: "Wrikka",
		icon: "i-mdi-code-braces",
		image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
		label: "Code",
		price: "Free",
		slug: "code",
		to: "/code",
		type: "built-in",
	},
	{
		category: "Design",
		description: "Create stunning graphics and designs with powerful tools",
		developer: "Wrikka",
		icon: "i-mdi-palette",
		image: "https://images.unsplash.com/photo-1502404679413-6ca0a78fb36b",
		label: "Design",
		price: "Free",
		slug: "design",
		to: "/design",
		type: "built-in",
	},
	{
		category: "Productivity",
		description: "Collaborative document editing and management",
		developer: "Wrikka",
		icon: "i-mdi-file-document",
		image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
		label: "Docs",
		price: "Free",
		slug: "docs",
		to: "/docs",
		type: "built-in",
	},
	{
		category: "Communication",
		description: "A modern and efficient email client for all your accounts",
		developer: "Wrikka",
		icon: "i-mdi-email",
		image: "https://images.unsplash.com/photo-1557205465-f3298e7235b2",
		label: "Email",
		price: "Free",
		slug: "email",
		to: "/email",
		type: "built-in",
	},
	{
		category: "Productivity",
		description: "Create custom forms, surveys, and quizzes with ease",
		developer: "Wrikka",
		icon: "i-mdi-form-select",
		image: "https://images.unsplash.com/photo-1555431181-8b1c4ada7033",
		label: "Form",
		price: "Free",
		slug: "form",
		to: "/form",
		type: "built-in",
	},
	{
		category: "Development",
		description: "Deploy and manage your websites and applications",
		developer: "Wrikka",
		icon: "i-mdi-server",
		image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
		label: "Hosting",
		price: "Free",
		slug: "hosting",
		to: "/hosting",
		type: "built-in",
	},
	{
		category: "Productivity",
		description: "A simple and beautiful note-taking application",
		developer: "Wrikka",
		icon: "i-mdi-notebook",
		image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
		label: "Notes",
		price: "Free",
		slug: "notes",
		to: "/notes",
		type: "built-in",
	},
	{
		category: "Lifestyle",
		description: "Track your daily habits and build positive routines",
		developer: "Wrikka",
		icon: "i-mdi-calendar-check",
		image: "https://images.unsplash.com/photo-1522120691812-dcdfb625f397",
		label: "Routine",
		price: "Free",
		slug: "routine",
		to: "/routine",
		type: "built-in",
	},
	{
		category: "Productivity",
		description: "Create beautiful presentations and slideshows",
		developer: "Wrikka",
		icon: "i-mdi-presentation",
		image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
		label: "Slide",
		price: "Free",
		slug: "slide",
		to: "/slide",
		type: "built-in",
	},
	{
		category: "Business",
		description: "A complete project management suite for teams",
		developer: "Wrikka",
		icon: "i-mdi-monitor-dashboard",
		image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
		label: "Studio",
		price: "Free",
		slug: "studio",
		to: "/studio",
		type: "built-in",
	},
	{
		category: "Productivity",
		description: "Organize your work and life with a simple to-do list",
		developer: "Wrikka",
		icon: "i-mdi-format-list-checks",
		image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
		label: "Task",
		price: "Free",
		slug: "task",
		to: "/task",
		type: "built-in",
	},
	{
		category: "Collaboration",
		description: "A collaborative whiteboard for brainstorming and ideation",
		developer: "Wrikka",
		icon: "i-mdi-whiteboard",
		image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
		label: "Whiteboard",
		price: "Free",
		slug: "whiteboard",
		to: "/whiteboard",
		type: "built-in",
	},
	{
		category: "System",
		description: "Save and organize your favorite apps",
		developer: "Wrikka",
		icon: "i-mdi-bookmark",
		image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
		label: "Bookmark",
		price: "Free",
		slug: "bookmark",
		to: "/bookmark",
		type: "built-in",
	},
];

// Export app icons for static use (e.g., UnoCSS safelist)
export const builtInAppIcons = builtInApps.map((app) => app.icon);

/**
 * Get all apps (built-in + external)
 */
export function useApps() {
	const {
		data: externalApps,
		pending,
		error,
	} = useFetch<App[]>("/api/apps/external", {
		default: () => [],
	});

	const allApps = computed(() => [
		...builtInApps,
		...(externalApps.value || []),
	]);

	const navItems = computed(() =>
		builtInApps.filter((app) => app.to !== "/apps" && app.slug !== "settings"),
	);

	const bottomNavItems = computed<App[]>(() =>
		builtInApps.filter((app) => app.slug === "settings"),
	);

	// Bookmark functionality
	const bookmarkedApps = useState<App[]>("bookmarkedApps", () => []);

	const toggleBookmark = (app: App) => {
		const index = bookmarkedApps.value.findIndex(
			(bookmarkedApp) => bookmarkedApp.slug === app.slug,
		);
		if (index > -1) {
			// Remove from bookmarks
			bookmarkedApps.value.splice(index, 1);
		} else {
			// Add to bookmarks
			bookmarkedApps.value.push(app);
		}
	};

	const isBookmarked = (appSlug: string) => {
		return bookmarkedApps.value.some(
			(bookmarkedApp) => bookmarkedApp.slug === appSlug,
		);
	};

	return {
		allApps,
		bookmarkedApps,
		bottomNavItems,
		builtInApps: computed(() => builtInApps),
		error,
		externalApps,
		isBookmarked,
		navItems,
		pending,
		toggleBookmark,
	};
}
