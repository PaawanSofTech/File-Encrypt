import React, { useState } from "react";
import Documents from "./Documents";
import Folder from "../Cards/Folder";
import {LuScanLine} from 'react-icons/lu';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './CompanyPage.scss'
import QrReader from 'react-qr-scanner';
const delay = 100;
const CompanyPage = ({ contract, fetched, folders }) => {
  const [folderclosed, setfolderclosed] = useState(true);
  const [docs, setdocs] = useState(null);
  const [val, setval] = useState(0);
  const [scan, setScan] = useState(false);
  
  const [inputAddress, setInputAddress] = useState('');
  const [result, setResult] = useState('');

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
  const openScanner = () =>{
    setScan(true);
  }
  const handleScan = (data) => {setResult(data)}
  const handleError = (err) => {console.log(err)}
  return (
    <div>
      {folderclosed && <div className="qr">
          <button 
          onClick={openScanner}
          >
            Scan QR
            <LuScanLine 
              style={{
                display: 'inline', 
                transform: 'scale(1.6) translateY(-1px)', 
                marginLeft: '15px'
              }}/>
          </button>
        </div>
        }
        {scan && <Popup 
        position="top center"
        modal
        trigger={folderclosed && <div className="qr">
        <button onClick={openScanner}>
          Scan QR
          <LuScanLine 
            style={{
              display: 'inline', 
              transform: 'scale(1.6) translateY(-1px)', 
              marginLeft: '15px'
          }}/>
        </button>
      </div>}
      >
        <div className="qr__code">
        <QrReader
          style={{
            height: 300
          }}
          delay={delay}
          // style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          facingMode='rear'
          />
          {/* <QRCode
            value={account}
            size={280}
          /> */}
          <input 
            type="text" 
            placeholder="Or enter wallet address" 
            onChange={(e)=>setInputAddress(e.target.value)} 
            value={inputAddress}
            style={{
              marginTop: '2.5rem',
              borderRadius: '100px'
            }}
          />
          <button onSubmit={()=>setResult(inputAddress)}>Submit</button>
          <p className="qr__code__address" >
            {result && <>{result}</>}
            {/* <CopyToClipboard 
              text = {account} 
              onCopy={()=>setCopied(true)}
            >
              {copied ? 
              <LuCopyCheck style={{transform: 'scale(1.2) translateY(2px)'}}/>
              // <img src={require('../../animation_lnu1fmgr_small.gif')}/>
              :<LuCopy style={{cursor: 'pointer', transform: 'scale(1.2) translateY(2px)'}}/>}
            </CopyToClipboard> */}
          </p>
        </div>
      </Popup>}
      {folderclosed ? (
        <div>
          {fetched && (
            <div className="row">
              <div className="row__1">
                <div className="row__header">
                  <div className="row__title"></div>
                  <button className="row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="row__sections">
                  {/* {folders.map((folder, i) => {
                    return (
                      <div
                        onClick={() => {
                          openFolder(i);
                        }}
                      >
                        <Folder contract={contract} folder={folder} />
                      </div>
                    );
                  })} */}
                </div>
              </div>
              <div className="row__2">
                <div className="row__header">
                  <div className="row__title">Requests</div>
                </div>
                <div className="row__sections">
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
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
