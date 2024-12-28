import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
} from "../../redux/slices/FilterSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block book-filter">
      <h2>Filters</h2>
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
          <button type="button" onClick={handleResetFilters}>
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
