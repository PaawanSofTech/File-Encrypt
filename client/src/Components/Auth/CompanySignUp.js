import React, {useState} from 'react'
import './CompanySignUp.scss'
import {convToBase64} from '../Helpers/convToBase64.js'

const CompanySignUp = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [regId, setRegId] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [buttonText, setButtonText] = useState("Upload your company's image");

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
        <form className='form' onSubmit={e=>onSubmit(e)}>
        <div className='form__input'>
            <label for='name' className='form__input--label'>Enter your Company's name</label>
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
          <label for='regId' className='form__input--label'>Enter your company's Registration ID</label>
          {/* <input required  id='regId' type='text'  /> */}

            <input 
              required 
              className='form__input--reg'
              id='name' 
              type='text' 
              placeholder='Registration Id'
              value={regId}
              autoComplete={'off'}
              onChange={(e)=>setRegId(e.target.value)}
          />
          </div>
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
          {/* <div className='form__input'>
            <label for='image' className='form__input--label'>Upload your company's image</label>
            <img src={image} alt='Profile pic' className='form__input--profile-pict'/>
            <input required className='form__input--image' id='image' type='file' accept='image/*' onChange={(e)=>onChangeProfilePict(e)} />
          </div> */}
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
              required 
              className='form__input--image' 
              id='image' 
              type='file' 
              accept='image/*' 
              autoComplete={'off'}
              onChange={(e)=>onChangeProfilePict(e)}
              hidden={true}
            />
          </div>
          <div className='form__input'>
          </div>
          <div className='form__input'>
            <label for='number' className='form__input--label'>Enter your company's phone number</label>
            <input required className='form__input--contactnum' id='number' type='number' placeholder="Company's contact number" onChange={(e)=>setContactNum(e.target.value)}/>
          </div>
          <div className='form__submit'>
            <button className='form__submit--btn'>Submit</button>
          </div>
        </form>
        {/* <form className='form' onSubmit={e=>onSubmit(e)}>
          
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
              required 
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
        </form> */}
    </div>
  )
}

export default CompanySignUp
