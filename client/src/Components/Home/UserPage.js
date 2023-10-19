import React, { useState } from "react";
import Documents from "./Documents";
import Folder from "../Cards/Folder";
import './UserPage.scss'
import {MdQrCodeScanner} from 'react-icons/md';
import {LuCopy} from 'react-icons/lu';
import {LuCopyCheck} from 'react-icons/lu';

import QRCode from 'react-qr-code';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
const UserPage = ({ contract, fetched, folders,account }) => {
  const [folderclosed, setfolderclosed] = useState(true);
  const [docs, setdocs] = useState(null);
  const [val, setval] = useState(0);
  const [qrMade, setQrMade] = useState(false);
  const [copied, setCopied] = useState(false);
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
  const truncateAddress = (walletAddress) =>{
    let string = walletAddress.substring(0,4) + '...' + walletAddress.substring(38,42);
    console.log(string)
    return string;
  }
  const openFolder = async (i) => {
    try {
      const res = await contract.returnDocs(i);
      console.log(res);
      setval(i);
      setdocs(res);
      setfolderclosed(false);
    } catch (error) {
      console.log("Error");
    }
  };
  const generateQR = () =>{
    setQrMade(true)
  }
  return (
    <div>
      {
        folderclosed && fetched && !qrMade && <div className="qr">
          <button onClick={generateQR}>
            <MdQrCodeScanner 
              style={{
                display: 'inline', 
                transform: 'scale(1.6) translateY(-1px)', 
                marginRight: '10px'
              }}/>
            Generate QR
          </button>
        </div>
      }
      {qrMade && 
      <Popup 
      position="top center"
      
      modal
      nested
      trigger={folderclosed && <div className="qr">
        <button onClick={generateQR}>
          <MdQrCodeScanner 
            style={{
              display: 'inline', 
              transform: 'scale(1.6) translateY(-1px)', 
              marginRight: '10px'
            }}/>
          Generate QR
        </button>
        </div>}
      >
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
      </Popup>
      }
      {folderclosed ? (
        <div>
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
                          <button id="accept">Accept</button>
                          <button id="decline">Decline</button>
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
                      <div>{truncateAddress(company.address)}</div>
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
        />
      )}
    </div>
  );
};

export default UserPage;
