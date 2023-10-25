import React, { useEffect, useState } from "react";
import "./CompanyCard.scss";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Card = ({contract,inputAddress,closeModal}) => {
  var [name, setName] = useState(false);
  var [phone, setPhone] = useState(false);
  var [dob, setDOB] = useState(false);
  var [address, setAddress] = useState(false);
  var [image, setImage] = useState(false);

  var [medical, setMedical] = useState(false);
  var [academics, setAcademics] = useState(false);
  var [bank, setBank] = useState(false);

  // On submit request
  const onSubmit = async(e) =>{
    e.preventDefault()
    try {
      const res = await contract.requestDetails(inputAddress,dob,phone,name,image,[medical,academics,bank]);
      console.log("res",res);
      closeModal();

    } catch (error) {
      console.log("error",error);
    }
    console.log('send')
  }
  return (
    <div className="company_card">
      <div className="header">
        <h1>User name</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="basic_details">
          <div className="name">
            <label for='name' className="label_name">Name</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                name = !name;
                setName(name);
                console.log(name);
              }}/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="dob">
            <label for='dob' className="label_dob">DOB</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                dob = !dob;
                setDOB(dob);
                console.log(dob);
              }} />
              <span class="slider"></span>
            </label>          
          </div>
          <div className="address">
            <label for='address' className="label_address">Address</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                address = !address;
                setAddress(address);
                console.log(address);
              }}/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="phone">
            <label for='phone' className="label_phone">Phone </label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                phone = !phone;
                setPhone(phone);
                console.log(phone);
              }}/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="image">
            <label for='image' className="label_image">Profile image</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                image = !image;
                setImage(image);
                console.log(image);
              }}/>
              <span class="slider"></span>
            </label>          
          </div>
        </div>
        <div className="folder_details">
          <div style={{transform: 'translateX(-20px)'}}>Folders</div>
          <div>
            <label for='med' className="label_image">Medical</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                medical = !medical;
                setMedical(medical);
                console.log(medical);
              }}/>
              <span class="slider"></span>
            </label>          
          </div>
          <div>
            <label for='acad' className="label_image">Academics</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                academics = !academics;
                setAcademics(academics);
                console.log(academics);
              }}/>
              <span class="slider"></span>
            </label>
          </div>
          <div>
            <label for='bank' className="label_image">Bank</label>
            <label class="slider-container">
              <input type="checkbox" onChange={()=>{
                bank = !bank;
                setBank(bank);
                console.log(bank);
              }}/>
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div className="submit">
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};
export default Card;
