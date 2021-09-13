import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {

  const user = useSelector(state => state.user)

  return (
    <div id="profileUser" className="container">

      <div id="profileIcon" className="d-flex flex-column align-items-center p-2 bd-highlight">

        <h2>{user.email}</h2>
      </div>

      {/* <img alt='' src="avatar.jpg"
        className="img_profile" /> */}

      <div id="formUpload" className="hide">
        {/* <form id="formUploadSubmit" action="/profile/foto" method="post" enctype="multipart/form-data">
          <input type="file" name="pictures" />
          <button type="submit" class="btn btn-success">Success</button>
        </form> */}
      </div>

    </div>
  )
}

export default Profile
