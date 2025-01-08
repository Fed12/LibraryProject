import React from "react";
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
import "./Filter.css";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleResetAllFilters = () => {
    dispatch(resetFilters());
  };

  const handleOnlyFavoriteFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setOnlyFavoriteFilter(e.target.checked)); // Ensure setOnlyFavoriteFilter accepts a boolean
  };

  return (
    <div className="app-block filter">
      <h2>Filters</h2>
      <div className="filter_row">
        <div className="filter_group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by Title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter_group">
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
        <div className="filter_group">
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
