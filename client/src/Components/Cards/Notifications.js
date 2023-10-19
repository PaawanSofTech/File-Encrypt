import { Menu, Transition } from '@headlessui/react'
import { GoBellFill} from "react-icons/go";

import React,{useState, Fragment} from 'react'

const Notifications = () => {
    const [notifications, setnotifications] = useState(["Noti1","Noti1","Noti1","Noti1","Noti1"])
  return (
    <div style={{width: 'auto'}}>
      <Menu as="div" className="relative inline-block text-left">
    <div className=''>
        <Menu.Button className="flex mx-5 relative p-3  items-center justify-center">
        <GoBellFill size={20} style={{marginRight: '4px', transform: 'translateY(1px)'}}/>
        { notifications !== 0 && 
        <p className='absolute top-0.5 bg-[#b80605] rounded-3xl py-[3px] px-[7px] right-0.5 text-xs'>{notifications.length}</p>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 text-white w-[500px] border-white border-[1px] border-opacity-20 origin-top-right bg-[black] shadow-lg ring-1 ring-gray-600 ring-opacity-5 rounded-xl focus:outline-none">
        <div className="py-1  flex flex-col items-center justify-center">
            <div className="hover:bg-[#1e1e1e] text-lg items-center  flex border-b-[1px] border-white border-opacity-30 w-full  px-4 py-2">
            <p>Notifications</p>
            </div>
            {notifications.map((message,key)=>{
            return(
                <Menu.Item>
                {({ active }) => (
                    <button
                    className="hover:bg-[#1e1e1e] border-b-[1px] border-white border-opacity-30 w-full  px-4 py-2 text-sm"
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
