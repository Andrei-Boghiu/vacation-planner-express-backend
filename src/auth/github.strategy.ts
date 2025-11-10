import { BASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../configs/env.config";
import prisma from "../prisma/prisma.client";
import passport from "passport";
import { Strategy } from "passport-github2";
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
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },
    async (accessToken: any, refreshToken: any, profile: any, done: (err: any, user: any) => any) => {
      const githubId = profile.id;
      const email: string = profile.email || profile.emails[0].value;
      let user: User | null;

      if (!githubId || !email) {
        return done("Error: github didn't provided the required information: email and id", undefined);
      }

      try {
        user = await prisma.user.findFirst({
          where: {
            OR: [{ email }, { githubId }],
          },
        });
      } catch (error) {
        return done(error, undefined);
      }

      if (!user) {
        try {
          user = await prisma.user.create({ data: { email, githubId } });
        } catch (error) {
          return done(error, undefined);
        }
      }

      return done(null, user);
    }
  )
);
