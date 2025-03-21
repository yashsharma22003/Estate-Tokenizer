'use client'
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Header = () => {

    return (<div className="h-20 border-4 flex items-center bg-teal-50">
        <img src={"./ethereumLogo.png"} className="size-12 ml-4 " alt="Ethereum Logo" />
        <h1 className="ml-2 font-medium text-3xl mb-1 text-blue-400">Estate Tokenizer</h1>
        <div className="ml-auto mr-6">
            <ConnectButton />
        </div>
    </div>

    )

}

export default Header;