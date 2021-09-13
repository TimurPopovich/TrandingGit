import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>

      <div id="profileUser" className="container">
        <h1>404 - Не найдено!</h1>
        <Link to="/">
          На главную
        </Link>
      </div>
    </>
  )
}

export default NotFound
