import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  filters: [
    1,
    2,
    3,
    4,
    'all'
  ],
  activeFilter: 'all'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanging: (state, action) => {
      state.activeFilter = action.payload
    },

  },
  extraReducers: (builder)  => {
    builder
          .addDefaultCase(() => {})
  }
});


const {actions, reducer} = filtersSlice;

export default reducer;

export const {
  filtersChanging,
} = actions