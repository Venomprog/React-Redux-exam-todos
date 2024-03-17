import { configureStore } from '@reduxjs/toolkit';

import todos from '../components/TodosList/todosSlice';
import filters from '../components/FiltersList/filtersSlice';


const stringMiddleware = (store) => (next) => (action) => { //можно считать что вместо next у нас dispatch (next потому что будет вызываться новый диспетч в след за другим)
  if (typeof action === 'string'){
    return next({
      type: action
    })
  } else {
    return next(action)
  }
}

const store = configureStore({
  reducer: {todos, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
