import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../configs/env.config";
import prisma from "../prisma/prisma.client";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
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
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/api/auth/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const email = profile._json.email as string;
      let user: User | null;

      if (!googleId) {
        return done("Error: google didn't provided the required information: email and id", undefined);
      }

      try {
        user = await prisma.user.findFirst({
          where: {
            OR: [{ email }, { googleId }],
          },
        });
      } catch (error) {
        return done(error, undefined);
      }

      if (!user) {
        try {
          user = await prisma.user.create({ data: { email, googleId } });
        } catch (error) {
          return done(error, undefined);
        }
      }

      return done(null, user);
    }
  )
);
