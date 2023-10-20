import React, { useEffect } from 'react'
import { PushAPI } from '@pushprotocol/restapi'
import { ethers } from 'ethers'
const Push = ({signers,provider}) => {
  var userAlice;
    const initialize=async()=>{
      try {
        console.log("Signers",signers);
        // const signer = ethers.Wallet.createRandom()
        userAlice = await PushAPI.initialize(signers, { env: 'staging' });
        console.log("Gotcha : ",userAlice);
      } catch (error) {
        console.log("Error",error);
      }
    } 
    const getNotifications=async()=>{
      try {
        const inboxNotifications = await userAlice.notification.list('INBOX');
        console.log("Notifications",inboxNotifications);
      } catch (error) {
        console.log("Error",error);
      }
    }
    const forCompany=async()=>{
      try {
        await userAlice.channel.send(['eip155:5:0xaF7f488eDf63410AF7B82998A6a96a14dcB8e89d'], { 
          notification: {
            title: 'New try',
            body: 'Web3 native notification!',
          }
        });
      } catch (error) {
        console.log("Error",error);
      }
    }
    const subscribeChannel=async()=>{
      try {
        await userAlice.notification.subscribe(
          `eip155:5:0xaF7f488eDf63410AF7B82998A6a96a14dcB8e89d` // channel address in CAIP format
        )
      } catch (error) {
        console.log("Error",error);
      }
    }
    const addDelegate=async()=>{
      try {
        const _signer = new ethers.Wallet('4db9c06dab911fec3585fa2b0e519931a96a16e377a750c63fd6aa31d2cc3e61', provider);
        console.log("CHanged",_signer);
        const _userAlice = await PushAPI.initialize(_signer, { env: 'staging' });
        console.log("Gotcha",_userAlice);
        const addedDelegate = await _userAlice.channel.delegate.add(
          `eip155:5:0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`
        )
        console.log(addDelegate,addedDelegate);
      } catch (error) {
        console.log("Error",error);
      }
    }
    useEffect(()=>{
      console.log("Signers",signers);
    },[])
  return (
    <div className='text-black '>
      <button className='bg-white m-3 px-5 py-2 rounded-xl' onClick={initialize}>Push Register</button>
      <button className='bg-white m-3 px-5 py-2 rounded-xl' onClick={getNotifications}>getNotifications</button>
      <button className='bg-white m-3 px-5 py-2 rounded-xl' onClick={forCompany}>Push Send Channel Notification</button>
      <button className='bg-white m-3 px-5 py-2 rounded-xl' onClick={addDelegate}>addDelegate</button>
      <button className='bg-white m-3 px-5 py-2 rounded-xl' onClick={subscribeChannel}>subscribeChannel</button>
    </div>
  )
}

export default Push