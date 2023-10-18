import React, { useState } from "react";
import "./CompanyCard.css";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";

const Card = () => {
  const [dobVerified, setDOBVerified] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const [imageVerified, setImageVerified] = useState(false);
  const [filesVerified, setFilesVerified] = useState(false);

  return (
    <div className="company-card">
      <div className="wrapper">
        <h1
          style={{
            display: "flex",
            width: "100%",
            fontSize: "16px",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          User Name
        </h1>
      </div>
      <div className="wrapper">
        <div>Date of birth</div>
        {!dobVerified ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setDOBVerified(true);
            }}
          >
            Verify
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>

      <div className="wrapper">
        <div>Address</div>
        {!addressVerified ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setAddressVerified(true);
            }}
          >
            Verify
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>

      <div className="wrapper">
        <div>Image</div>
        {!imageVerified ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setImageVerified(true);
            }}
          >
            Verify
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>

      <div className="wrapper">
        <div style={{ fontWeight: "900", color: "cyan", fontSize: "16px" }}>
          {" "}
          Files
        </div>
        {!filesVerified ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setFilesVerified(true);
            }}
          >
            Verify
          </Button>
        ) : (
          <CheckCircleIcon color="success" fontSize="small" />
        )}
      </div>
      <Button
        variant="contained"
        fullWidth
        size="medium"
        onClick={() => {}}
        style={{ marginTop: "4px" }}
        endIcon={<SendIcon />}
      >
        Send Request
      </Button>
    </div>
  );
};
export default Card;
