import styles from "./PopUp.module.css";
import PropTypes from "prop-types";
import { addNote, updateNote, getNotes } from "./notesStorageUtil";

export default function PopUp({
  setShowPopup,
  showPopup,
  content,
  heading,
  setHeading,
  setContent,
  currentNoteIndex,
  setNotes,
  isActive,
  setIsActive,
  deleteActive,
  setDeleteActive,
}) {
  function handleClose() {
    setShowPopup(false);
    setHeading("");
    setContent("");
    setIsActive(!isActive);
  }

  function handleSaveNote() {
    if (!heading.trim() || !content.trim()) {
      alert("Heading and content cannot be empty.");
      return;
    }

    const newNote = {
      heading,
      content,
      date: new Date()
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/"),
    };

    if (currentNoteIndex !== null) {
      updateNote(currentNoteIndex, newNote);
      setDeleteActive(!deleteActive);
    } else {
      addNote(newNote);
      setIsActive(!isActive);
    }

    setNotes(getNotes());
    handleClose();
  }
  return (
    <div className={styles.overlay}>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.titleCross}>
            <h2>{currentNoteIndex !== null ? "Edit Note" : "Create a Note"}</h2>
            <button onClick={handleClose}>x</button>
          </div>

          <input
            type="text"
            placeholder="Enter heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />

          <textarea
            placeholder="Enter content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit" onClick={handleSaveNote}>
            {currentNoteIndex !== null ? "Save Note" : "Add Note"}
          </button>
        </div>
      )}
    </div>
  );
}

PopUp.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  setHeading: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  currentNoteIndex: PropTypes.number,
  setNotes: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  deleteActive: PropTypes.bool.isRequired,
  setDeleteActive: PropTypes.func.isRequired,
};
