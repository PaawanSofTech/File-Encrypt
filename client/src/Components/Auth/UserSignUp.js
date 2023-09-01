import React, {useState} from 'react'
import { convToBase64 } from '../Helpers/convToBase64';
import './UserSignUp.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
const UserSignUp = ({contract}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [buttonText, setButtonText] = useState('Upload your profile image');
  const onChangeProfilePict = async (e) => {
    if(e?.target?.files[0]){
      setImage()
      // setButtonText('Loading...')
      const dataPict = await convToBase64(e.target.files[0])
      setImage(dataPict)
      setButtonText('Remove image')
    }else{
      setImage('')
    }
} 
  const onSubmit = async(e) =>{
    e.preventDefault()
    try {
      const num = Number(contactNum);
      const res = await contract.createUser(date,num,name,image); 
      console.log("Response",res);
    } catch (error) {
      console.log("Error",error);
    } 
  }
  return (
    <div className='user-registration'>
        <form className='form' onSubmit={e=>onSubmit(e)}>
          <div className='form__input'>
            <label for='name' className='form__input--label'>Enter your name</label>
            <input 
              required 
              className='form__input--name' 
              id='name' 
              type='text' 
              placeholder='Name'
              value={name}
              autoComplete={'off'}
              onChange={(e)=>setName(e.target.value)}
          />
          </div>
          
          <div className='form__input'>
            <label for='date' className='form__input--label'>Enter your DOB</label>
            <input 
              required 
              className='form__input--date' 
              id='date' 
              type='date' 
              defaultValue={''}
              placeholder='DOB' 
              autoComplete={'off'}

              value={date}
              onChange={(e)=>setDate(e.target.value)}
            />
          </div>
          <div className='form__input'>
            <label for='number' className='form__input--label'>Enter your phone number</label>
            <PhoneInput 
              inputStyle={{ backgroundColor: '#0a2c3f' }}
              dropdownStyle={{ backgroundColor: '#0a2c3f' }}
              buttonStyle={{ backgroundColor: '#0a2c3f' }}
              country={'in'}
              className='form__input--contactnum' 
              id='number' 
              type='number' 
              autoComplete={'off'}

              placeholder='Phone number'
              value={contactNum}
              onChange={(phone)=>setContactNum(phone)}
            />
          </div>
          <div className='form__input form__input--upload-image'>
            {image ? <>
              <img src={image} alt='Profile pic' className='form__input--profile-pict'/>
            </>:<>
            </>}
            {buttonText === 'Upload your profile image' ? <>
              <label for='image' className='form__input--label-upload '>{buttonText}</label>
            </> : <>
              <button for='image' className='form__input--label-remove' onClick={(e)=>{
                e.preventDefault()
                onChangeProfilePict()
                setButtonText('Upload your profile image')
                }}>{buttonText}</button>
            </>}
            <input 
              // required 
              className='form__input--image' 
              id='image' 
              type='file' 
              accept='image/*' 
              autoComplete={'off'}
              onChange={(e)=>onChangeProfilePict(e)}
              hidden={true}
            />
          </div>

          <div className='form__submit'>
            <button className='form__submit--btn'>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default UserSignUp
