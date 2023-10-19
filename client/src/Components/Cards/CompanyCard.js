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

  return (
    <div className="company-card">
      <div className="wrapper">
        <h1
          style={{
            display: "flex",
            width: "100%",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          User Name
        </h1>
      </div>
      <div className="wrapper">
        <div>Name</div>
        {!name ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setName(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" />
        )}
      </div>

      <div className="wrapper">
        <div>Date of birth</div>
        {!dob ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setDOB(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" />
        )}
      </div>
      
      <div className="wrapper">
        <div>Address</div>
        {!address ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setAddress(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>
      
      <div className="wrapper">
        <div>Contact number</div>
        {!phone ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setPhone(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" />
        )}
      </div>
      

      <div className="wrapper">
        <div>Profile image</div>
        {!image ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setImage(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>

      <div style={{
        marginTop:'15px',
        fontSize: '20px'
      }}>Folders</div>

      <div className="wrapper">
        <div>Medical</div>
        {!medical ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setMedical(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>
      <div className="wrapper">
        <div>Academics</div>
        {!academics ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setAcademics(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>
      <div className="wrapper">
        <div>Bank</div>
        {!bank ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setBank(true);
            }}
          >
            Select
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>
      <div className="submit">
        <Button
          variant="contained"
          size="medium"
          >
          Send Request
        </Button>
        </div>
    </div>
  );
};
export default Card;
