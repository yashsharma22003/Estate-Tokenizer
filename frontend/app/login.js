"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { SiweMessage } from "siwe";
import { useEthersSigner } from "./ethersSigner";
import { useAuth } from './AuthContext';
import { useRouter } from "next/navigation";


const Login = () => {
  const account = useAccount();
  const signer = useEthersSigner();
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!account.address) return;

    try {
      const domain = window.location.host;
      const origin = window.location.origin;
      const statement = "Sign in with Ethereum to the app";

      // Generate a valid nonce (8-character alphanumeric)
      const nonce = Math.random().toString(36).substring(2, 10);

      // Use the correct property name 'address' in the object
      const siweMessage = new SiweMessage({
        domain,
        address: account.address,
        statement,
        uri: origin,
        version: 1,
        chainId: 11155111, // Sepolia
        nonce,
      });

      const messageToSign = siweMessage.prepareMessage();

      // Check if signer is available
      if (!signer) {
        throw new Error("No signer available");
      }

      // Sign the message with the wallet's private key
      const signature = await signer.signMessage(messageToSign);

      // Send the signed message to your backend for verification
      const res = await fetch("/api/siwe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSign,
          signature,
        }),
      });

      const json = await res.json();

      if (json.ok) {
        alert("Successfully signed in!");
        setUser(account.address);
        router.push("/dashboard");
      } else {
        alert(`Error: ${json.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during the sign-in");
    }
  };

  return (
    <div className="h-screen border-4 flex justify-center items-center bg-[url('/background-image.jpg')] bg-cover bg-center">
      <div className="w-1/4 flex flex-col h-1/2 items-center justify-center border-2 border-gray-300 p-10 rounded-3xl">
        <h1 className="font-bold text-4xl mb-32 mt-10 text-white">Sign In</h1>
        
        {account.isConnected ? (
          <div className=" mb-10 flex-col">
          
            <button
              className=""
              onClick={handleSignIn}
            >
              <img src="./sign-in_button.png"/>
            </button>
          </div>
        ) : (
          <div className="mb-10 border-gray-500 rounded-3xl ">
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
