import React, { useState,useRef } from 'react'
import './Documents.scss'
import {FileUploader} from 'react-drag-drop-files';
import axios from "axios";
import {FaFileUpload} from "react-icons/fa"
import {BiLoaderAlt} from "react-icons/bi"
import {IoIosArrowBack} from "react-icons/io"
import {TbCircleArrowDown} from "react-icons/tb";
const fileTypes = ["PDF", "DOCX"];

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTUyNmI4Yy1hNmIzLTQyMGYtOTM5ZC0zZjUzZmRjZjA4ODMiLCJlbWFpbCI6InJvbm5pZXJhanNpbmdoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5OTZjNTJkYmFkZjFhZGZmOGU0YSIsInNjb3BlZEtleVNlY3JldCI6ImEyYmFjNjBjNzdlZGQ1ZDdhYTBhYTExNzY5OWZjYWJmMzc0ZmQxNTQzODZhMDQ5NTRmZTMzZTAxNWZlZTg0NzkiLCJpYXQiOjE2ODcyNDUzODJ9.CHifyXne4nGhyQcTSU8kVMFMdNaFktGpK45JdKiHVtI`
const Documents = ({docs,contract,name,val,setfolderclosed}) => {
  const [file, setfile] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [fileName, setfileName] = useState('');
  const hiddenFileInput = useRef(null);
  const uploadFile = async () => {
    if (file) {
        setuploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: JWT,
                }
            });
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
            await contract.addDocs(val, ImgHash);
        } catch (error) {
            console.log(error);
        }
        setfile(null);
        setfileName('');
        setuploading(false);
    } else {
    }
  }
  const retrieveFile = (file) => {
    console.log(file)
    setfile(file);
    setfileName(file.name);
    // e.preventDefault();
  };
  const sendImage = () => {
      hiddenFileInput.current.click();
  }
  const time=(res)=>{
    const mssg = JSON.parse(JSON.stringify(res));
    var val = parseInt(mssg.hex, 16);
    val = val*1000;
    var date = new Date(val).toTimeString();
    date = JSON.stringify(date);
    const time = date.slice(1, 6);
    return time;
  }
  return (
    <div className='flex-col flex items-center'>
      <button onClick={()=>{setfolderclosed(true)}} className='mt-12 absolute left-28'>
        <IoIosArrowBack size={37} />
      </button>
      <div>
      <p className='text-5xl mt-12'>
      Documents / {name}
      </p>
      </div>
    <div className='flex items-center justify-center min-w-full '>
    { docs.length !==0 ? 
    docs.map((doc,i)=>{
      return(
      <div className='mx-12 my-6 documents__column'>
        <div onClick={()=>{window.open(doc.Hash, '_blank')}} className='document__column--header'>
          <img className='document__column--header--icon max-w-[240px] max-h-[240px]' alt='document' src={doc.Hash}/>
          <div className='document__column__header--title'>{time(doc.TimeAdded)}</div>
        </div>
      </div>
      )
    })
      
      :
    // <div className='documents grid grid-cols-4'>
    //   {docs.map((doc,i)=>{
    //     return(
    //     <div className='mx-12 my-6 documents__column'>
    //       <div onClick={()=>{window.open(doc.Hash, '_blank')}} className='document__column--header'>
    //         <img className='document__column--header--icon max-w-[240px] max-h-[240px]' alt='document' src={doc.Hash}/>
    //         <div className='document__column__header--title'>{time(doc.TimeAdded)}</div>
    //       </div>
    //     </div>
    //     )
    //   })}
    // </div>
    <div className='text-5xl mt-36 flex flex-col justify-around items-center h-[200px]'>
    <p className=''>No Files</p>
    <div className='flex items-center flex-row'>
    <p>Add Files Here </p>
    <TbCircleArrowDown size={45}/>
    </div>
  </div>
    }
    {
      fileName.length === 0 
      ? 
      <>
      <FileUploader handleChange={retrieveFile} name="file" types={fileTypes} ref={hiddenFileInput}/>
      </>
      :
      <button onClick={uploadFile}  className='fixed bottom-16 flex flex-row  bg-[#0e3851] items-center rounded-full px-9 py-[4px]'>
      <p className=' text-[2rem] w-[250px] truncate '>{fileName}</p>
      {uploading ?
        <BiLoaderAlt className='animate-spin' size={27} />
      :
        <FaFileUpload size={27}/>
      }
      </button>
    }
    <input
        disabled={uploading}
        hidden={true}
        type="file"
        name="data"
        id="document"
        accept="image/*"
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        onChange={retrieveFile}
    />
    </div>
    </div>
  )
}

export default Documents
