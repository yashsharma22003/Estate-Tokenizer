import { ethers } from "ethers";
import fs from "fs";

const oracleAddress = "0xfAff833309eAdB897072835a890d9C5789E2C6b3";
const oracleABI = [
    "event DataRequested(uint256 requestId, string url)",
    "function fulfillData(uint256 requestId, uint256 data) public",
];

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
const oracleContract = new ethers.Contract(oracleAddress, oracleABI, wallet);

async function listenRequests() {
    oracleContract.on("DataRequested", async (requestId, propId) => {
        console.log(`Request ID: ${requestId}, URL: ${propId}`);

        try {
            const response = await fetchProperty(propId);
            const data = response * (10 ** 9 );
            console.log(`Fetched Property "${propId}" Price: ${data} Gwei`);

            const tx = await oracleContract.fulfillData(requestId, data);
            await tx.wait();
            console.log(`Request ID ${requestId} for Property "${propId}" fulfilled with price: ${data} Gwei`);
        } catch (error) {
            console.error(`Error feeding data to oracle for Prop Id ${propId}:`, error);
        }
    });

    console.log('Listening for data requests...');
}

function fetchProperty(propertyId) {

    const filePath = "./Property-Database/sample_properties.json";
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const property = jsonData.properties.find(
        (item) => item.property_id === propertyId
    );

    if (property) {
        console.log("Property Found, Feeding Price To The Consumer...");
        return property.price_eth;
    } else {
        console.log("Property not found");
        return null;
    }
}

listenRequests();
