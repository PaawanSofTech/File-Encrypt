import React, { useState } from "react";
import "./CompanyCard.scss";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Card = () => {
  const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [dob, setDOB] = useState(false);
  const [address, setAddress] = useState(false);
  const [image, setImage] = useState(false);

  const [medical, setMedical] = useState(false);
  const [academics, setAcademics] = useState(false);
  const [bank, setBank] = useState(false);

  // On submit request
  const onSubmit = (e) =>{
    e.preventDefault()
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
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="dob">
            <label for='dob' className="label_dob">DOB</label>
            <label class="slider-container">
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="address">
            <label for='address' className="label_address">Address</label>
            <label class="slider-container">
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="phone">
            <label for='phone' className="label_phone">Phone </label>
            <label class="slider-container">
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>          
          </div>
          <div className="image">
            <label for='image' className="label_image">Profile image</label>
            <label class="slider-container">
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>          
          </div>
        </div>
        <div className="folder_details">
          <div style={{transform: 'translateX(-20px)'}}>Folders</div>
          <div>
            <label for='med' className="label_image">Medical</label>
            <label class="slider-container">
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>          
          </div>
          <div>
            <label for='acad' className="label_image">Academics</label>
            <label class="slider-container">
              <input type="checkbox"/>
              <span class="slider"></span>
            </label>
          </div>
          <div>
            <label for='bank' className="label_image">Bank</label>
            <label class="slider-container">
              <input type="checkbox"/>
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
