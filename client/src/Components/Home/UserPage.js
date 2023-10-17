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
  console.log(account);
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
        folderclosed && fetched && <div className="qr">
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
                          <button id="decline" onClick={()=>{reqs.splice(req,1)}}>Decline</button>
                        </div>
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

export default UserPage;
