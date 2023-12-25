const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const { connectMongoose } = require("./database");
const cookieParser = require("cookie-parser");
const app = express();

connectMongoose();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cookieSession({ name: "session", keys: ["arko"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
//     credentials: true,
//   })
// );

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});
