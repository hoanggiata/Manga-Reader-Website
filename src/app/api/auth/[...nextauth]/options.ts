import type { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials:{},
            async function authorize(credentials) {
                
            }
        }),
    ],
    pages:{
        signIn: "/auth/sign-in",
    }
}