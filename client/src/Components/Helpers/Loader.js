import React from 'react'
import {ImSpinner2} from 'react-icons/im';
import './Loader.scss'
const Loader = () => {
  return (
    <div className='loader' style={{
      // marginTop: '4rem'
    }}>
        <div className='loader__text'>
        Loading 
        </div>
        <div className='loader__spinner' style={{ }}>
        <ImSpinner2/>

        </div>
    </div>
  )
}

export default Loader
