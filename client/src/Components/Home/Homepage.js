import React,{useEffect, useState} from 'react'
import './Homepage.scss'
import { ethers } from 'ethers';
import SignUp from '../Auth/SignUp';
import DeID from "../../artifacts/contracts/DeID.sol/DeID.json"
import { IoMdFolder } from 'react-icons/io';
import Documents from './Documents';
const Homepage = ({setconnected}) => {
  const [connect, setconnect] = useState(false);
  const [provider, setprovider] = useState(null);
  const [accounts, setaccounts] = useState(null);
  const [contract, setcontract] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const [registered, setregistered] = useState(true);
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
            // try {
            //     await ethereum.request({
            //         method: 'wallet_switchEthereumChain',
            //         params: [{ chainId: '0x13881' }],
            //     });
            // } catch (switchError) {
            //     // This error code indicates that the chain has not been added to MetaMask.
            //     if (switchError.code === 4902) {
            //         // Do something
            //         window.ethereum.request({
            //             method: 'wallet_addEthereumChain',
            //             params: [{
            //                 chainId: '0x13881',
            //                 chainName: 'Polygon',
            //                 nativeCurrency: {
            //                     name: 'Mumbai',
            //                     symbol: 'MATIC',
            //                     decimals: 18
            //                 },
            //                 rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
            //                 blockExplorerUrls: ['https://mumbai.polygonscan.com']
            //             }]
            //         })
            //             .catch((error) => {
            //             });
            //     }
            // }
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setaccounts(address);;
            let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //mumbai
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
      const userData = await contract.userDetails();
      console.log(userData);
      setuserDetails(userData);
      setregistered(true);
    } catch (error) {
      console.log("Not Registered");
      setregistered(false);
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
      <div className='navbar'>
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
      <div className='row'>
        <div className='row__1'>
          <div className='row__header'>
            <div className='row__title'>My folders</div>
            <button className='row__btn'>View all <span>&rarr;</span></button>
          </div>
          <div className='row__sections'>
            <div className='column'>
              <div className='column__header'>
                <IoMdFolder className='column__folder-icon' size={'200'} />
                <div className='column__folder-name'>Medical</div>
              </div>
              <div className='column__details'>

              </div>
            </div>
            <div className='column'>
              <div className='column__header'>
                <IoMdFolder className='column__folder-icon' size={'200'} fill='#0a2c3f'/>
                <div className='column__folder-name'>Academics</div>
              </div>
            </div>
            <div className='column'>
              <div className='column__header'>
                <IoMdFolder className='column__folder-icon' size={'200'} fill='#0a2c3f'/>
                <div className='column__folder-name'>Financial</div>
              </div>
            </div>
          </div>
        </div>
        <div className='row__2'>
          <div className='row__header'>
            <div className='row__title'>Analytics</div>
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
      <Documents/>
      </>
      : 
      <SignUp contract={contract}/>
    }


    </div>
  )
}

export default Homepage
