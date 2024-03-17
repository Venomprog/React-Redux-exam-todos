import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filtersChanging } from './filtersSlice';

const FiltersList = () => {
  const filters = useSelector(state => state.filters.filters);
  const dispatch = useDispatch();

  const filterTodos = (filter) => {
    dispatch(filtersChanging(filter))
  }

  const renderFilters = (arr) => {
    if (arr.length === 0){
      return
    }

    return arr.map((item, i) => {
      return <button onClick={() => filterTodos(item)} key={i}>Фильтровать по {item}</button>
    })
  }

  const elements = renderFilters(filters)

  return (
    <div className='todos-filters'>
      {elements}
    </div>
  );
};

export default FiltersList;