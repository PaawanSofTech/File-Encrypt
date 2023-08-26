import React from 'react'
import './Documents.scss'

const Documents = () => {
  return (
    <div className='documents'>
        <div className='documents__column'>
          <div className='document__column--header'>
            <div className='document__column__header--title'>Document 1</div>
            <img className='document__column--header--icon' src={require('../../pdf-file-document-red-icon-png-11664499159d22efvkxoy.png')}/>
          </div>
          <div className='document__column--content'></div>
        </div>
        <div className='documents__column'>
          <div className='document__column--header'>
            <div className='document__column__header--title'>Document 2</div>
            <img className='document__column--header--icon' src={require('../../pdf-file-document-red-icon-png-11664499159d22efvkxoy.png')}/>
          </div>
          <div className='document__column--content'></div>
        </div>
        <div className='documents__column'>
          <div className='document__column--header'>
            <div className='document__column__header--title'>Document 3</div>
            <img className='document__column--header--icon' src={require('../../pdf-file-document-red-icon-png-11664499159d22efvkxoy.png')}/>
          </div>
          <div className='document__column--content'></div>
        </div>
        <div className='documents__column'>
          <div className='document__column--header'>
            <div className='document__column__header--title'>Document 4</div>
            <img className='document__column--header--icon' src={require('../../pdf-file-document-red-icon-png-11664499159d22efvkxoy.png')}/>
          </div>
          <div className='document__column--content'></div>
        </div>
    </div>
  )
}

export default Documents
