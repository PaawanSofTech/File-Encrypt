import { Menu, Transition } from '@headlessui/react'
import { GoBellFill} from "react-icons/go";
import {FcSettings} from "react-icons/fc";
import React,{useState, Fragment, useEffect} from 'react'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

const Notifications = ({userAlice}) => {
    const [name, setName] = useState(false);
    const [academics, setAcademics] = useState(false);
    const [bank, setBank] = useState(false);
    const [medical, setMedical] = useState(false);
    const [settings, setsettings] = useState(false);

    const getNotifications=async()=>{
        try {
            const inboxNotifications = await userAlice.notification.list('INBOX');
            console.log("Notifications",inboxNotifications);
            setnotifications(inboxNotifications);
        } catch (error) {
            console.log("Error",error);
        }
    }
    useEffect(()=>{
        userAlice && getNotifications();
        console.log("Alice",userAlice);
    },[userAlice])
    const [notifications, setnotifications] = useState(["Notification_1","Notification_2","Notification_3","Notification_4","Notification_5"])
  return (
    <div style={{}}>
      <Menu as="div" className="relative inline-block text-left">
    <div>
        <Menu.Button className="flex mx-5 relative p-3 items-center justify-center">
        <GoBellFill size={27} />
        { notifications !== 0 && 
        <p className='absolute top-0.5 bg-[#b80605] rounded-2xl py-[3px] px-[7px] right-0.5 text-xs'>{notifications.length}</p>
        }
        </Menu.Button>
    </div>
    <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
    >
        <Menu.Items className="absolute right-0 z-10 mt-2 text-white w-[500px] border-opacity-20 origin-top-right bg-[#0a2c3f] shadow-lg ring-1 ring-gray-600 ring-opacity-5 rounded-xl focus:outline-none">
        <div className="py-1 overflow-auto max-h-screen flex flex-col items-center justify-center">
            <div className=" text-lg items-center flex border-opacity-30 w-full relative  px-4 py-2"
                style={{
                    fontSize: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    // textAlign: 'center',
                    height: "5rem",
                    marginBottom: '.6rem',
                    fontWeight: '400',
                    cursor: 'default',
                }}
            >
                    {settings ? <p>Settings</p>:<p>Notifications</p>}
                <button onClick={()=>{setsettings(!settings)}} className='absolute right-5' >
            <FcSettings size={30}/>
                </button>
            </div>
            {settings ? 
            <div>
                <p>Settings</p>
                <div>
                </div>

      <div>
        <label>
          Academics:
          <input type="checkbox" checked={academics} onChange={() => setAcademics(!academics)} />
        </label>
      </div>

      <div>
        <label>
          Bank:
          <input type="checkbox" checked={bank} onChange={() => setBank(!bank)} />
        </label>
      </div>

      <div>
        <label>
          Medical:
          <input type="checkbox" checked={medical} onChange={() => setMedical(!medical)} />
        </label>
      </div>
            </div>
            :
            <div>
                {notifications.map((message,key)=>{
                return(
                    <Menu.Item>
                    {({ active }) => (
                        <button
                            className="hover:bg-[#061e2b] h-[80px] border-opacity-30 w-full text-sm"
                            style={{
                                fontSize: '13px',
                                // height: '5rem',
                                padding: '1rem',
                                width: '100%'
                            }}
                        >
                            <div className='flex w-full '>
                                <div className='w-[20%]'>
                                <img className='w-[60px] rounded-2xl h-[60px]' src={message.icon} alt='img'/>
                                </div>
                                <div className='flex w-[80%] justify-around p-4 items-start flex-col'>
                                <p className='text-2xl'>{message.title}</p>
                                <p>{message.message}</p>
                                </div>
                            </div>
                        </button>
                    )}
                    </Menu.Item>
                )
                })}
            </div>
             }
        </div>
        </Menu.Items>
    </Transition>
</Menu>
    </div>
  )
}

export default Notifications
