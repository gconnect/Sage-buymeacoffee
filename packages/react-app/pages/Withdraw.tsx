import React, { useState } from 'react'

export default function Withdraw() {
   const [amount, setAmount] = useState<string>("")
   const [walletAddress, setWalletAddress] = useState<string>("")

  const handleAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value)
      console.log(e.currentTarget.value)

  }

   const handleWalletAddress = (e: React.FormEvent<HTMLInputElement>) => {
       setWalletAddress(e.currentTarget.value)

   }
  
  const withdrawTip = async () => {
    if (amount === "") {
      alert("amount required!")
      return
    } 
    // await createCreator(account, removeSpace(username), pinataHash, bio)  
  }

  return (
    <div>
      <h1 className='mb-4 text-lg font-bold'>Withdraw Tip</h1>
      <div className='w-full'>
        <input className='w-full border-2 rounded-md mb-2 p-2' type="number" placeholder='amount' value={amount} onChange={handleAmount} />
      </div>
      <div>
        <input className='w-full border-2 rounded-md p-2' type="text" placeholder='wallet Address' disabled value={walletAddress} onChange={handleWalletAddress} />
      </div>
      <button className=' w-full bg-yellow-300 mt-4 p-4 rounded-md' onClick={withdrawTip}>Withdraw Tip</button>
    </div>
)}
