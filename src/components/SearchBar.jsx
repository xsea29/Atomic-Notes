import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";

export default function SearchBar({ setSearchQuery }) {
  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.searchIcon}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};
