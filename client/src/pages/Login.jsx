/* eslint-disable react/prop-types */
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { useEffect, useState } from "react";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allInfo, setAllInfo] = useState("");
  const [btn, setBtn] = useState(false);

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const handleLogin = () => {
    const loginInfo = {
      username: email,
      password,
    };

    console.log(loginInfo);
    setAllInfo(loginInfo);
    setBtn(!btn);
  };

  // const [user, setUser] = useState(null);

  useEffect(() => {
    const loginUser = () => {
      fetch("http://localhost:5000/auth/form-login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(allInfo),
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Authentication has failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          // console.log(resObject);
          // setUser
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loginUser();
  }, [btn]);

  return (
    <div className="login">
      {/* <h2>name: {user}</h2> */}
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />
          <button onClick={() => handleLogin()} className="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
