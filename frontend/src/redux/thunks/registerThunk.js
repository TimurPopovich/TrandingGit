import { initUser } from "../slices/userSlice"

export const registerThunk = (newUser) => {
  return function (dispatch) {
    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUser })
    })
      .then(res => res.json())

      .then(data => {
        if (data.message) {
          throw new Error(data.message)
        } else return data

      })
      .then(data => dispatch(initUser(data)))
      .then(data => localStorage.setItem('token', data.payload.token))
      .catch((error) => console.log(error))
  }
}
