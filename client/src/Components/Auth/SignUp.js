import React, { useState } from 'react'
import UserSignUp from './UserSignUp.js'
import CompanySignUp from './CompanySignUp.js'
import './SignUp.scss'
const SignUp = ({contract,accounts,provider}) => {
    const [isUser, setIsUser] = useState(true);
    const [isCompany, setIsCompany] = useState(false);
    return (
        <div className='sign-up'>
            <div className='sign-up__header'>
              {isUser ? <>
                <button 
                  className='sign-up__user' 
                  onClick={()=>{
                    setIsUser(true)
                    setIsCompany(false)
                  }}
                >
                  <h2 className='sign-up__user--header'
                  style={{
                    width: '100%',
                    borderBottom: '3.5px solid rgb(36, 148, 184)',
                    color: 'white',
                    display: 'flex',
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  transition: 'all .1s',
                  }}>User registration</h2>
                </button>
              </> : <>
              <button 
                  className='sign-up__user' 
                  onClick={()=>{
                    setIsUser(true)
                    setIsCompany(false)
                  }}
                >
                  <h2 className='sign-up__user--header'>User registration</h2>
                </button>
              </>}
              {isCompany ? <>
                <button 
                  className='sign-up__company' 
                  onClick={()=>{
                    setIsUser(false)
                    setIsCompany(true)
                  }}
                >
                    <h2 className='sign-up__company--header' 
                      style={{
                        width: '100%',
                        borderBottom: '3.5px solid rgb(36, 148, 184)',
                        color: 'white',
                        display: 'flex',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'all .1s',
                      }}
                      >
                      Company registration</h2>
                </button>
              </> : <>
                <button 
                  className='sign-up__company' 
                  onClick={()=>{
                    setIsUser(false)
                    setIsCompany(true)
                  }}                  
                >
                    <h2 className='sign-up__company--header'>Company registration</h2>
                </button>
              </>}
            </div>
            <div className='sign-up__form'>
                {isUser ? <UserSignUp contract={contract}/>: <></>}
                {isCompany ? <CompanySignUp provider={provider} accounts={accounts} contract={contract} />: <></>}
            </div>
        </div>

  )
}

export default SignUp;
