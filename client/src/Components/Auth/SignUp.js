import React, { useState } from 'react'
import UserSignUp from './UserSignUp.js'
import CompanySignUp from './CompanySignUp.js'
import './SignUp.scss'
const SignUp = () => {
    const [isUser, setIsUser] = useState(true);
    const [isCompany, setIsCompany] = useState(false);
    return (
        <div className='sign-up'>
            <div className='sign-up__header'>
                <div className='sign-up__user' onClick={()=>{
                    setIsUser(true)
                    setIsCompany(false)
                }}>
                    <h2 className='sign-up__user--header'>User registration</h2>
                </div>
                <div className='sign-up__company' onClick={()=>{
                    setIsUser(false)
                    setIsCompany(true)
                }}>
                    <h2 className='sign-up__company--header'>Company registration</h2>
                </div>
            </div>
            <div className='sign-up__form'>
                {isUser ? <UserSignUp/>: <></>}
                {isCompany ? <CompanySignUp/>: <></>}
            </div>
        </div>
  )
}

export default SignUp;
