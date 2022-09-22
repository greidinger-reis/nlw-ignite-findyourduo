import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          emailVerified: profile.verified,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${
                profile.discriminator % 5
              }.png`,
          discriminator: profile.discriminator,
        };
      },
    }),
    // ...add more providers here
  ],
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.disciminator = user.discriminator as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
