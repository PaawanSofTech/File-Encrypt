import { Menu, Transition } from '@headlessui/react'
import { GoBellFill} from "react-icons/go";
import {FcSettings} from "react-icons/fc";
import React,{useState, Fragment, useEffect} from 'react'

const Notifications = ({userAlice}) => {
    const [settings, setsettings] = useState(false);
    const [basics, setbasics] = useState(false);
    const [medical, setMedical] = useState(false);
    const [academics, setAcademics] = useState(false);
    const [bank, setBank] = useState(false);

    const getNotifications=async()=>{
        try {
            const inboxNotifications = await userAlice.notification.list('INBOX');
            console.log("Notifications",inboxNotifications);
            setnotifications(inboxNotifications);
        } catch (error) {
            console.log("Error",error);
        }
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await userAlice.notification.subscribe(`eip155:5:0xaF7f488eDf63410AF7B82998A6a96a14dcB8e89d`, {
                settings: [ // settings are dependent on channel
                  {enabled: basics}, // setting 1
                  {enabled: medical}, // setting 2
                  {enabled: academics}, // setting 3
                  {enabled: bank}//setting 4
                ]
              })
              console.log("here",response);
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
        <GoBellFill size={27} style={{color: 'white'}}/>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 text-black w-[500px] border-opacity-20 origin-top-right shadow-lg ring-1 ring-gray-600 ring-opacity-5 rounded-xl focus:outline-none" style={{
            backgroundImage: 'linear-gradient(to top,#213DD9 ,#87DDFD)',
        }}>
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
                <form onSubmit={onSubmit}>
                    <div className="basic_details">
                    <div className="basics">
                        <label for='basics' className="label_basics">Basics</label>
                        <label class="slider-container">
                        <input type="checkbox" onChange={()=>{
                            setbasics(!basics);
                            console.log(basics);
                        }}/>
                        <span class="slider"></span>
                        </label>          
                    </div>
                    </div>
                    <div className="folder_details">
                    <div style={{transform: 'translateX(-20px)'}}>Folders</div>
                    <div>
                        <label for='med' className="label_image">Medical</label>
                        <label class="slider-container">
                        <input type="checkbox" onChange={()=>{
                            setMedical(!medical);
                            console.log(medical);
                        }}/>
                        <span class="slider"></span>
                        </label>          
                    </div>
                    <div>
                        <label for='acad' className="label_image">Academics</label>
                        <label class="slider-container">
                        <input type="checkbox" onChange={()=>{
                            setAcademics(!academics);
                            console.log(academics);
                        }}/>
                        <span class="slider"></span>
                        </label>
                    </div>
                    <div>
                        <label for='bank' className="label_image">Bank</label>
                        <label class="slider-container">
                        <input type="checkbox" onChange={()=>{
                            setBank(!bank);
                            console.log(bank);
                        }}/>
                        <span class="slider"></span>
                        </label>
                    </div>
                    </div>
                    <div className="submit">
                    <button>Send</button>
                    </div>
                </form>
                </div>
            </div>
            :
            <div>
                {notifications.map((message,key)=>{
                    if(key > 4){return null;}
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
