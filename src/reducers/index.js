const initialState = {
  todos: [],
  filters: [
    1,
    2,
    3,
    4,
    'all'
  ],
  selectedFilters: [],
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
      case "TODOS_FETCHING":
          return {
              ...state,
              todos : action.payload
          };
      case "DEC":
          return {
              ...state,
              value: state.value - 1
          };
      case "RND":
          return {
              ...state,
              value: state.value * action.payload
          };
      default:
          return state;
  }
}
