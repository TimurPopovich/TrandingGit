import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    id: null,
    email: null,
    interes: [],
    search: [],
    statusSearch: false,
  },
  reducers: {
    initUser(state, action) {
      state.id = action.payload.id
      state.isAuth = true
      state.email = action.payload.email
      state.interes = action.payload.interes
    },
    userLogout(state) {
      localStorage.removeItem('token');
      state = this.initialState;
    },
    editUser(state, action) {
      state.email = action.payload
    },
    saveCard(state, action) {
      state.interes = [...state.interes, action.payload]
    },
    deleteCard(state, action) {
      const findIndex = state.interes.findIndex(el => el.url === action.payload.url)
      const interes = [...state.interes]
      interes.splice(findIndex, 1)
      state.interes = [...interes]
    },
    initSearch(state, action) {
      state.search = [...action.payload]
    },
    statusSearch(state, action) {
      state.statusSearch = action.payload
    },
  }
})

export default userSlice.reducer

export const { initUser, initSearch, userLogout, editUser, deleteCard, statusSearch, saveCard } = userSlice.actions
