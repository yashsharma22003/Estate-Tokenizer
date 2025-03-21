"use client"
import { useRouter } from "next/navigation";

export const Page = () => {

    const router = useRouter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-2">

            <div className="bg-gray-100 p-10 rounded-lg text-center ">

                <img src={"/registry.jpg"} className="" />
                <button className="mt-10 p-2 border-2 rounded-md border-gray-600 hover:bg-gray-300 transition-colors" onClick={() =>router.push("/request")}> Request Tokenization</button>
            </div>
            <div className="bg-gray-100 p-10 rounded-lg text-center ">
                <img src={"/property-listing.jpg"} className="h-44 ml-2"/>
                <button className="mt-8 p-2 border-2 rounded-md border-gray-600 w-32 hover:bg-gray-300 transition-colors" onClick = {() => router.push("/listings")}> Listings </button>
            </div>

        </div>
    );
};

export default Page;
