import React,{useEffect, useState} from 'react'
import './Homepage.scss'
import { ethers } from 'ethers';
import SignUp from '../Auth/SignUp';
import { PiUserCircle } from 'react-icons/pi';
import DeID from "../../artifacts/contracts/DeID.sol/DeID.json"
import Documents from './Documents';
import Folder from '../Cards/Folder';
const Homepage = ({setconnected}) => {
  const [connect, setconnect] = useState(false);
  const [provider, setprovider] = useState(null);
  const [accounts, setaccounts] = useState(null);
  const [contract, setcontract] = useState(null);
  const [isuser, setisuser] = useState(false);
  const [folders, setfolders] = useState(null);
  const [folderclosed, setfolderclosed] = useState(true);
  const [userDetails, setuserDetails] = useState(null);
  const [registered, setregistered] = useState(true);
  const [fetched, setfetched] = useState(false);
  const [docs, setdocs] = useState(null);
  const [val, setval] = useState(0);
  const connectFetch = async () => {
    const loadProvider = async (provider) => {
        if (provider) {
            window.ethereum.on("chainChanged", () => {
                loadProvider(provider);
            });
            window.ethereum.on("accountsChanged", () => {
                loadProvider(provider);
            });
            const { ethereum } = window;
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x13881' }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    // Do something
                    window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x13881',
                            chainName: 'Polygon',
                            nativeCurrency: {
                                name: 'Mumbai',
                                symbol: 'MATIC',
                                decimals: 18
                            },
                            rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                            blockExplorerUrls: ['https://mumbai.polygonscan.com']
                        }]
                    })
                        .catch((error) => {
                        });
                }
            }
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setaccounts(address);
            let contractAddress = "0xc182C4Ee6D85E0E99DB147908ac3F59cff02973b"; //mumbai
            const contractInstance = new ethers.Contract(
                contractAddress,
                DeID.abi,
                signer
            );
            setcontract(contractInstance);
            console.log("Contract" ,contractInstance);
            setprovider(provider);
            setconnect(true);
            setconnected(true);
        } else {
            console.error("MetaMask not Installed");
        }
    };
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await loadProvider(provider);
    } catch (error) {
        console.error("MetaMask not Installed");
    }
  }
  const checkRegistered=async()=>{
    try {
      const res = await contract.ifRegistered();
      console.log("Response",res);
      const mssg = JSON.parse(JSON.stringify(res));
      var val = parseInt(mssg.hex, 16);
      console.log("time",val);
      if(val ===0){
        const userData = await contract.userDetails();
        console.log(userData);
        setuserDetails(userData);
        setfolders(userData.Folders)
        setfetched(true);
        setisuser(true);
        setregistered(true);
      } else if(val ===1){
        const userData = await contract.companyDetails(accounts);
        setuserDetails(userData);
        setfetched(true);
        setregistered(true);
      } else{
        console.log("Not Registered");
        setregistered(false);
      }
    } catch (error) {
      console.log("Not Registered",error);
      setregistered(false);
    }
  }
  const openFolder=async(i)=>{
    try {
      const res = await contract.returnDocs(i);
      console.log(res);
      setval(i);
      setdocs(res);
      setfolderclosed(false);
    } catch (error) {
      console.log("Error");
    }
  }
  useEffect(()=>{
    connect && checkRegistered();
  },[contract])
  //Use effect to get the logged in details, to accordingly load user and company homepage
  return (
    <div>
      {
      registered ?
      <>
      <div className='flex navbar'>
        {fetched && 
        <div className='flex absolute left-6  items-center flex-row text-3xl'>
          { userDetails.Image.length ===0 ? 
          <PiUserCircle size={37} className='ml-6'/>
          :
          <img src={userDetails.Image} alt='Profile' className='max-h-[37px] ml-6'/>
          }
          <p className='ml-4'>
          {userDetails.Name}
          </p>
        </div>
        }
        <div className='navbar__center'>
          <h1 className='navbar__center--brand'>Group Project</h1>
        </div>
        <div className='navbar__right'>
          {connect && 
          <button className='navbar__right--edit'>
            Edit Profile
          </button>
          }
          {connect ? 
          <button className='truncate max-w-[230px] navbar__right--connect'>accounts : {accounts}</button>
          :
          <button onClick={connectFetch} className='navbar__right--connect'>
            Connect
          </button>
        }
        </div>
      </div>
      { isuser && <div>
      {folderclosed ? 
      <div>
        {fetched && 
        <div className='row'>
          <div className='row__1'>
            <div className='row__header'>
              <div className='row__title'>My folders</div>
              <button className='row__btn'>View all <span>&rarr;</span></button>
            </div>
            <div className='row__sections'>
              {folders.map((folder,i)=>{
                return(
                  <div onClick={()=>{openFolder(i)}}>
                    <Folder contract={contract} folder={folder} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='row__2'>
            <div className='row__header'>
              <div className='row__title'>Requests</div>
            </div>
            <div className='row__sections'>
              <div className='column'></div>
              <div className='column'></div>
              <div className='column'></div>
            </div>
          </div>
          <div className='row__3'>
            <div className='row__header'>
              <div className='row__title'>History</div>
              <button className='row__btn'>View all <span>&rarr;</span></button>
            </div>
            <div className='row__sections'>
              <div className='column'></div>
              <div className='column'></div>
              <div className='column'></div>
            </div>
          </div>
        </div>
        }
      </div>
      :
      <Documents val={val} setfolderclosed={setfolderclosed} name={folders[val]} contract={contract} docs={docs} /> 
      }
      </div>}
      </>
      : 
      <SignUp contract={contract}/>
    }


    </div>
  )
}

export default Homepage
