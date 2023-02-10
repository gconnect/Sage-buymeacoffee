import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { getCreators } from '@/interact'
import { useCelo } from '@celo/react-celo';

export default function Home() {
  const [creators, setCreators] = useState([])
  const { kit } = useCelo()
  
  useEffect(() => {
    const allCreators = async () => {
      const creators = await getCreators(kit)
      setCreators(creators)
    }
    allCreators()
  }, [creators])
  return (
    <div>
      <div>
        <h1>Are you a creator? click the button below to create account!</h1>
        <button className="bg-yellow-300 rounded-md p-4 mt-4" onClick={() => window.open("CreateAccount")}> Create Creator Account</button>
      </div>
      <div className="flex justify-around">
        {creators.map((item) => <div className="w-3/4 mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
        <Image src={`https://ipfs.io/ipfs/${item.ipfsHash}`} alt="profile-pix" width={300} height={200} />
        <p>{item.username}</p>
        <p>{item.userbio}</p>
        <label>Donation received:</label>
        <span className="font-bold">{`${item.donationsReceived} CUSD`}</span>
        <p className="">{`Supporters: ${item.supporters}`}</p>
        <button className="w-full bg-yellow-300 rounded-md p-2 my-2" onClick={() => window.open("Support")}>{` Support ${item.walletAddress.substring(0,7)}...`}</button>
      </div> )}       
      </div>
        
    </div>
  )
}
