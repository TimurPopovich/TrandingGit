import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import deleteCardThunk from '../../redux/thunks/deleteCardThunk'
import savedCardThunk from '../../redux/thunks/saveCardThunk'
import './module.oneCard.css'

function OneCard({ info }) {
  const user = useSelector(state => state.user)

  const btn = useRef()

  const dispatch = useDispatch()

  const findRep = user.interes.findIndex(el => el.url === info.url)

  const openLink = () => {
    window.open(info?.url)
  }

  const inputHandlerSetting = async () => {

    if (btn.current.innerText === 'В Избранное') {
      dispatch(savedCardThunk(info, user))
    } else {
      dispatch(deleteCardThunk(info, user))
    }

  }


  return (
    <div data-link={info?.url} className="Onecard">

      <div onClick={() => { openLink() }}>
        <div data-link={info?.url} className="cardHeader">{info?.name}</div>
        <div data-link={info?.url} className="cardNick">{info?.author}</div>
        <div data-link={info?.url} className="cardBody"><img alt='#' src={info.avatar ? info.avatar : "anon.png"} className="uiImg" />{info?.description}</div>
      </div>

      <div data-link={info?.url} className="cardFooter">
        <p onClick={() => { openLink() }}>
          {info?.stars}
          <i className="iconStar">⭐</i>
          {info?.forks}
          <i>🔗</i><br />
          {info.language ? 'Developped in ' + info?.language : 'No language related'}
        </p>

        {user.isAuth ? <p className='btnAdd_Delete'><button ref={btn} onClick={() => { inputHandlerSetting() }} id={findRep === -1 ? "btnAdd" : "btnDelete"} className="btn btn-danger">{findRep === -1 ? "В Избранное" : "Удалить"}</button></p> : null}

      </div>

    </div>
  )
}

export default OneCard
