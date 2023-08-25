import React from 'react'
import './Homepage.scss'
const Homepage = () => {
  //Use effect to get the logged in details, to accordingly load user and company homepage
  return (
    <div>
      <div className='navbar'>
        <div className='navbar__center'>
          <h1 className='navbar__center--brand'>Group Project</h1>
        </div>
        <div className='navbar__right'>
          <button className='navbar__right--edit'>
            Edit details
          </button>
          <button className='navbar__right--connect'>
            Connect
          </button>
        </div>
      </div>


    </div>
  )
}

export default Homepage
