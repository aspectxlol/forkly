import { useState } from "react";
import AddressInputComponent from "./AddressInputComponent";
import Pinpoint from "./svg/Pinpoint";
import PhoneInput from "./PhoneInput";

interface UserAccountSetupProps {
  onNext: () => void;
}

export default function UserAccountSetup(props: UserAccountSetupProps) {
  const [showAddressInput, setShowAddressInput] = useState(false);
  return (
    <div className="p-6 flex flex-col w-11/12 md:w-1/3 max-h-screen mx-auto border border-gray-500 rounded-lg mt-20">
      <h1 className="text-2xl font-bold mb-6">User Account Setup</h1>
      <input type="text" name="username" id="username" placeholder="Username" className="w-full mb-4 px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
      <div className="mb-4 flex">
        <input type="text" name="firstName" id="firstName" placeholder="First Name" className="w-1/2 mr-2 px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
        <input type="text" name="lastName" id="lastName" placeholder="Last Name" className="w-1/2 ml-2 px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
      </div>
      {/* <input type="text" name="phone" id="phone" placeholder="Phone" className="mb-4 px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" /> */}
      <PhoneInput />
      <div className="w-full flex items-center">
        <input type="text" name="address" id="address" placeholder="Address" className="flex-grow mb-4 px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
        <button onClick={() => setShowAddressInput(!showAddressInput)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          pick
        </button>
      </div>
      {showAddressInput && <AddressInputComponent />}
      <button onClick={props.onNext} className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Next
      </button>
    </div >
  );
}