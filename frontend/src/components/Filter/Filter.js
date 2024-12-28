import {
  setTitleFilter,
  selectTitleFilter,
  setAuthorFilter,
  selectAuthorFilter,
  resetFilters,
} from "../../redux/slices/FilterSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleResetAllFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block book-filter">
      <h2>Filters</h2>
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by Title..."
            onChange={handleTitleFilterChange}
          />
          <div className="filter-group">
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
        </div>
      </div>
    </div>
  );
};

export default Filter;
