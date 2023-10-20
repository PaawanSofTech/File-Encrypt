import { Menu, Transition } from '@headlessui/react'
import { GoBellFill} from "react-icons/go";

import React,{useState, Fragment} from 'react'

const Notifications = () => {
    const [notifications, setnotifications] = useState(["Notification_1","Notification_2","Notification_3","Notification_4","Notification_5"])
  return (
    <div style={{}}>
      <Menu as="div" className="relative inline-block text-left">
    <div>
        <Menu.Button className="flex mx-5 relative p-3 items-center justify-center">
        <GoBellFill size={20} style={{marginRight: '4px', transform: 'translateY(1px)', color: 'white'}}/>
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
        <div className="py-1  flex flex-col items-center justify-center">
            <div className=" text-lg items-center flex border-opacity-30 w-full  px-4 py-2"
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
            Notifications
            </div>
            {notifications.map((message,key)=>{
            return(
                <Menu.Item>
                {({ active }) => (
                    <button
                        className="hover:bg-[#061e2b]  border-opacity-30 w-fulltext-sm"
                        style={{
                            fontSize: '13px',
                            height: '5rem',
                            padding: '1rem',
                            width: '100%'
                        }}
                    >
                    {message}
                    </button>
                )}
                </Menu.Item>
            )
            })}
        </div>
        </Menu.Items>
    </Transition>
</Menu>
    </div>
  )
}

export default Notifications
