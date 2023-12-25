const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model");

const GOOGLE_CLIENT_ID =
  ""
const GOOGLE_CLIENT_SECRET = 

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // done(null, profile);
      // akhane mongodb database e store korar jnne code likte hbe

      User.findOne({ googleId: profile.id })
        .exec()
        .then((existingUser) => {
          if (existingUser) {
            // User already exists, no need to create a new one
            return done(null, existingUser);
          }
          // Create a new user in your database

          const newUser = new User({
            googleId: profile?.id,
            email: profile?.emails[0]?.value,
            displayName: profile?.displayName,
            img: profile?.photos[0]?.value,
            // Other fields you want to save
          });
          return newUser.save();
        })
        .then((newUser) => done(null, newUser))
        .catch((err) => done(err));
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("User", username);
      const user = await User.findOne({ email: username });

      if (!user) return done(null, false);

      if (user.password !== password) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
