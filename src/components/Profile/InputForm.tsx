"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import { signIn } from "next-auth/react";
export default function InputForm({ email, name } :{email: string, name: string}) {
    const [isClicked, setIsClicked] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [displayName,setDisplayName] = useState(name);
    const handleHideShow = () => {
        setIsClicked(!isClicked);
    }
    const handleOnClick = (event) => {
        setShouldFetch(!shouldFetch);
    }
    useEffect(() => {
        const changePasswordElement = document.getElementById("change-password");
        if (changePasswordElement) {
            changePasswordElement.addEventListener("input", validateForm);
        }

        return () => {
            if (changePasswordElement) {
                changePasswordElement.removeEventListener("input", validateForm);
            }
        };
    }, []);

    const validateForm = () => {
        const currentPassword = document.getElementById("password")?.value;
        const newPassword = document.getElementById("newPassword")?.value;
        const confirmPassword = document.getElementById("confirmPassword")?.value;
        if((newPassword !== confirmPassword) || (newPassword === "") || (confirmPassword === "")){
            setError("Passwords do not match");
            return;
        }
        else
        {
            setError("");
            setIsValid(!isValid);
            return;
        }
    }
    const handleOnChange = (event) => {
        setDisplayName(event.target.value);
    }
    useEffect(() => {
        const fetchData = async () => {
            if(shouldFetch && isValid ){
                const currentPassword = document.getElementById("password")?.value;
                const newPassword = document.getElementById("newPassword")?.value;
                try {
                    const respond = await fetch(`/api/user/checkPassword`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({currentPassword,email})
                    })
                    if(respond.status === 200){
                        try {
                            const respondChange = await fetch(`/api/user/changePassword`,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({email,newPassword})
                            })
                            if(respondChange.status === 200){
                                toast.success("Password changed");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);
                            }
                        } catch (error) {
                            console.error("Error: ",error);
                        }
                    }
                    else {toast.error("Invalid password");}
                } catch (error) {
                    console.error("Error: ",error);
                }
            }
            else if(shouldFetch && !isValid)
            {
                const displayName = document.getElementById("name")?.value;
                try {
                    const respond = await fetch(`/api/user/changeDisplayName`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({email,displayName})
                    })
                    const respondMessage = await respond.json();
                    if(respond.status === 200){
                        toast.success(respondMessage.message);
                        setTimeout(async () => {
                            window.location.reload();
                        }, 2000);
                    }
                    else {                        
                        toast.error("Failed to change display name: ",respondMessage.message);
                    }
                } catch (error) {
                    console.error("Error: ",error);
                }
            }               
        };       
            fetchData()
    })

    return (
        <form action="submit" className="h-[480px]" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-5">
                <label htmlFor="email" className="opacity-70 tracking-[1px]">EMAIL ADDRESS</label>
                <Input name="email" type="email" placeholder="Email" className="bg-[#3f3f3f] border-none mt-2" value={email} disabled/>
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="opacity-70 tracking-[1px]">DISPLAY NAME</label>
                <Input name="name" type="text" id="name" placeholder="Name" className="bg-[#3f3f3f] border-none mt-2" value={displayName} onChange={handleOnChange}/>
            </div>
            <div className="mb-5 flex items-center cursor-pointer">
                <img src="/images/lock.png" className="" alt="lock" />
                <span className="ml-1 tracking-[1px] pt-1" onClick={handleHideShow}>CHANGE PASSWORD</span>
            </div>
            <div id="change-password" className={`change-password-form transition-all duration-500 ease-in-out overflow-hidden ${isClicked ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                {
                    error && (
                    <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mb-5">
                    {error}
                    </div>                   
                )}
                <div className="mb-5">
                    <label htmlFor="password" className="opacity-70 tracking-[1px]">CURRENT PASSWORD</label>
                    <Input name="password" id="password" type="password" placeholder="Leave this field empty if you haven’t set a password." className="bg-[#3f3f3f] border-none mt-2"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="opacity-70 tracking-[1px]">NEW PASSWORD</label>
                    <Input name="newPassword" type="password" id="newPassword" className="bg-[#3f3f3f] border-none mt-2"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="opacity-70 tracking-[1px]">CONFIRM NEW PASSWORD</label>
                    <Input name="confirmPassword" type="password" id="confirmPassword" className="bg-[#3f3f3f] border-none mt-2"/>
                </div>
            </div>
            <Button className={`bg-[#FFD700] hover:bg-[#FFEC8B] text-[#000000] font-bold cursor-pointer px-6 py-2`}
            aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-vertically-centered-modal" data-hs-overlay="#hs-vertically-centered-modal">Save</Button>
            
            <div id="hs-vertically-centered-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-vertically-centered-modal-label">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="w-full flex flex-col border shadow-sm rounded-xl pointer-events-auto bg-neutral-800 border-neutral-700 shadow-neutral-700/70">
                        <div className="flex justify-between items-center py-3 px-4 border-b border-neutral-700">
                            <h3 id="hs-vertically-centered-modal-label" className="font-bold text-lg text-white">
                            Change Password
                            </h3>
                            <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none bg-neutral-700 hover:bg-neutral-600 text-neutral-400 focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-vertically-centered-modal">
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <p className=" dark:text-neutral-400 text-base">
                            Are you sure you want to save the changes?
                            </p>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-neutral-700">
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-vertically-centered-modal">
                            Cancel
                            </button>
                            <button type="button" onClick={handleOnClick} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#FFD700] text-[#000000] hover:bg-[#FFEC8B] focus:outline-none focus:bg-[#FFD700] disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-vertically-centered-modal">
                            Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}