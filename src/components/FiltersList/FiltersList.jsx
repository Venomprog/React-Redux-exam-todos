import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const FiltersList = ({filters, filtersFetch, selectedFiltersChanging, selectedFiltersRemove, checkedFilterChanging, checkedTodos}) => {
  let checkedFilters = [];

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos")
      response = await response.json()
      filtersFetch(response);
    }

    fetchMyAPI()
  }, []);


  const addCheckFilters = (event, filter) => {
    event.stopPropagation();
    const input = event.target
    if (input.checked) {
      if (filter === 'completed'){
        checkedFilterChanging(true)
      } else {

        checkedFilters.push(filter)
        selectedFiltersChanging(filter)
      }
    } else {
      if (filter === 'completed'){
        checkedFilterChanging(false)
      } else {
        const newArr = checkedFilters.filter(item => item !== filter)
        checkedFilters = newArr;
        selectedFiltersRemove(filter)
      }
    }

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
    newSetArr.push('completed')

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


const mapStateToProps = (state) => {

  return {
    todos: state.todos,
    filters: state.filters,
    selectedFilters: state.selectedFilters,
    filterCompleted: state.filterCompleted,
    checkedTodos: state.filterCompleted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filtersFetch: (todos) => dispatch({type: 'FILTERS_FETCHING', payload: todos}),
    selectedFiltersChanging: (filter) => dispatch({type: 'SELECTED_FILTERS_CHANGING', payload: filter}),
    selectedFiltersRemove: (filter) => dispatch({type: 'SELECTED_FILTERS_REMOVE', payload: filter}),
    checkedFilterChanging: (isChecked) => dispatch({type: 'CHECKED_FILTERS_CHANGING', payload: isChecked})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersList);