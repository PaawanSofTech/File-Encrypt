import React, {useState} from 'react'
import './CompanySignUp.scss'
import {convToBase64} from '../Helpers/convToBase64.js'

const CompanySignUp = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [regId, setRegId] = useState('');
  const [contactNum, setContactNum] = useState('');
  const onChangeProfilePict = async (e) => {
    setImage()
    const dataPict = await convToBase64(e.target.files[0])
    setImage(dataPict)    
} 
  const onSubmit = (e) =>{
    e.preventDefault()
    let newCompany = {
      Name: name,
      Image: image,
      Phone: contactNum,
      RegistrationId: regId
    }
    console.log(newCompany)
    //axios request to post 
  }
  return (
    <div className='company-registration'>
        <h1>Company registration!</h1>
        <form className='form' onSubmit={e=>onSubmit(e)}>
          <div className='form__input'>
            <label for='name' className='form__input--label'>Enter company's name</label>
            <input className='form__input--name' id='name' type='text' onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className='form__input'>
            <label for='image' className='form__input--label'>Upload your company's image</label>
            <img src={image} alt='Profile pic' className='form__input--profile-pict'/>
            <input className='form__input--image' id='image' type='file' accept='image/*' onChange={(e)=>onChangeProfilePict(e)}/>
          </div>
          <div className='form__input'>
            <label for='regId' className='form__input--label'>Enter your company's Registration ID</label>
            <input className='form__input--reg' id='regId' type='text' onChange={(e)=>setRegId(e.target.value)}/>
          </div>
          <div className='form__input'>
            <label for='number' className='form__input--label'>Enter your company's phone number</label>
            <input className='form__input--contactnum' id='number' type='number' onChange={(e)=>setContactNum(e.target.value)}/>
          </div>
          <button>Submit</button>
        </form>
    </div>
  )
}

export default CompanySignUp
