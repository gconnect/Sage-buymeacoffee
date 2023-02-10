import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div>
        <h1>Are you a creator? click the button below to create account!</h1>
        <button className="bg-yellow-300 rounded-md p-4 mt-4" onClick={() => window.open("CreateAccount")}> Create Creator Account</button>
      </div>
      <div className="flex justify-around">
      <div className="w-2/4 mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
        <Image src="/images/img3.png" alt="profile-pix" width={200} height={200} />
        <p>Username</p>
        <p>Brief bio</p>
        <label>Donation received:</label>
        <span className="font-bold">100 CUSD</span>
        <p className="">Supporters: 2</p>
        <button className="w-full bg-yellow-300 rounded-md p-2 my-2" onClick={() => window.open("Support")}> Support</button>
      </div>
        <div className="w-2/4 mt-2 border-2 border-yellow-300 p-4 rounded-md">
          <Image src="/images/img3.png" alt="profile-pix" width={200} height={200} />
          <p>Username</p>
          <p>Brief bio</p>
          <label>Donation received:</label>
          <span className="font-bold">100 CUSD</span>
          <p className="">Supporters: 2</p>
          <button className="w-full bg-yellow-300 rounded-md p-2 my-2" onClick={() => window.open("Support")}> Support</button>
        </div>

        <div className="w-2/4 mt-2 mx-2 border-2 border-yellow-300 p-4 rounded-md">
          <Image src="/images/img3.png" alt="profile-pix" width={200} height={200} />
          <p>Username</p>
          <p>Brief bio</p>
          <label>Donation received:</label>
          <span className="font-bold">100 CUSD</span>
          <p className="">Supporters: 2</p>
          <button className="w-full bg-yellow-300 rounded-md p-2 my-2" onClick={() => window.open("Support")}> Support</button>
        </div>
      </div>
        
    </div>
  )
}
