import { BASE_URL, DISCORD_CALLBACK_PATH, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "../configs/env.config";
import prisma from "../prisma/prisma.client";
import passport from "passport";
import { Strategy } from "passport-discord";
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
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: `${BASE_URL}${DISCORD_CALLBACK_PATH}`,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const discordId = profile.id;
      const email = profile.email as string;
      let user: User | null;

      if (!discordId || !email) {
        return done("Error: discord didn't provided the required information: email and id", undefined);
      }

      try {
        user = await prisma.user.findUnique({ where: { discordId } });
      } catch (error) {
        return done(error, undefined);
      }

      if (!user) {
        try {
          user = await prisma.user.create({ data: { email, discordId } });
        } catch (error) {
          return done(error, undefined);
        }
      }

      return done(null, user);
    }
  )
);
