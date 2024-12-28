import {
  setTitleFilter,
  selectTitleFilter,
  setAuthorFilter,
  selectAuthorFilter,
  resetFilters,
  setOnlyFavoriteFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/FilterSlice";
import { useDispatch, useSelector } from "react-redux";
//import "./Filter.css";
import styles from "./Filter.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleResetAllFilters = () => {
    dispatch(resetFilters());
  };

  const handleOnlyFavoriteFilterChange = (e) => {
    dispatch(setOnlyFavoriteFilter(e.target.checked));
  };

  return (
    <div className="app-block filter">
      <h2>Filters</h2>
      <div className={styles.filter_row}>
        <div className={styles.filter_group}>
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by Title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className={styles.filter_group}>
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by Author..."
            onChange={handleAuthorFilterChange}
          />
        </div>
        <button type="button" onClick={handleResetAllFilters}>
          Reset All Filters
        </button>
        <div className={styles.filter_group}>
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
