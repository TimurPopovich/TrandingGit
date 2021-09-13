import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { registerThunk } from '../../redux/thunks/registerThunk'

function Register() {

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const registerHendler = (event) => {
    event.preventDefault()

    if (event.target.pass.value.length === 0) {
      event.target.pass.placeholder = 'Введите пароль'
    } else if (event.target.email.value.length === 0) {
      event.target.email.placeholder = 'Введите Почту'
    } else if (event.target.pass2.value.length === 0) {
      event.target.pass2.placeholder = 'Введите пароль повторно'
    } else if (event.target.pass2.value !== event.target.pass.value) {
      event.target.pass2.value = ''
      event.target.pass.value = ''
      event.target.pass.placeholder = 'Пароли не совпадают'
      event.target.pass2.placeholder = 'Пароли не совпадают'
    } else {

      const logInfo = {
        email: event.target.email.value,
        password: event.target.pass.value,
      };

      dispatch(registerThunk(logInfo))

      history.push('/profile')

    }
  }

  useEffect(() => {
    if (user.isAuth === true) {
      history.push('/')
    }
  })

  return (
    <>
      <h1 id='logH1'>Регистрация</h1>
      <div id="wrapper">
        <form onSubmit={(event) => registerHendler(event)} id="signin" method="" action="" autoComplete="off">
          <input type="text" id="user" name="email" placeholder="Почта" />
          <input type="password" id="pass" name="pass" placeholder="Пароль" />
          <input type="password" id="pass2" name="pass2" placeholder="Подтвердите пароль" />
          <button id='btnReg' type="submit">&#xf0da;</button>
        </form>
      </div>
    </>
  )
}

export default Register
