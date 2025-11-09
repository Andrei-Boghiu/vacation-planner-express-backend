import express from "express";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";
import jwt from "jsonwebtoken";

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(session({ secret: "change_this_secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Bitbucket OAuth Strategy
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

passport.use();

// 1️⃣ Bitbucket OAuth endpoints
app.get("/auth/bitbucket", passport.authenticate("bitbucket"));

app.get(
  "/auth/bitbucket/callback",
  passport.authenticate("bitbucket", { failureRedirect: "/login-failed" }),
  (req, res) => {
    // On successful login, issue JWT
    const token = jwt.sign({ username: req.user?.profile.username }, process.env.JWT_SECRET || "change_this_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  }
);

// 2️⃣ Public endpoint
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// JWT middleware
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || "change_this_secret", (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 3️⃣ Private endpoint
app.get("/private", authenticateToken, (req, res) => {
  res.json({ data: "private data" });
});

export default app;
