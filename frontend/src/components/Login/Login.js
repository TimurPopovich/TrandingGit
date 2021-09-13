import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginThunk } from '../../redux/thunks/loginThunk';

function Login() {

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const loginHendler = (event) => {
    event.preventDefault()

    if (event.target.password.value.length === 0) {
      event.target.password.placeholder = 'Введите пароль'
    } else if (event.target.email.value.length === 0) {
      event.target.email.placeholder = 'Введите Почту'
    } else {

      const logInfo = {
        email: event.target.email.value,
        password: event.target.password.value,
      };

      dispatch(loginThunk(logInfo))

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
      <h1 id='logH1'>Войти</h1>
      <div id="wrapper">
        <form onSubmit={(event) => { loginHendler(event) }} id="signin" method="" action="">
          <input type="text" id="user" name="email" placeholder="Почта" />
          <input type="password" id="pass" name="password" placeholder="Пароль" />
          <button type="submit">&#xf0da;</button>
        </form>
      </div>
    </>
  )
}

export default Login
