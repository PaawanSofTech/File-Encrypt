import React from 'react'

const Homepage = () => {
  //Use effect to get the logged in details, to accordingly load user and company homepage
  return (
    <div>
      <div className='navbar' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
        <div className='navbar__left'></div>
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
