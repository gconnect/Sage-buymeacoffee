import React, { useState } from 'react'
import { pinFileToPinata } from '@/pinata/pinProfilePix'

export default function CreateAccount() {
  const [username, setUsername] = useState("")
  const [userBio, setUserBio] = useState("")
  const [profilePix, setProfilePix] = useState<string | File | number | readonly string[] | undefined>(undefined)

  const handleUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
      console.log(e.currentTarget.value)

  }

  const handleUserBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserBio(e.currentTarget.value)
          console.log(e.target.value)

  }

   const handleprofilePix = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files != null) {
      setProfilePix(e.target.files[0]); 
      console.log(e.target.files[0])
    } 
   }
  
  const createAccount = async () => {
    if (username === "") {
      alert("Username required!")
      return
    } 

    if (userBio === "") {
      alert("Brief bio required")
      return
    }
    if (username.indexOf(' ') >= 0) {
      // setErrorMessage("Space not allowed here")
      alert("Space not allowed here")
      return
    } 
    
    if( document.getElementById("formFile").files.length === 0 ){
      setProfilePix("Please upload your profile photo")   
      return
    } 

    const pinataHash = await pinFileToPinata(profilePix)
    // await createCreator(account, removeSpace(username), pinataHash, bio)  
  }

  return (
    <div>
      <h1 className='mb-4 text-lg font-bold'>Are you a Creator? Create Account here </h1>
      <div className='w-full'>
        <input className='w-full border-2 rounded-md mb-2 p-2' type="text" placeholder='username' value={username} onChange={handleUsername} />
      </div>
      <div>
        <textarea className='w-full border-2 rounded-md p-2' placeholder='Brief bio' value={userBio} onChange={handleUserBio} />
      </div>
      <label>Upload your profile pix</label>
      <div>
        <input className='w-full' type="file" id="formFile" onChange={handleprofilePix} />
      </div>
      <button className=' w-full bg-yellow-300 mt-4 p-4 rounded-md' onClick={createAccount}>Create Account</button>
    </div>
  )
}
