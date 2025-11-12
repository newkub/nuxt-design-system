import type { Note } from "~/shared/types/notes";

export const useNotes = () => {
	const notes = useState<Note[]>("notes", () => []);

	const fetchNotes = async () => {
		const { data } = await useFetch<Note[]>("/api/notes");
		if (data.value) {
			notes.value = data.value;
		}
	};

	const getNoteById = async (id: number) => {
		// First, try to find the note in the local state
		const existingNote = notes.value.find((note) => note.id === id);
		if (existingNote) {
			return existingNote;
		}

		// If not found, fetch from the API
		const { data } = await useFetch<Note>(`/api/notes/${id}`);
		return data.value;
	};

	return {
		fetchNotes,
		getNoteById,
		notes,
	};
};
