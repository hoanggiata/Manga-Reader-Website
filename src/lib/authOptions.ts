import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
                    const user = await User.findOne({email});
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
            if (user) {
                token.user = user;
                token.accessToken = jwt.sign({ user }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h' });
                token.refreshToken = jwt.sign({ user }, process.env.NEXTAUTH_SECRET, { expiresIn: '7d' });
            }

            // Check if the access token has expired
            if (Date.now() / 1000 > token.exp) {
                try {
                    const newAccessToken = jwt.sign({ user: token.user }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h' });
                    token.accessToken = newAccessToken;
                } catch (error) {
                    console.log("Error refreshing access token: ", error);
                }
            }

            return token;;
        },
        async session({ session, token, user }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            await connectMongoDB();
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.name = dbUser.name; // Update session with the latest data
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/auth/sign-in",
    },
};

