import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import Documents from "./Documents";
import Folder from "../Cards/Folder";
import { LuScanLine } from "react-icons/lu";
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./CompanyPage.scss";
import CompanyCard from "../Cards/CompanyCard";
import QrReader from "react-qr-scanner";
import Modal from "../Helpers/Modal";
const delay = 100;
const CompanyPage = ({ contract, fetched, folders, connect }) => {
  const [folderclosed, setfolderclosed] = useState(true);
  const [docs, setdocs] = useState(null);
  const [val, setval] = useState(0);
  const [scan, setScan] = useState(false);
  const [requested, setrequested] = useState( false)
  const [requested, setrequested] = useState( false)
  const [inputAddress, setInputAddress] = useState("");
  const [result, setResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputAddress('')
    setrequested(false)
  };

  const users = [
    {name: 'Username 1'},
    {name: 'Username 2'},
    {name: 'Username 3'},
  ]

  const openFolder = async (i) => {
    try {
      // const res = await contract.returnDocs(i);
      // console.log(res);
      // setval(i);
      // setdocs(res);
      // setfolderclosed(false);
    } catch (error) {
      console.log("Error");
    }
  };
  const openScanner = () => {
    setScan(true);
  };
  const handleScan = (data) => {
    if (data !== null) {
      setInputAddress(data.text);
      setrequested(true);
      // setScanButtonText(false);
      // setScanButtonText(false);
      console.log("Data", data.text);
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  return (
    <div>
      {!isModalOpen && 
      <div className="qr">

      <button onClick={openModal}>
         <p>Scan QR
          <LuScanLine
            style={{
              display: "inline",
              transform: "scale(1.6) translateY(-1px)",
              marginLeft: "15px",
            }}
            />
          </p>
      </button>
      </div>
      }
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {!requested ? <div>
          <QrReader
            style={{
              height: 300,
            }}
            delay={delay}
            // style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            facingMode='rear'
          />
          <input
            type="text"
            placeholder="Or enter wallet address"
            onChange={(e) => setInputAddress(e.target.value)}
            value={inputAddress}
            style={{
              marginTop: "2.5rem",
              borderRadius: "100px",
              width: '100%'
            }}
            />
          <button
            onSubmit={() => {
              setResult(inputAddress)
              console.log("Address", inputAddress);
            }}
          >
            Submit
          </button>
        </div> : <><CompanyCard /></>}
      </Modal>
      {folderclosed ? (
        <div>
          {fetched && (
            <div className="row">
              <div className="row__1">
                <div className="row__header">
                  <div className="row__title"></div>
                </div>
                <div className="row__sections"></div>
                <div className="row__sections"></div>
              </div>
              <div className="row__2">
                <div className="row__header">
                  <div className="row__title">Active Users</div>
                  <div className="row__title">Active Users</div>
                  <button className="row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="row__sections">
                  {users.map(user => {return(
                    <div className="column">
                      <h1 style={{textAlign: 'center'}}>{user.name}</h1>
                      <div style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                      }}><AiOutlineUser size={200}/></div>
                    </div>
                  )})}
                  {users.map(user => {return(
                    <div className="column">
                      <h1 style={{textAlign: 'center'}}>{user.name}</h1>
                      <div style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                      }}><AiOutlineUser size={200}/></div>
                    </div>
                  )})}
                </div>
              </div>
              <div className="row__3">
                <div className="row__header">
                  <div className="row__title">History</div>
                  <button className="row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="row__sections">
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Documents
          val={val}
          setfolderclosed={setfolderclosed}
          name={folders[val]}
          contract={contract}
          docs={docs}
        />
      )}
    </div>
  );
};

export default CompanyPage;
