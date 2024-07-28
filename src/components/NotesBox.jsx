import styles from "./NoteBox.module.css";
import PropTypes from "prop-types";
import { FiEdit2 } from "react-icons/fi";
import deleteIcon from "/trash.png";
import { useState } from "react";

export default function NotesBox({
  notes,
  onEdit,
  onDelete,
  isActive,
  deleteActive,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = notes.slice(startIndex, startIndex + notesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const previous = "<";
  const next = ">";
  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesBox}>
        {currentNotes.map((note, index) => (
          <div className={styles.note} key={index}>
            <div>
              <div className={styles.noteHead}>
                <p>
                  {note.heading.length > 30
                    ? `${note.heading.substring(0, 50)}...`
                    : note.heading}
                </p>
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className={styles.deleteIcon}
                  onClick={() => !deleteActive && onDelete(index)}
                  style={{ cursor: deleteActive ? "not-allowed" : "pointer" }}
                />
              </div>
              <p className={styles.content}>
                {note.content.length > 100
                  ? `${note.content.substring(0, 100)}...`
                  : note.content}
              </p>
            </div>
            <div className={styles.group}>
              <small className={styles.date}>{note.date}</small>
              <FiEdit2
                className={styles.editIcon}
                onClick={() => onEdit(index)}
                disabled={isActive}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.paginationControls}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {previous}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {next}
        </button>
      </div>
    </div>
  );
}

NotesBox.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  deleteActive: PropTypes.bool.isRequired,
};
