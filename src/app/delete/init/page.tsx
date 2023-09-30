"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';

const IMGWH = 200;
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export default function Page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const makeCall = async () => {
        const response = await fetch(`${endpoint}/thegatekeeper/account_portal/delete_init`, {
            method: "POST",
            headers: { "Content-Type": 'application/json', "Access-Control-Request-Headers": "*" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (response.status !== 200) {
            const message = await response.json()
            alert(message?.errorMessageEN || 'Somthing went worng, please try again!')
            return
        }
        router.push("/delete/confirm?email=" + email)
    }

    const sumbit = () => {
        if (email.length < 1 || password.length < 1) {
            alert("Please enter both Email and Passowrd")
            return
        }
        makeCall()
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="fieldConatiner">
                <div className="colorBG p-8">
                    <div className="flex items-center justify-center">
                        <img src="/appicon.png" width={IMGWH} height={IMGWH} />
                    </div>
                    <h2 className="text-700 font-bold mx-5 my-5">Delete Your Alpha App Account</h2>
                    <div className="mb-4">
                        <label className="block text-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(text) => setEmail(text.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={(text: any) => setPassword(text.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            security="true"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <button
                            onClick={sumbit}
                            id="button"
                            className="w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                            type="submit"
                        >
                            Continue
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}