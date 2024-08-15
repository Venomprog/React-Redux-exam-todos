import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filtersChanging } from './filtersSlice';
import { useEffect } from 'react';
import { fetchFilters, selectedFiltersChanging, selectedFiltersRemove } from './filtersSlice';

const FiltersList = () => {
  const filters = useSelector(state => state.filters.filters);
  const dispatch = useDispatch();
  let checkedFilters = [];

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const filterTodos = (filter) => {
    dispatch(filtersChanging(filter))
  }

  const addCheckFilters = (event, filter) => {
    event.stopPropagation();
    const input = event.target
    if (input.checked) {
      checkedFilters.push(filter)
      dispatch(selectedFiltersChanging(filter));
    } else {
      const newArr = checkedFilters.filter(item => item !== filter)
      checkedFilters = newArr;
      dispatch(selectedFiltersRemove(filter));
    }

    console.log(checkedFilters)
    // dispatch(selectedFiltersChanging(checkedFilters));
  }

  const renderFilters = (arr) => {
    if (arr.length === 0){
      return
    }

    let newArr = [];

    for (let i = 0; i < arr.length; i++){
      newArr.push(arr[i].userId)
    }

    const newSetArr = Array.from(new Set(newArr));
    newSetArr.push('all')

    // return arr.map((item, i) => {
    //   return <button onClick={() => filterTodos(item)} key={i}>Фильтровать по {item}</button>
    // })
    return newSetArr.map((item, i) => {
      return (
        <label className='checkbox-label' onClick={(e) => addCheckFilters(e, item)} key={i}>
          <input type='checkbox' className='checkbox-input' />
          <p>Фильтровать по {item}</p>
        </label>
      ) 
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