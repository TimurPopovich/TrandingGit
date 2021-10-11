const initialState = {
  isAuth: false,
  id: null,
  email: null,
  interes: [],
  search: [],
  statusSearch: false
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT_USER':
      return { ...state, id: action.payload.id, isAuth: true, email: action.payload.email, interes: action.payload.interes }
    case 'USER_LOGOUT':
      localStorage.removeItem('token');
      return initialState
    case 'EDIT_USER':
      return { ...state, email: action.payload }
    case 'SAVE_CARD':
      return { ...state, interes: [...state.interes, action.payload] }
    case 'DELETE_CARD':
      const findIndex = state.interes.findIndex(el => el.url === action.payload.url)
      const interes = [...state.interes]
      interes.splice(findIndex, 1)
      return { ...state, interes: [...interes] }
    case 'INIT_SEARCH':
      return { ...state, search: [...action.payload] }
    case 'STATUS_SEARCH':
      return { ...state, statusSearch: action.payload }
    default:
      return state;
  }
}

export default userReducer
