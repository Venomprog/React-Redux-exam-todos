import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import TodosListItem from '../TodosListItem/TodosListItem';
import './todosList.scss'

const TodosList = ({todos, checkedTodos, selectedFilters, todosFetch}) => {


  useEffect(() => {

    async function fetchMyAPI() {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos")
      response = await response.json()
      todosFetch(response);
    }

    fetchMyAPI()

  }, []);


  function filteringTodos(todos, filter){
    let todosArr = [];
        if (filter.length === 0){
          if (checkedTodos){
            const completedTodos = todos.filter(item => item.completed === true);
            return completedTodos
          }
          return todos
        }

        for (let i = 0; i < filter.length; i++){
          const filteredTodos = todos.filter(item => item.userId === filter[i]);
          todosArr = [...todosArr, ...filteredTodos];
        }
        if (checkedTodos){
          const completedTodos = todosArr.filter(item => item.completed === true);
          return completedTodos
        }
        return todosArr
  }


  const renderItems = (arr) => {
    if (arr === undefined) return
    if (arr.length === 0){
      return
    }

    return arr.map(({id, ...props}) => {
      return <TodosListItem key={id} {...props}/>
      
    })

  }

  const elements = renderItems(filteringTodos(todos, selectedFilters))

  return (
    <div className='todos-list'>
      {elements}
    </div>
  );
};


const mapStateToProps = (state) => {

  return {
    todos: state.todos,
    selectedFilters: state.selectedFilters,
    checkedTodos: state.filterCompleted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    todosFetch: (todos) => dispatch({type: 'TODOS_FETCHING', payload: todos})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);