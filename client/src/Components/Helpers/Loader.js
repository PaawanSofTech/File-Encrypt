import React from 'react'
import {ImSpinner2} from 'react-icons/im';
import './Loader.scss'
const Loader = () => {
  return (
    <div className='loader'>
        <div className='loader__text'>
        Loading 
        </div>
        <div className='loader__spinner' style={{ transform: 'translateY(1px)'}}>
        <ImSpinner2/>

        </div>
    </div>
  )
}

export default Loader
