import styles from "./AddNotes.module.css";
import PropTypes from "prop-types";

export default function AddNotes({ handleAddNote, isActive }) {
  return (
    <button
      className={styles.btn}
      onClick={handleAddNote}
      disabled={isActive}
      title="Click to add a note"
    >
      +
    </button>
  );
}

AddNotes.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
