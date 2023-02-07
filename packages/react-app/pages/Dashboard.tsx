import React from 'react'
import Image from 'next/image'
import profilePix from "../images/img3.png"

export default function Dashboard() {
  return (
    <div>
      <div className="w-full mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
        <Image src={profilePix} alt="profile-pix" width={200} height={200} />
        <p>Username</p>
        <p>Brief bio</p>
        <label>Donation received:</label>
        <span className="font-bold">100 CUSD</span>
        <p className="mb-4">Supporters: 2</p>
        <a className='className="w-full bg-yellow-300 rounded-md p-2 my-4"' href="Withdraw">Withdraw Tip</a> 
      </div>
    </div>
  )
}
