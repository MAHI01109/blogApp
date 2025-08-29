import express from "express";
import cors from "cors";
import { corsOptions } from "./configs/cors.config.js";
import session from "express-session";
import passport from "passport";

import authRoutes from "./routes/auth.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import contactUsRoutes from "./routes/contact.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import { configurePassport } from "./configs/passport.config.js";

const app = express();

app.use(cors(corsOptions));

app.use(
  session({
    secret: "any long secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/blog/", blogsRoutes);
app.use("/api/v1/blog/comment/", commentRoutes);
app.use("/api/v1/contact-us/", contactUsRoutes);

export default app;
