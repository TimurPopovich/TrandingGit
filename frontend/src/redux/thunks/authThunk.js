import { initUser } from "../slices/userSlice";

export const authThunk = () => {
  return (dispatch) => {
    fetch('/auth', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.message) {
          throw new Error(data.message)
        } else return data
      })
      .then((data) => dispatch(initUser(data)))
      .then((data) => localStorage.setItem("token", data.payload.token))
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
      });
  }
}

