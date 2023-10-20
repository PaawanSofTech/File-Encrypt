import React, { useState } from "react";
import Documents from "./Documents";
import Folder from "../Cards/Folder";
import {truncateAddressHistory} from '../Helpers/truncateAddress';
import './UserPage.scss'
import {MdQrCodeScanner} from 'react-icons/md';
import {LuCopy} from 'react-icons/lu';
import {LuCopyCheck} from 'react-icons/lu';
import Modal from "../Helpers/Modal";
import QRCode from 'react-qr-code';
import 'reactjs-popup/dist/index.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Loader from "../Helpers/Loader";
const UserPage = ({ contract, fetched, folders,account }) => {
  const [folderclosed, setfolderclosed] = useState(true);
  const [docs, setdocs] = useState(null);
  const [val, setval] = useState(0);
  const [qrMade, setQrMade] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isQrModalOpen, setisQrModalOpen] = useState(false);
  const [isReqModalOpen, setisReqModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [reqContent, setReqContent] = useState('');

  const openQrModal = () => {
    setisQrModalOpen(true);
    setQrMade(true)
  };
  const closeQrModal = () => {
    setisQrModalOpen(false);
  };
  const openReqModal = () => {
    setisReqModalOpen(true);
    setQrMade(true)
  };
  const closeReqModal = () => {
    setisReqModalOpen(false);
  };
  const reqs = [1,2,3];
  const companies = [
    {
      name: 'Company 1',
      address: '0x000000000000000000000000000000000000000000',
      firstAccess: '22/06/2021, 12:23',
    },
    {
      name: 'Company 2',
      address: '0x111111111111111111111111111111111111111111',
      firstAccess: '02/10/2020, 13:20',
    },
    {
      name: 'Company 3',
      address: '0x222222222222222222222222222222222222222222',
      firstAccess: '13/01/2017, 16:29',
    },
  ]
  const setBgColor = (index) => {
    if(index%3 === 0){
      return 'red'
    }
    else if(index%3 === 1){
      return 'blue'
    }else{
      return 'green'
    }
  }
  const openFolder = async (i) => {
    setLoader(true);
    try {
      const res = await contract.returnDocs(i);
      console.log(res);
      setval(i);
      setdocs(res);
      setLoader(false);
      setfolderclosed(false);
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <>
  {!loader ? <div>
        {
          !isQrModalOpen && 
          <div className="qr">
          <button onClick={openQrModal}>
            Generate QR
            <MdQrCodeScanner 
              style={{
                display: 'inline', 
                transform: 'scale(1.6) translateY(-1px)', 
                marginLeft: '10px'
              }}/>
          </button>
        </div>
        }
        <Modal isOpen={isQrModalOpen} closeModal={closeQrModal}>
          <div>
            <div className="qr__code">
              <QRCode
                value={account}
                size={280}
                />
              <p className="qr__code__address" >
                <p>{account}</p>
                <CopyToClipboard 
                  text = {account} 
                  onCopy={()=>setCopied(true)}
                  >
                  {copied ? 
                  <LuCopyCheck style={{transform: 'scale(1.2) translateY(2px)'}}/>
                  // <img src={require('../../animation_lnu1fmgr_small.gif')}/>
                  :<LuCopy style={{cursor: 'pointer', transform: 'scale(1.2) translateY(2px)'}}/>}
                </CopyToClipboard>
              </p>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isReqModalOpen} closeModal={closeReqModal}>
          {reqContent}
        </Modal>
        {folderclosed ? (
          <div style={{transform: 'translateY(4rem)'}}>
            {fetched && (
              <div className="row">
                <div className="row__1">
                  <div className="row__header">
                    <div className="row__title">My folders</div>
                    <button className="row__btn">
                      View all <span>&rarr;</span>
                    </button>
                  </div>
                  <div className="row__sections">
                    {folders.map((folder, i) => {
                      return (
                        <div
                        onClick={() => {
                          openFolder(i);
                        }}
                        >
                          <Folder contract={contract} folder={folder} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="row__2">
                  <div className="row__header">
                    <div className="row__title">Requests</div>
                    <button className="row__btn">
                      View all <span>&rarr;</span>
                    </button>
                  </div>
                  <div className="row__sections">
                      {reqs.map((req, index)=>{ return(
                        <div key = {index} className="column" style={{backgroundColor: `${index }`}}>
                          <div className="column__header">
                            <div className="image">
                              <img src={require('./360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg')} alt='companyimage' style={{
                                width: '40px',
                                borderRadius: '30px'
                              }}/>
                            </div>
                            <div className="column__title"><p style={{fontSize:'25px', fontWeight: '500'}}>Company {req}</p></div>
                          </div>
                          <div className="column__content" style={{
                            padding: '3rem',
                            height: '70%'
                          }}>This company has requested your Adhaar, ...</div>
                          <div className="column__footer" 
                            style={{
                              marginTop: '1rem',
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginRight: '2rem'
                            }}
                          >
                            <p 
                              style={{
                                cursor: 'pointer', 
                                padding: '2px 9px',
                                fontSize: '15px',
                                fontWeight: 'lighter',
                                fontFamily: 'sans-serif'
                              }} 
                              onClick={()=>{
                                openReqModal()
                                setReqContent(<div className="column__fields">
                                  <div style={{color: 'black'}}>
                                    <p style={{
                                      fontSize:'25px', 
                                      fontWeight: '500',
                                    }}
                                    >Company {req}
                                    </p>
                                  </div>
                                <ul>
                                  <li>Name</li>
                                  <li>Address</li>
                                  <li>DOB</li>
                                  <li>Phone</li>
                                  <li>Image</li>
                                  <span>Folders:</span>
                                  <ul>
                                    <li>Medical</li>
                                    <li>Bank</li>
                                    <li>Academics</li>
                                  </ul>
                                </ul>
                              </div>)
                                console.log(reqContent)
                              }}
                            >
                              View details</p>
                          </div>
                        </div>
                      )})}
                      
                  </div>
                </div>
                <div className="row__3">
                  <div className="row__header">
                    <div className="row__title">Active companies</div>
                    <button className="row__btn">
                      View all <span>&rarr;</span>
                    </button>
                  </div>
                  <div className="row__sections">
                      {reqs.map((req)=>{ return(
                        <div key = {req} className="column">
                          <div className="column__header">
                            <div className="column__title">Company {req}</div>
                          </div>
                          <div className="column__fields">
                            <ul>
                              <li>Name</li>
                              <li>Address</li>
                              <li>DOB</li>
                              <li>Phone</li>
                              <li>Image</li>
                              <span>Folders:</span>
                              <ul>
                                <li>Medical</li>
                                <li>Bank</li>
                                <li>Academics</li>
                              </ul>
                            </ul>
                          </div>
                          <div className="column__footer">
                            <button id="revoke">Revoke access</button>
                          </div>
                        </div>
                      )})}
                  </div>
                </div>
                <div className="row__4">
                  <div className="row__header">
                    <div className="row__title">History</div>
                    <button className="row__btn">
                      View all <span>&rarr;</span>
                    </button>
                  </div>
                  <div className="row__sections-h">
                    {companies.map((company)=>{return (
                      
                      <div  className="row-h">
                        <div>{company.name}</div>
                        <div>{truncateAddressHistory(company.address)}</div>
                        <div>{company.firstAccess}</div>
                      </div>
                    )
                    })}
                    <div></div>
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
          style={{transform: 'translateY(10rem)'}}
          />
          )}
      </div>
      : < div style={{transform: 'translateY(10rem)'}}><Loader/></div>
      
    }
    </>
  );
};

export default UserPage;
