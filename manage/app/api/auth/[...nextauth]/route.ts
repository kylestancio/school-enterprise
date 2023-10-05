import prisma from "@/lib/prisma";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import PocketBase from 'pocketbase'
import * as bcrypt from 'bcrypt'

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL;
const pb = new PocketBase(POCKETBASE_URL);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        if (!credentials?.username || !credentials?.password) return null;

        const query = await prisma.user.findFirst({
          where: {
            username: credentials.username
          }
        })
        if (!query) return null;

        if (await bcrypt.compare(credentials.password, query.password)){
          const { password, ...user } = query;
          
          return user;
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({token, user}:any){
      if (user){
        token.user = user
      }

      return token;
    },
    async session({session, token}:any){
      session.user = token.user

      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET}