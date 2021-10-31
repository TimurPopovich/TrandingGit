import { deleteCard } from "../slices/userSlice"

export default function deleteCardThunk(info, user) {
  return (dispatch) => {
    fetch('/card', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rep: info,
        user: user
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.message) {
          dispatch(deleteCard(info))
        }
      })
      .catch(err => console.log(err))
  }
}
