"use client"
import { Oval } from "react-loader-spinner";
export default function Loading() {
    return (<Oval
        visible={true}
        height="80"
        width="80"
        color="#FFD700"
        secondaryColor="#2f2f2f"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass="flex justify-center"
        />);
}