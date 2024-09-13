import LoginForm from "@/components/SignIn/LoginForm";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function SignIn() {
    return(
        <main className="w-full min-h-screen bg-[#1f1f1f]">
            <LoginForm/>
        </main>     
    );
}