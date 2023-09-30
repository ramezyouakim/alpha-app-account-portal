"use client"

import { useState } from "react";

const IMGWH = 200;
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export default function Page({ searchParams }: any) {
  const [otp, setOtp] = useState("")
  const [isDeleted, setIsDeleted] = useState(false)
  const email = searchParams?.email

  const makeCall = async () => {
    const response = await fetch(`${endpoint}/thegatekeeper/account_portal/delete_confirm`, {
      method: "POST",
      headers: { "Content-Type": 'application/json', "Access-Control-Request-Headers": "*" },
      body: JSON.stringify({
        email: email,
        otp_code: otp
      })
    })

    if (response.status !== 200) {
      const message = await response.json()
      alert(message?.errorMessageEN || 'Somthing went worng, please try again!')
      return
    }
    setIsDeleted(true)
  }

  const sumbit = () => {
    if (email.length < 1 || otp.length < 1) {
      alert("Please enter both Email and Otp code")
      return
    }
    makeCall()
  }

  const formatEmail = () => {
    if (!email) return ''
    return (
      email?.slice(0, 3) +
      "****" +
      "@" +
      email?.split("@")[1]
    );
  }
  return (
    <div className="flex flex-row justify-center">
      <div className="fieldConatiner">
        <div className="colorBG p-8">
          <div className="flex items-center justify-center">
            <img src="/appicon.png" width={IMGWH} height={IMGWH} />
          </div>
          {<h2 className="text-700 font-bold my-5">{isDeleted ? "Your Alpha App account is deleted" : "Delete Your Alpha App Account"}</h2>}

          {
            isDeleted ?
              <h3 className="text-700 font-bold my-5">You many now close this window</h3>
              :
              <>
                {formatEmail() && <p>code is sent to the email {formatEmail()}</p>}
                <h3 className="text-700 font-bold my-5"><strong className="text-red">PLEASE NOTE:</strong> that by clicking the delete button all <br /> of your data will be deleted permanently and <br />you will no longer have access to the account</h3>
                <div className="mb-4">
                  <label className="block text-700 text-sm font-bold mb-2" htmlFor="otp">
                    OTP Code
                  </label>
                  <input
                    value={otp}
                    onChange={(text) => setOtp(text.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="otp"
                    type="text"
                    placeholder="OTP Code"
                  />
                </div>

                <div>
                  <button
                    onClick={sumbit}
                    className="w-full bg-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    DELETE
                  </button>

                </div>
              </>
          }
        </div>
      </div>
    </div>
  )
}