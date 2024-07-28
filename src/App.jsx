import { useEffect, useState } from "react";
import AddNotes from "./components/AddNotes";
import Header from "./components/Header";
import NotesBox from "./components/NotesBox";
import PopUp from "./components/PopUp";
import SearchBar from "./components/SearchBar";
import { getNotes, deleteNote } from "./components/notesStorageUtil";
import "./App.css";
import "./index.css";

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const handleSave = () => {
    if (heading) {
      setNotes([
        ...notes,
        { heading, content, date: new Date().toLocaleDateString() },
      ]);
      setHeading("");
      setContent("");
      setShowPopup(false);
    }
  };

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleAddNote = () => {
    setCurrentNoteIndex(null);
    setHeading("");
    setContent("");
    setShowPopup(true);
    setIsActive(!isActive);
  };

  const handleEditNote = (index) => {
    const note = notes[index];
    setCurrentNoteIndex(index);
    setHeading(note.heading);
    setContent(note.content);
    setShowPopup(true);
    setDeleteActive(!deleteActive);
  };

  const handleDeleteNote = (index) => {
    deleteNote(index);
    setNotes(getNotes());
  };

  //Filtering out the Notes
  const filteredNotes = notes.filter(
    (note) =>
      note.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <div className="content-box grid-container">
        <div className="left-section">
          <h2>Atomic Notes</h2>
          <AddNotes handleAddNote={handleAddNote} isActive={isActive} />
        </div>
        <div className="right-section">
          <SearchBar setSearchQuery={setSearchQuery} />
          <Header />
          <NotesBox
            notes={filteredNotes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            isActive={isActive}
            deleteActive={deleteActive}
          />
        </div>
      </div>
      <PopUp
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        content={content}
        handleSave={handleSave}
        heading={heading}
        setHeading={setHeading}
        setContent={setContent}
        currentNoteIndex={currentNoteIndex}
        setNotes={setNotes}
        isActive={isActive}
        setIsActive={setIsActive}
        deleteActive={deleteActive}
        setDeleteActive={setDeleteActive}
      />
    </div>
  );
}
