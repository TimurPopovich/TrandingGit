import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import OneCard from '../OneCard/OneCard'
import './module.savedTrand.css'

function SavedTrand() {

  const user = useSelector(state => state.user)
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user.isAuth === false) {
      history.push('/')
    }
  })

  return (
    <>
      <div id="profileUser" className="container">

        <div className='divProfileNamePage'>
          <h1>Сохранённые</h1>
        </div>

        <div id="containerCardProfile" className="findCardProfile uiInputContainerProfile">

          {user?.interes?.length === 0 ? <h3>Нет сохранённых записей</h3> : null}
          {user?.interes?.map(el => <OneCard key={el.url} info={el} />)}

        </div>
      </div>
    </>
  )
}

export default SavedTrand
