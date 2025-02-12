"use client"

import { useState } from "react";

const Page = () => {
    const [propertyId, setPropertyId] = useState("");
    const [symbol, setSymbol] = useState("");
    const [location, setLocation] = useState("");
    const [tokenSupply, setTokenSupply] = useState("");
    const [ownerWallet, setOwnerWallet] = useState("");

    const handleSubmit = () => {
        console.log({
            propertyId,
            symbol,
            location,
            tokenSupply,
            ownerWallet,
        });
    };

    return (
        <div className="border-4 flex h-screen justify-center items-center">
            <div className="border-2 w-1/2 flex flex-col border-gray-400 p-6">
                <h1 className="mr-auto p-4 font-thin text-3xl">Tokenization request form</h1>

                <h2 className="mr-auto p-4 font-thin text-xl">Property Id</h2>
                <input
                    type="text"
                    className="border-2 w-3/4 mx-2 p-2"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                />

                <h2 className="mr-auto p-4 font-thin text-xl">Symbol (for token)</h2>
                <input
                    type="text"
                    className="border-2 w-3/4 mx-2 p-2"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />

                <h2 className="mr-auto p-4 font-thin text-xl">Location Details</h2>
                <input
                    type="text"
                    className="border-2 w-3/4 mx-2 p-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <h2 className="mr-auto p-4 font-thin text-xl">Token supply</h2>
                <input
                    type="number"
                    className="border-2 w-3/4 mx-2 p-2"
                    value={tokenSupply}
                    onChange={(e) => setTokenSupply(e.target.value)}
                />

                <h2 className="mr-auto p-4 font-thin text-xl">Owner wallet address</h2>
                <input
                    type="text"
                    className="border-2 w-3/4 mx-2 p-2"
                    value={ownerWallet}
                    onChange={(e) => setOwnerWallet(e.target.value)}
                />

                {/* Align button to the left */}
                <button
                    className="border-2 px-6 py-2 my-6 mr-4 self-end border-black rounded-lg"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Page;
