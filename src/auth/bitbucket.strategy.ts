import { BASE_URL, BITBUCKET_CLIENT_ID, BITBUCKET_CLIENT_SECRET } from "../configs/env.config";
import prisma from "../prisma/prisma.client";
import passport from "passport";

// @ts-ignore
import { Strategy } from "passport-bitbucket-oauth20";
import { User } from "@prisma/client";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: User["id"], done) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    return done(null, user);
  } catch (error) {
    return done(error, undefined);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: BITBUCKET_CLIENT_ID,
      clientSecret: BITBUCKET_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/api/auth/bitbucket/callback`,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: (err: any, user: any) => any) => {
      const bitbucketId = profile.id || profile.uuid;
      const email = profile.emails.find((obj: any) => obj.primary)?.value;

      let user: User | null;

      if (!bitbucketId || !email) {
        return done("Error: bitbucket didn't provided the required information: email and/or id", undefined);
      }

      try {
        user = await prisma.user.findFirst({
          where: {
            OR: [{ email }, { bitbucketId }],
          },
        });
      } catch (error) {
        return done(error, undefined);
      }

      if (!user) {
        try {
          user = await prisma.user.create({ data: { email, bitbucketId } });
        } catch (error) {
          return done(error, undefined);
        }
      }

      return done(null, user);
    }
  )
);
