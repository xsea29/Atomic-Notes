const NOTES_KEY = "notes";

// Save notes to local storage
const saveNotes = (notes) => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes to localStorage", error);
  }
};

// Get notes from local storage
export const getNotes = () => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error("Error retrieving notes from localStorage", error);
    return [];
  }
};

// Add a new note
export const addNote = (note) => {
  const notes = getNotes();
  notes.push(note);
  saveNotes(notes);
};

// Update an existing note (if needed)
export const updateNote = (index, updatedNote) => {
  const notes = getNotes();
  if (index >= 0 && index < notes.length) {
    notes[index] = updatedNote;
    saveNotes(notes);
  } else {
    console.error("Note index out of bounds");
  }
};

// Remove a note by index (if needed)
export const deleteNote = (index) => {
  const notes = getNotes();
  if (index >= 0 && index < notes.length) {
    notes.splice(index, 1);
    saveNotes(notes);
  } else {
    console.error("Note index out of bounds");
  }
};
