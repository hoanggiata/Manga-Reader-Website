import InputForm from "@/components/Profile/InputForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
export const generateMetadata = ( )=>{
    return{
        title: `Profile`,
    };
};
export default async function Profile() {
    const session = await getServerSession(authOptions);
    return(
        <main className="flex flex-col bg-[#1f1f1f] min-h-screen overflow-hidden pb-10">
            <div className="flex-1 w-full flex items-center px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row max-w-[1400px] w-full justify-center ml-auto mr-auto lg:pl-[20px] lg:pr-[20px] text-white">
                    <div className="w-full lg:w-[calc(33.33%-20px)] lg:float-left mr-10 mb-10">
                        <section className="flex justify-center flex-col items-center mt-3">
                            <div className="">
                                <img src="/images/avatar2.png" alt="avatar" />
                            </div>
                            <div className="w-max mt-8 text-xl">
                                <span>{session?.user?.name?.toString()}</span>
                            </div>
                            <div className="w-max mt-8">
                                <span>Member since: 15/7/2022</span>
                            </div>
                        </section>
                    </div>
                    <div className="font-bold w-full lg:w-[37%] mb-10 lg:mb-0 text-xs text-[#DDD] lg:ml-10 px-4">
                        <section className="mb-40px block">
                            <InputForm email={session?.user?.email?.toString()} name={session?.user?.name?.toString()} />
                        </section>
                    </div>                 
                </div>
            </div>
        </main>
    );
}