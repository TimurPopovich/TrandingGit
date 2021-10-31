import { saveCard } from "../slices/userSlice"

export default function savedCardThunk(info, user) {
  return (dispatch) => {
    fetch('/card', {
      method: 'POST',
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
          dispatch(saveCard(info))
        }
      })
      .catch(err => console.log(err))
  }
}
