import React from 'react'
import { IoFolderOpenSharp } from 'react-icons/io5';

const Folder = ({folder}) => {
  return (
    <div>
      <div className='column__header'>
        {/* <IoFolderOpenSharp className='column__folder-icon' size={'150'} /> */}
        <div className='column__folder-name'>{folder}</div>
      </div>
      <div className='column__details'>
      </div>
    </div>
  )
}

export default Folder