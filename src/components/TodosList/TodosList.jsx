import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTodos } from './todosSlice';
import TodosListItem from '../TodosListItem/TodosListItem';
import './todosList.scss'

const TodosList = () => {
  const dispatch = useDispatch();

  const filteredTodosSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.todos.todos,
    (filter, todos) => {
        if (filter === 'all'){
            return todos
        } else {
            return todos.filter(item => item.userId === filter)
        }
    }
  )

  const filteredTodos = useSelector(filteredTodosSelector);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const renderItems = (arr) => {
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

export default TodosList;