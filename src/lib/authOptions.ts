import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions:NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "credentials",
            credentials:{},

            async authorize(credentials)
            {
                const {email,password} = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({email,type:"credentials"});
                    if(!user)
                    {
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password,user.password);
                    if(!passwordMatch)
                    {
                        
                        return null;
                    }               
                    return user;
                } catch (error) {
                    console.log("Error: ",error);
                }
                return null;
            },
        }),
    ],
    callbacks:{
        async signIn({user, account})
        {
            if(account?.provider === "google")
            {
                const {name,email} = user;
                try {

                    await connectMongoDB();

                    const userExists = await User.findOne({email,type:"google"});
                    if(!userExists)
                    {
                        const res = await fetch(`http://localhost:3000/api/user`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({name,email})
                        });
                        if(res.ok)
                        {
                            return user;
                        }
                    }
                    return userExists;              
                } catch (error) {
                    console.log(error);
                }   
            }
            return user;
        },
        async redirect({url,baseUrl})
        {
            return baseUrl;
        },
        async jwt({token,user})
        {
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            // session.user.id = token.id
            // session.user.name = token.name
            session.user = token.user;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/auth/sign-in",
    },
};

