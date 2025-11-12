import type {
	Bookmark,
	BookmarkCollection,
	BookmarkTag,
} from "~/types/bookmark";

export function useBookmarks() {
	// Mock data for bookmarks
	const bookmarks = ref<Bookmark[]>([
		{
			collectionId: "development",
			createdAt: new Date("2024-01-15"),
			description: "The official Vue.js documentation",
			favicon: "https://vuejs.org/logo.png",
			id: "1",
			tags: ["frontend", "javascript", "framework"],
			title: "Vue.js Documentation",
			updatedAt: new Date("2024-01-15"),
			url: "https://vuejs.org",
		},
		{
			collectionId: "development",
			createdAt: new Date("2024-01-16"),
			description: "The official Nuxt.js documentation",
			favicon: "https://nuxt.com/favicon.ico",
			id: "2",
			tags: ["frontend", "javascript", "framework"],
			title: "Nuxt.js Documentation",
			updatedAt: new Date("2024-01-16"),
			url: "https://nuxt.com",
		},
		{
			collectionId: "development",
			createdAt: new Date("2024-01-17"),
			description: "Resources for developers, by developers",
			favicon: "https://developer.mozilla.org/favicon.ico",
			id: "3",
			tags: ["frontend", "javascript", "css", "html"],
			title: "MDN Web Docs",
			updatedAt: new Date("2024-01-17"),
			url: "https://developer.mozilla.org",
		},
		{
			collectionId: "development",
			createdAt: new Date("2024-01-18"),
			description: "Where the world builds software",
			favicon: "https://github.com/favicon.ico",
			id: "4",
			tags: ["development", "repository", "git"],
			title: "GitHub",
			updatedAt: new Date("2024-01-18"),
			url: "https://github.com",
		},
		{
			collectionId: "development",
			createdAt: new Date("2024-01-19"),
			description: "Where developers learn, share, and build careers",
			favicon: "https://stackoverflow.com/favicon.ico",
			id: "5",
			tags: ["development", "q&a"],
			title: "Stack Overflow",
			updatedAt: new Date("2024-01-19"),
			url: "https://stackoverflow.com",
		},
	]);

	// Mock data for collections
	const collections = ref<BookmarkCollection[]>([
		{
			bookmarkCount: 5,
			color: "bg-blue-500",
			createdAt: new Date("2024-01-15"),
			icon: "i-mdi-bookmark-multiple",
			id: "all",
			name: "All Bookmarks",
			updatedAt: new Date("2024-01-15"),
		},
		{
			bookmarkCount: 5,
			color: "bg-green-500",
			createdAt: new Date("2024-01-15"),
			description: "Bookmarks related to software development",
			icon: "i-mdi-code-braces",
			id: "development",
			name: "Development",
			updatedAt: new Date("2024-01-15"),
		},
		{
			bookmarkCount: 0,
			color: "bg-purple-500",
			createdAt: new Date("2024-01-15"),
			description: "Bookmarks related to UI/UX design",
			icon: "i-mdi-palette",
			id: "design",
			name: "Design",
			updatedAt: new Date("2024-01-15"),
		},
		{
			bookmarkCount: 0,
			color: "bg-yellow-500",
			createdAt: new Date("2024-01-15"),
			description: "Articles and resources to read later",
			icon: "i-mdi-book-open",
			id: "reading",
			name: "Reading List",
			updatedAt: new Date("2024-01-15"),
		},
	]);

	// Mock data for tags
	const tags = ref<BookmarkTag[]>([
		{
			bookmarkCount: 3,
			color: "bg-blue-100 text-blue-800",
			id: "frontend",
			name: "Frontend",
		},
		{
			bookmarkCount: 3,
			color: "bg-yellow-100 text-yellow-800",
			id: "javascript",
			name: "JavaScript",
		},
		{
			bookmarkCount: 2,
			color: "bg-green-100 text-green-800",
			id: "framework",
			name: "Framework",
		},
		{
			bookmarkCount: 1,
			color: "bg-purple-100 text-purple-800",
			id: "css",
			name: "CSS",
		},
		{
			bookmarkCount: 1,
			color: "bg-red-100 text-red-800",
			id: "html",
			name: "HTML",
		},
		{
			bookmarkCount: 2,
			color: "bg-indigo-100 text-indigo-800",
			id: "development",
			name: "Development",
		},
		{
			bookmarkCount: 1,
			color: "bg-pink-100 text-pink-800",
			id: "q&a",
			name: "Q&A",
		},
	]);

	const searchQuery = ref("");
	const selectedCollection = ref("all");
	const selectedTag = ref("");

	// Filtered bookmarks based on search, collection, and tag
	const filteredBookmarks = computed(() => {
		let result = [...bookmarks.value];

		// Filter by search query
		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase();
			result = result.filter(
				(bookmark) =>
					bookmark.title.toLowerCase().includes(query) ||
					bookmark.description?.toLowerCase().includes(query) ||
					bookmark.url.toLowerCase().includes(query) ||
					bookmark.tags.some((tag) => tag.toLowerCase().includes(query)),
			);
		}

		// Filter by collection
		if (selectedCollection.value && selectedCollection.value !== "all") {
			result = result.filter(
				(bookmark) => bookmark.collectionId === selectedCollection.value,
			);
		}

		// Filter by tag
		if (selectedTag.value) {
			result = result.filter((bookmark) =>
				bookmark.tags.includes(selectedTag.value),
			);
		}

		return result;
	});

	// Filtered collections based on search
	const filteredCollections = computed(() => {
		if (!searchQuery.value) return collections.value;
		return collections.value.filter(
			(collection) =>
				collection.name
					.toLowerCase()
					.includes(searchQuery.value.toLowerCase()) ||
				collection.description
					?.toLowerCase()
					.includes(searchQuery.value.toLowerCase()),
		);
	});

	// Filtered tags based on search
	const filteredTags = computed(() => {
		if (!searchQuery.value) return tags.value;
		return tags.value.filter((tag) =>
			tag.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
		);
	});

	// Get bookmarks for a specific collection
	const getBookmarksByCollection = (collectionId: string) => {
		return bookmarks.value.filter(
			(bookmark) => bookmark.collectionId === collectionId,
		);
	};

	// Get bookmarks for a specific tag
	const getBookmarksByTag = (tag: string) => {
		return bookmarks.value.filter((bookmark) => bookmark.tags.includes(tag));
	};

	// Add a new bookmark
	const addBookmark = (
		bookmark: Omit<Bookmark, "id" | "createdAt" | "updatedAt">,
	) => {
		const newBookmark: Bookmark = {
			...bookmark,
			createdAt: new Date(),
			id: Math.random().toString(36).substr(2, 9),
			updatedAt: new Date(),
		};
		bookmarks.value.push(newBookmark);

		// Update collection count
		const collection = collections.value.find(
			(c) => c.id === bookmark.collectionId,
		);
		if (collection) {
			collection.bookmarkCount += 1;
		}

		return newBookmark;
	};

	// Delete a bookmark
	const deleteBookmark = (id: string) => {
		const index = bookmarks.value.findIndex((bookmark) => bookmark.id === id);
		if (index !== -1) {
			const bookmark = bookmarks.value[index];
			if (bookmark) {
				bookmarks.value.splice(index, 1);

				// Update collection count
				const collection = collections.value.find(
					(c) => c.id === bookmark.collectionId,
				);
				if (collection && collection.bookmarkCount > 0) {
					collection.bookmarkCount -= 1;
				}
			}
		}
	};

	// Update a bookmark
	const updateBookmark = (id: string, updates: Partial<Bookmark>) => {
		const index = bookmarks.value.findIndex((bookmark) => bookmark.id === id);
		if (index !== -1) {
			const existingBookmark = bookmarks.value[index];
			if (existingBookmark) {
				bookmarks.value[index] = {
					...existingBookmark,
					...updates,
					updatedAt: new Date(),
				} as Bookmark;
			}
		}
	};

	// Select a collection
	const selectCollection = (collectionId: string) => {
		selectedCollection.value = collectionId;
		selectedTag.value = "";
	};

	// Select a tag
	const selectTag = (tagId: string) => {
		selectedTag.value = tagId;
		selectedCollection.value = "all";
	};

	// Clear filters
	const clearFilters = () => {
		selectedCollection.value = "all";
		selectedTag.value = "";
		searchQuery.value = "";
	};

	return {
		addBookmark,
		// Data
		bookmarks,
		clearFilters,
		collections,
		deleteBookmark,

		// Computed
		filteredBookmarks,
		filteredCollections,
		filteredTags,

		// Methods
		getBookmarksByCollection,
		getBookmarksByTag,
		searchQuery,
		selectCollection,
		selectedCollection,
		selectedTag,
		selectTag,
		tags,
		updateBookmark,
	};
}
