import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './module.sideBar.css'

function Sidebar() {

  const user = useSelector(state => state?.user)

  const divSidebar = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  const sidebarClick = () => {
    divSidebar.current.classList.toggle('active')
  }

  const logoClick = () => {
    history.push('/')
  }

  const logOut = () => {
    dispatch({ type: "USER_LOGOUT" })
    history.push('/')
  }

  return (
    <div ref={divSidebar} className="sidebar">
      <div className='logo_content'>
        <div onClick={() => logoClick()} className='logo'>
          <img className="logo_git" alt='' src='favicon.ico'></img>
          <div className='logo_name'>Tranding Git</div>
        </div>
        <i className='bx bx-menu' id='btn' onClick={sidebarClick}></i>
      </div>
      <ul>
        <li>
          <Link to='/'>
            <i className='bx bx-grid-alt' ></i>
            <span className='links_name'>Главная</span>
          </Link>
        </li>
        {user.isAuth ?
          <>
            <li>
              <Link to='/profile'>
                <i className='bx bxs-user'></i>
                <span className='links_name'>Профиль</span>
              </Link>
            </li>
            <li>
              <Link to='/saved'>
                <i className='bx bx-heart' ></i>
                <span className='links_name'>Сохранённое</span>
              </Link>
            </li>
            <li>
              <Link to='/setting'>
                <i className='bx bx-cog' ></i>
                <span className='links_name'>Настройки</span>
              </Link>
            </li>
          </>
          :
          <>
            <li>
              <Link to='/login'>
                <i className='bx bx-log-in'></i>
                <span className='links_name'>Войти</span>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <i className='bx bx-registered'></i>
                <span className='links_name'>Регистрация</span>
              </Link>
            </li>
          </>
        }
      </ul>
      {user.isAuth ?
        <div className='profile_content'>
          <div className='profile'>
            <div className='profile_details'>
              <div className='name_job'>
                <div className='name'>{user.email}</div>
              </div>
            </div>

            <i onClick={() => { logOut() }} className='bx bx-log-out' id='log_out' ></i>
          </div>
        </div>
        : null}
    </div>
  )
}

export default Sidebar
