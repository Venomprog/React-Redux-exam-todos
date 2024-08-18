const initialState = {
    todos: [],
    filters: [],
    selectedFilters: [],
    filterCompleted: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TODOS_FETCHING":
            return {
                ...state,
                todos: action.payload
            };
        case "FILTERS_FETCHING":
            return {
                ...state,
                filters: action.payload
            };
        case "CHECKED_FILTERS_CHANGING":
            return {
                ...state,
                filterCompleted: action.payload
            };
        case "SELECTED_FILTERS_CHANGING":
            return {
                ...state,
                selectedFilters: [...state.selectedFilters, action.payload]
            };
        case "SELECTED_FILTERS_REMOVE":
            return {
                ...state,
                selectedFilters: state.selectedFilters.filter(item => item !== action.payload)
            };
        default:
            return state;
    }
}


export default reducer