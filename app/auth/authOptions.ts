import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/app/utils/connect'
import { NextAuthOptions } from 'next-auth'
import VkProvider from "next-auth/providers/vk";

const clientId = process.env.VK_CLIENT_ID
const clientSecret = process.env.VK_CLIENT_SECRET

if (!clientId || !clientSecret) {
  throw new Error('VK_CLIENT_ID and VK_CLIENT_SECRET must be defined in your environment')
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    VkProvider({
        clientId,
        clientSecret,
    })
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account) {
    //     account.userId = String(account.user_id);
    //   }
    //   return true;
    // },
    async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.userId = account.user_id
        }
        return token
      },
    //   async session({ session, token, user }) {
    //     // Send properties to the client, like an access_token from a provider.
    //     session.accessToken = token.accessToken
    //     return session
    //   }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
