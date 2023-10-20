import React, { useEffect, useState } from "react";
import Documents from "./Documents";
import Folder from "../Cards/Folder";
import { LuScanLine } from "react-icons/lu";
import { AiOutlineUser } from 'react-icons/ai';
import { BsArrowRight} from 'react-icons/bs';
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
  const [inputAddress, setInputAddress] = useState("");
  const [result, setResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReqModalOpen, setisReqModalOpen] = useState(false);
  const [userContent, setuserContent] = useState('');
  const [bg, setbg] = useState('');

  const openReqModal = () => {
    setisReqModalOpen(true);
  };
  const closeReqModal = () => {
    setisReqModalOpen(false);
  };
  
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
    setBgColor('white');
  };
  const handleScan = (data) => {
    if (data !== null) {
      setInputAddress(data.text);
      setrequested(true);
      console.log("Data", data.text);
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  const setBgColor = (index) => {
    if(index%3 === 0){
      return 'linear-gradient(to bottom, #fa9f88, #fa4582ff)'
    }
    else if(index%3 === 1){
      return 'linear-gradient(to bottom, #f4c402, #f56701)'
    }else{
      return 'linear-gradient(to bottom, #87efa2, #0bb79a)'
    }
  }
  return (
    <div>
      {!isModalOpen && connect &&
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
      <Modal isOpen={isModalOpen} closeModal={closeModal} bg={'linear-gradient(to bottom, rgb(234, 234, 234), rgb(179, 179, 179))'}>
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
              width: '100%',
              color: 'black',
              fontWeight: '400',
            }}
            />{inputAddress && 
              <button
              onClick={() => {
                setResult(inputAddress);
                setrequested(true);
                console.log("Address", inputAddress);
            }}
            style={{
              display: 'inline',
              position: 'absolute',
              right: '2.5rem',
              bottom: '2.4rem',
              transform: 'scale(1.4)',
              color: 'black',
            }}
            >
            <BsArrowRight/>
          </button>
          }
        </div> : <><CompanyCard closeModal={closeModal} contract={contract} inputAddress={inputAddress} /></>}
      </Modal>
      <Modal isOpen={isReqModalOpen} closeModal={closeReqModal} bg={bg}>
          {userContent}
      </Modal>
      {folderclosed ? (
        <div>
        {fetched && (
            <div className="company_row">
              <div className="company_row__1">
                <div className="company_row__header">
                  <div className="company_row__title"></div>
                </div>
                <div className="company_row__sections"></div>
                {/* <div className="row__sections"></div> */}
              </div>
              <div className="company_row__2">
                <div className="company_row__header">
                  <div className="company_row__title">Active Users</div>
                  {/* <div className="row__title">Active Users</div> */}
                  <button className="company_row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="company_row__sections">
                  {users.map((user,index) => {return(
                    <div className="company_column" style={{backgroundImage: `${setBgColor(index)}`, cursor: 'pointer'}}
                      onClick = {()=>{
                        openReqModal()
                        setbg(setBgColor(index))
                        setuserContent(<div className="column__fields" style={{border: 'none', color:'black'}}>
                          <div className="popup">
                            <div className="popup__up">
                              {/* <img src='' alt=".image" className="image" style={{borderRadius: '4rem'}}/> */}
                              <div className="image"><AiOutlineUser size={105}/></div>
                              <div style={{display: 'flex'}} className="details">
                                <div>Name</div>
                                <div>Address</div>
                                <div>DOB</div>
                                <div>Phone</div>
                              </div>
                            </div>
                            <div className="popup__down ">
                              <div>Medical</div>
                              <div>Academics</div>
                              <div>Bank</div>
                            </div>
                          </div>
                      </div>)
                      }}
                    >
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
              <div className="company_row__3">
                <div className="company_row__header">
                  <div className="company_row__title">History</div>
                  <button className="company_row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="company_row__sections">
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
