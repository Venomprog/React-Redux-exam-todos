import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTodos } from './todosSlice';
import TodosListItem from '../TodosListItem/TodosListItem';
import './todosList.scss'

const TodosList = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const filteredTodosSelector = createSelector(
    (state) => state.filters.selectedFilters,
    (state) => state.todos.todos,
    (filter, todos) => {
        let todosArr = [];
        if (filter.length === 0){
          return todos
        }

        for (let i = 0; i < filter.length; i++){
          const filteredTodos = todos.filter(item => item.userId === filter[i]);
          todosArr = [...todosArr, ...filteredTodos];
        }
        return todosArr
    }
  )


  const filteredTodos = useSelector(filteredTodosSelector);

  const renderItems = (arr) => {
    if (arr === undefined) return
    if (arr.length === 0){
      return
    }

    return arr.map(({id, ...props}) => {
      return <TodosListItem key={id} {...props}/>
      
    })

  }

  const elements = renderItems(filteredTodos)

  return (
    <div className='todos-list'>
      {elements}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     filters: state.filters.selectedFilters,
//     todos: state.todos.todos
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchTodos: () => dispatch({type: 'TODOS_FETCHING'})
//   }
// }

export default TodosList;