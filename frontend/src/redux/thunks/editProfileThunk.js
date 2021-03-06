import { editUser } from "../slices/userSlice";

export const editProfileThunk = (info, history, setModalActive, setModalInfo) => {
  return (dispatch) => {
    fetch('/user', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info })
    })
      .then((res) => res.json())
      .then(data => {
        if (data.message) {
          throw new Error(data.message)
        } else if (data.status && data.status === 'Старый пароль') {
          setModalActive(true)
          setModalInfo({ message: data.status, status: 'Ошибка' })
          setTimeout(() => {
            setModalActive(false)
          }, 3000)
        } else if (data.status && data.status === 'Почта занята') {
          setModalActive(true)
          setModalInfo({ message: data.status, status: 'Ошибка' })
          setTimeout(() => {
            setModalActive(false)
          }, 3000)
        } else {
          setModalActive(true)
          setModalInfo({ status: 'Выполнено' })
          setTimeout(() => {
            history.push('/')
          }, 3000)
          return data
        }
      })
      .then((data) => dispatch(editUser(info.email)))
      .catch((error) => {
        alert(`${error.message}`)
      });
  }
}
