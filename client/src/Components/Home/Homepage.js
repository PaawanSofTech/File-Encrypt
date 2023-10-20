import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import { ethers } from "ethers";
import { PushAPI } from '@pushprotocol/restapi'
import SignUp from "../Auth/SignUp";
import { PiUserCircle } from "react-icons/pi";
import DeID from "../../artifacts/contracts/DeID.sol/DeID.json";
import UserPage from "./UserPage";
import CompanyPage from "./CompanyPage";
import { truncateAddressNavbar } from "../Helpers/truncateAddress";
import Notifications from '../Cards/Notifications'
import Loader from "../Helpers/Loader";
import Push from "../Cards/Push";
const Homepage = ({ setconnected }) => {
  const [signers, setsigners] = useState(null);
  const [connect, setconnect] = useState(false);
  const [provider, setprovider] = useState(null);
  const [accounts, setaccounts] = useState(null);
  const [contract, setcontract] = useState(null);
  const [isuser, setisuser] = useState(false);
  const [folders, setfolders] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const [registered, setregistered] = useState(true);
  const [fetched, setfetched] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userAlice, setuserAlice] = useState(null);

  const connectFetch = async () => {
    setLoader(true);
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
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "5" }],
        });
        } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
        // Do something
        window.ethereum
        .request({
        method: "wallet_addEthereumChain",
        params: [
        {
        chainId: "5",
        chainName: "Ethereum",
        nativeCurrency: {
        name: "Goerli",
        symbol: "ETH",
        decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
        blockExplorerUrls: ["https://goerli.etherscan.io"],
        },
        ],
        })
        .catch((error) => {});
        }
        }
        await provider.send("eth_requestAccounts", []);
        console.log("Provider",provider);
        const signer = provider.getSigner();
        setsigners(signer);
        const address = await signer.getAddress();
        setaccounts(address);
        let contractAddress = "0x636E9696186D9DD50a409294726Dd8A2D50Aca3A"; //mumbai
        //0x7492502792E8B8efE1503DAE8fa5913a008F5934 latest mumbai
        //0x196d4119944CD005AD917466B8e2e2Ec018FA547 fujin testnet 
        const contractInstance = new ethers.Contract(
          contractAddress,
          DeID.abi,
          signer
        );
        setcontract(contractInstance);
        console.log("Contract", contractInstance);
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
  };
  const registerPush=async()=>{
    const _userAlice = await PushAPI.initialize(signers, { env: 'staging' });
    setuserAlice(_userAlice);
  }
  const checkRegistered = async () => {
    try {
      const res = await contract.ifRegistered();
      console.log("Response", res);
      const mssg = JSON.parse(JSON.stringify(res));
      var val = parseInt(mssg.hex, 16);
      console.log("time", val);
      setLoader(false);
      if (val === 0) {
        const userData = await contract.userDetails();
        console.log(userData);
        setuserDetails(userData);
        setfolders(userData.Folders);
        setfetched(true);
        setisuser(true);
        setregistered(true);
        registerPush();
      } else if (val === 1) {
        const userData = await contract.companyDetails(accounts);
        setuserDetails(userData);
        setfetched(true);
        setregistered(true);
        registerPush();
      } else {
        console.log("Not Registered");
        setregistered(false);
      }
    } catch (error) {
      console.log("Not Registered", error);
      setregistered(false);
    }
  };
  useEffect(() => {
    connect && checkRegistered();
  }, [contract]);
  //Use effect to get the logged in details, to accordingly load user and company homepage
  return (
    <div>
      {registered ? (
        <>
          <div className="navbar">
            <div className="navbar__center">
              <div style={{
                fontSize: '16px',
                display: 'flex',
                gap: '3rem'
              }}>
                <button onClick={()=>window.scrollTo({top: 0, behavior: "smooth"})}>My folders</button>
                <button onClick={()=>window.scrollTo({top: 500, behavior: "smooth"})}>Requests</button>
                <button onClick={()=>window.scrollTo({top: 1800, behavior: "smooth"})}>History</button>
              </div>
                <div className="navbar__right">
                  {connect && (
                    <button className="navbar__right--notify">
                      <Notifications userAlice={userAlice}/>
                    </button>
                  )}
                  {connect && fetched ? (
                    <>
                      <button className="truncate max-w-[250px] flex navbar__right--connect" style={{
                        backgroundImage: 'linear-gradient(to right bottom, #c9c9c9, #b8b8b8)'
                      }}>
                        accounts : {truncateAddressNavbar(accounts)}
                      </button>
                      <div className="navbar__left">
                        {userDetails?.Image.length === 0 ? (
                          <PiUserCircle size={30}/>
                          ) : (
                            <img
                            src={userDetails?.Image}
                            alt="Profile"
                            className="max-h-[30px]"
                            />
                            )
                          }
                      </div>
                    </>
                  ) : (
                    <button
                    onClick={connectFetch}
                    className="navbar__right--connect"
                    style={{
                      backgroundImage: 'linear-gradient(to right bottom, #c9c9c9, #b8b8b8)'
                    }}
                    >
                      Connect
                    </button>
                  )}
                </div>

            </div>
          </div>
          {
            !loader ? <>
                
              {isuser ? (
                <UserPage 
                fetched={fetched} 
                contract={contract} 
                folders={folders} 
                  account = {accounts}
                  connect = {connect}
                  />
              ) : (
                <CompanyPage
                  fetched={fetched}
                  contract={contract}
                  connect={connect}
                  />
              )}
          </> : < div style={{transform: 'translateY(10rem)'}}><Loader/></div>
        }
        </>
      ) : (
        <SignUp contract={contract} />
      )}
    </div>
  );
};

export default Homepage;
