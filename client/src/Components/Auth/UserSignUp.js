import React, {useState} from 'react'
import { convToBase64 } from '../Helpers/convToBase64';
import './UserSignUp.scss'
const UserSignUp = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [contactNum, setContactNum] = useState('');
  const onChangeProfilePict = async (e) => {
    setImage()
    const dataPict = await convToBase64(e.target.files[0])
    setImage(dataPict)    
} 
  const onSubmit = (e) =>{
    e.preventDefault()
    let newUser = {
      Name: name,
      Image: image,
      Phone: contactNum,
      DOB: date
    }
    console.log(newUser)
    //axios request to post 
  }
  return (
    <div className='user-registration'>
        <h1>User registration!</h1>
        <form className='form' onSubmit={e=>onSubmit(e)}>
          <div className='form__input'>
            <label for='name' className='form__input--label'>Enter your name</label>
            <input className='form__input--name' id='name' type='text' onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className='form__input'>
            <label for='image' className='form__input--label'>Upload your profile image</label>
            <img src={image} alt='Profile pic' className='form__input--profile-pict'/>
            <input className='form__input--image' id='image' type='file' accept='image/*' onChange={(e)=>onChangeProfilePict(e)}/>
          </div>
          <div className='form__input'>
            <label for='date' className='form__input--label'>Enter your DOB</label>
            <input className='form__input--date' id='date' type='date' onChange={(e)=>setDate(e.target.value)}/>
          </div>
          <div className='form__input'>
            <label for='number' className='form__input--label'>Enter your phone number</label>
            <input className='form__input--contactnum' id='number' type='number' onChange={(e)=>setContactNum(e.target.value)}/>
          </div>
          <button>Submit</button>
        </form>
    </div>
  )
}

export default UserSignUp
