import { Router } from "express";
import passport from "passport";
import { SUCCESS_AUTH_REDIRECT } from "../configs/env.config";

const router = Router();

router.get("/discord", passport.authenticate("discord"));
router.get("/discord/callback", passport.authenticate("discord"), (_, res) => {
  res.redirect(SUCCESS_AUTH_REDIRECT);
});

router.get("/bitbucket", passport.authenticate("bitbucket"));
router.get("/bitbucket/callback", passport.authenticate("bitbucket"), (_, res) => {
  res.redirect(SUCCESS_AUTH_REDIRECT);
});

router.get("/github", passport.authenticate("github"));
router.get("/github/callback", passport.authenticate("github"), (_, res) => {
  res.redirect(SUCCESS_AUTH_REDIRECT);
});

router.get("/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google"), (_, res) => {
  res.redirect(SUCCESS_AUTH_REDIRECT);
});

export default router;
