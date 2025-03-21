"use client";

import { useEffect, useState } from "react";
import tokenInstance from "./contractInstance";
import { useAccount } from "wagmi";

const useEstateFetcher = (contractAddress) => {
    const { address } = useAccount();
    const [estateData, setEstateData] = useState({
        owner: "",
        details: "",
        valuation: "",
        propId: "",
        totalSupply: "",
        balance: "",
    });

    useEffect(() => {
        if (!contractAddress) return;

        async function fetchData() {
            try {
                const contract = tokenInstance(contractAddress);

                const owner = await contract.propertyOwner();
                const details = await contract.propertyDetails();
                const valuation = await contract.valuation();
                const propId = await contract.propId();
                const totalSupply = await contract.totalSupply();
                const balance = await contract.balanceOf(address);

                setEstateData({
                    owner,
                    details,
                    valuation,
                    propId,
                    totalSupply: totalSupply.toString(),
                    balance: balance.toString(),
                });
            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        }

        fetchData();
    }, [contractAddress, address]);

    return estateData;
};

export default useEstateFetcher;
