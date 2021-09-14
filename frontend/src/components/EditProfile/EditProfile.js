import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { editProfileThunk } from '../../redux/thunks/editProfileThunk';
import './module.editProfile.css'

function EditProfile() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const [active, setActive] = useState(false)
  const [active2, setActive2] = useState(false)

  const [modalActive, setModalActive] = useState(false)
  const [modalInfo, setModalInfo] = useState({
    message: null,
    status: null
  })

  const history = useHistory()

  function pushMain() {
    history.push('/')
  }

  const formHandler = (e) => {
    e.preventDefault()

    const info = {
      id: user.id,
      email: e.target[0].value,
      password: e.target[1].value
    }

    dispatch(editProfileThunk(info, history, setModalActive, setModalInfo))

  }

  function handleTextChange(text) {
    setValue(text);

    if (text !== '') {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  function handleTextFocus() {
    setActive(true);
  }

  function handleTextBlur(text) {
    if (text === '') {
      setActive(false);
    }
  }

  function handleTextChange2(text) {
    setValue2(text);

    if (text !== '') {
      setActive2(true);
    } else {
      setActive2(false);
    }
  }

  function handleTextFocus2() {
    setActive(true);
  }

  function handleTextBlur2(text) {
    if (text === '') {
      setActive(false);
    }
  }

  return (
    <div id="editContainerProfile">

      <div className='backDiv'>

        <div id="editDiv" className='form-wrapper'>

          <h2 id="h2Edit">Редактор</h2>

          <form onSubmit={(e) => { formHandler(e) }} id="editForm" autoComplete='off' >

            <div className="form-group">
              <label htmlFor="exampleInputEmail" className={active ? "focus form-label" : "form-label"}>Почта</label>
              <input onFocus={() => handleTextFocus()} onBlur={(e) => { handleTextBlur(e.target.value) }} onChange={(e) => handleTextChange(e.target.value)} autoComplete='new-password' value={value} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>

            <br />

            <div className="form-group">
              <label htmlFor="exampleInputPass" className={active2 ? "focus form-label" : "form-label"}>Пароль</label>
              <input onFocus={() => handleTextFocus2()} onBlur={(e) => { handleTextBlur2(e.target.value) }} onChange={(e) => handleTextChange2(e.target.value)} autoComplete='new-password' value={value2} name="password" type="password" className="form-control" id="exampleInputPassword1" />
            </div>

            <button id="newDataPerson" type="submit" className="btn btn-primary">Изменить</button>

          </form>

          <button onClick={() => { pushMain() }} id="newDataPerson2" type="submit" className="btn btn-primary">Отменить</button>

        </div>

      </div>

      {modalActive ?
        <div className="hystmodal" id="myModal" aria-hidden="true" >
          <div className="hystmodal__wrap">
            <div className="hystmodal__window" role="dialog" aria-modal="true" >
              <button className='newDataPerson2' onClick={() => { setModalActive(false) }} data-hystclose >Закрыть</button>
              <h2>{modalInfo.status}</h2>
              <p>{modalInfo.message}</p>
              <hr />
              <p>Через 3 секунды окно закроется</p>
            </div>
          </div>
        </div>
        : null}
    </div>
  )
}

export default EditProfile
