import React, { useEffect, useRef, useState } from 'react'
import autoComplete from '@tarekraafat/autocomplete.js'
import DownloadVisual from '../DownloadVisual/DownloadVisual'
import OneCard from '../OneCard/OneCard'
import { useDispatch, useSelector } from 'react-redux'
import './module.homeContent.css'
import { initSearch, statusSearch } from '../../redux/slices/userSlice'

function HomeContent() {

  const containerCard = useRef()
  const spokenLanguageSymbol = useRef()
  const languagePrograming = useRef()
  const period = useRef()

  const search = useSelector(state => state.user?.search)
  const status = useSelector(state => state.user?.statusSearch)
  const dispatch = useDispatch()

  const [statusSearchLocal, setStatusSearchLocal] = useState(true)
  const [language, setLanguage] = useState([])

  async function findRepositories(languagePrograming = 'JavaScript', period = 'deily', spokenLanguage = 'ru') {
    const path = `language=${languagePrograming}&period=${period}&spokenLanguage=${spokenLanguage}`

    const response = await fetch(`https://api.trending-github.com/github/repositories?${path}`);

    const result = await response.json();

    if (result.length === 0 || result === 'Unknown language') {
      setStatusSearchLocal(false)
    } else dispatch(initSearch(result))

  }

  async function mainTrand() {

    setStatusSearchLocal(true)

    const response = await fetch(`https://api.trending-github.com/github/repositories?language=&period=&spokenLanguage=`);

    const result = await response.json();

    return result
  }

  function submitBtn(event) {

    setStatusSearchLocal(true)
    dispatch(initSearch([]))

    event.preventDefault();

    if (spokenLanguageSymbol.current.value === undefined || spokenLanguageSymbol.current.value.length === 0) { spokenLanguageSymbol.current.value = 'Russian'; }

    const newArray = language.filter(el => el.language === spokenLanguageSymbol.current.value);

    let spokenLanguage = 'ru';

    if (newArray.length !== 0) {

      spokenLanguage = newArray[0].code

    }

    if (period.current.value === '') {

      period.current.value = 'deily'

    }

    if (languagePrograming.current.value === 'C++') {

      languagePrograming.current.value = 'C'

    } else if (languagePrograming.current.value === '') {

      languagePrograming.current.value = 'JavaScript'

    }

    findRepositories(languagePrograming.current.value, period.current.value, spokenLanguage)

  }

  async function deleteBtn(event) {

    event.preventDefault()

    languagePrograming.current.value = ''
    period.current.value = ''
    spokenLanguageSymbol.current.value = ''


    dispatch(initSearch([]))

    const result = await mainTrand()

    if (result.length !== 0) dispatch(initSearch(result))
    if (result.length === 0) setStatusSearchLocal(false)
  }

  async function spokenLanguageFunc(cleanupFunction) {

    const response = await fetch('/infoGit');

    if (window.location.pathname === '/') {

      const result = await response.json();

      if (!cleanupFunction) setLanguage([...result.spokenLanguage])

      const autoCompleteJS1 = new autoComplete({
        placeHolder: "???????????????? ???????? ????????...",
        data: {
          src: result.spokenLanguage,
          cache: true,
          keys: ['language'],
        },
        resultsList: {
          element: (list, data) => {
            if (!data.results.length) {
              // ???????????????? ???????????????? ?????? ??????????????????????
              const message = document.createElement("div");
              // ???????????????????? ?? ???????? ????????????
              message.setAttribute("className", "no_result");
              // ?????????????????? ?????????????????? ??????????????????
              message.innerHTML = `<span> ???? ?????????????? ???????????????????????? ?????? "${data.query}"</span>`;
              // ?????????????????? ?? ???????? ??????????????????????
              list.prepend(message);
            }
          },
          noResults: true,
          tabSelect: true,
        },
        resultItem: {
          highlight: true,
        },
        events: {
          input: {
            focus: () => {
              if (autoCompleteJS1.input.value.length) {
                autoCompleteJS1.start()
              };
            }
          }
        }
      });

      autoCompleteJS1.input.addEventListener("selection", function (event) {
        const feedback = event.detail;

        autoCompleteJS1.input.blur();

        const selection = feedback.selection.value[feedback.selection.key];

        autoCompleteJS1.input.value = selection;
      });

      const autoCompleteJS2 = new autoComplete({
        placeHolder: "???????? ????????????????????????????????...",
        data: {
          src: result.language,
          cache: true,
        },
        selector: "#autoComplete2",
        resultsList: {
          element: (list, data) => {
            if (!data.results.length) {
              // Create "No Results" message element
              const message = document.createElement("div");
              // Add class to the created element
              message.setAttribute("class", "no_result");
              // Add message text content
              message.innerHTML = `<span> ???? ?????????????? ???????????????????????? ?????? "${data.query}"</span>`;
              // Append message element to the results list
              list.prepend(message);
            }
          },
          noResults: true,
          tabSelect: true,
        },
        resultItem: {
          highlight: true
        },
        events: {
          input: {
            focus: () => {
              if (autoCompleteJS2.input.value.length) {
                autoCompleteJS2.start()
              };
            }
          }
        }
      });

      autoCompleteJS2.input.addEventListener("selection", function (event) {
        const feedback = event.detail;

        autoCompleteJS2.input.blur();

        const selection = feedback.selection.value;

        autoCompleteJS2.input.value = selection;
      });

      const autoCompleteJS3 = new autoComplete({
        placeHolder: "?????????? ????????????...",
        data: {
          src: ['daily', 'weekly', 'monthly'],
          cache: true,
        },
        selector: "#autoComplete3",
        resultsList: {
          element: (list, data) => {
            if (!data.results.length) {
              // Create "No Results" message element
              const message = document.createElement("div");
              // Add class to the created element
              message.setAttribute("class", "no_result");
              // Add message text content
              message.innerHTML = `<span> ???? ?????????????? ???????????????????????? ?????? "${data.query}"</span>`;
              // Append message element to the results list
              list.prepend(message);
            }
          },
          noResults: true,
          tabSelect: true,
        },
        resultItem: {
          highlight: true
        },
        events: {
          input: {
            focus: () => {
              if (autoCompleteJS3.input.value.length) {

                autoCompleteJS3.start()
              };
            }
          }
        }
      });

      autoCompleteJS3.input.addEventListener("selection", function (event) {
        const feedback = event.detail;

        autoCompleteJS3.input.blur();

        const selection = feedback.selection.value;

        autoCompleteJS3.input.value = selection;
      });
    }

  }

  useEffect(() => {
    let cleanupFunction = false;

    spokenLanguageFunc(cleanupFunction);
  }, [])

  useEffect(() => {
    let cleanupFunction = false;

    if (!status) {

      mainTrand().then(result => {
        if (result.length === 0 && !cleanupFunction) setStatusSearchLocal(false)

        if (result.length !== 0 && !cleanupFunction) {
          dispatch(initSearch(result))
          dispatch(statusSearch(true))
        }
      })

    }

    return () => cleanupFunction = true

  }, [dispatch, status, statusSearchLocal])

  return (
    <div id="uiContainer">

      <div className="textContent is-center">
        <h1 className='h1-main'>
          ?????????? ???????????? ???????????? ?? github?
        </h1>
      </div>

      <div className="uiInputContainer">

        <form id="searchForm">

          <div className="autoComplete_wrapper ui">
            <input ref={spokenLanguageSymbol} className="inputAll" type="search" dir="ltr" spellCheck='false' autoCorrect="off" autoComplete="off"
              autoCapitalize="off" id="autoComplete" />
          </div>

          <hr />

          <div className="ui">

            <div className="autoComplete_wrapper">
              <input ref={languagePrograming} className="inputAll" type="search" dir="ltr" spellCheck='false' autoCorrect="off" autoComplete="off"
                autoCapitalize="off" id="autoComplete2" />
            </div>

          </div>

          <hr />

          <div className="ui">

            <div className="autoComplete_wrapper">
              <input ref={period} className="inputAll" type="search" dir="ltr" spellCheck='false' autoCorrect="off" autoComplete="off"
                autoCapitalize="off" id="autoComplete3" />
            </div>

          </div>
          <div id="containerBtnSearch">

            <button onClick={(event) => submitBtn(event)} id="btnSearch" type="submit" className="btn btn-success">??????????</button>
            <button onClick={(event) => deleteBtn(event)} type="submit" className="btn btn-delete">????????????????</button>

          </div>
        </form>

      </div>

      <div ref={containerCard} id="containerCard" className="findCard uiInputContainer">

        {search.length === 0 && statusSearchLocal === true ? <DownloadVisual /> : search.map(el => {
          return <OneCard key={el.url} info={el} />
        })}

        {statusSearchLocal === false && search.length === 0 ? <h1>???????????????????? ???? ??????????????</h1> : null}

      </div>

    </div>
  )
}

export default HomeContent
