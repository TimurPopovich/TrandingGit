const initialState = {
  isAuth: false,
  id: null,
  email: null,
  interes: []
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT_USER':
      return { ...state, id: action.payload.id, isAuth: true, email: action.payload.email, interes: action.payload.interes }
    case 'USER_LOGOUT':
      localStorage.removeItem('token');
      return initialState
    case 'SAVE_CARD':
      return { ...state, interes: [...state.interes, action.payload] }
    case 'DELETE_CARD':
      const findIndex = state.interes.findIndex(el => el.url === action.payload.url)
      const interes = [...state.interes]
      interes.splice(findIndex, 1)
      return { ...state, interes: [...interes] }
    default:
      return state;
  }
}

export default userReducer
