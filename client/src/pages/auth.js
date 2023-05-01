import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";


const port = process.env.PORT;
export const Auth = () => {
  
  

  return (
    <div className="auth">
      <div 
          className="typer">
            Start making <Typewriter
          options={{
            // strings: [
            //   "Pasta " + "🍝".slice(0, 2),
            //   "Salad " + "🥗".slice(0, 2),
            //   "Omelettes " + "🍳".slice(0, 2),
            //   "Dumplings " + "🥟".slice(0, 2),
            //   "Tamales " + "🫔".slice(0, 2),
            //   "Oysters " + "🦪".slice(0, 2),
            //   "Hamburgers " + "🍔".slice(0, 2),
            // ],
            strings: [
              "Pasta",
              "Salad",
              "Omelettes" ,
              "Dumplings" ,
              "Tamales" ,
              "Oysters" ,
              "Hamburgers",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      <Login />
      {/* <Register /> */}
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      //const response = await axios.post(`http://localhost:3001/auth/login`, {
      //  username,
      //  password,
      //});

      const response = await axios.post(`https://reciplease-j0mk.onrender.com/auth/login`, {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      //await axios.post(`http://localhost:1000/auth/register`, {
      //  username,
      //  password,
      //});

      const response = await axios.post(`https://reciplease-j0mk.onrender.com/auth/register`, {
        username,
        password,
      });


      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert("username already exists, please log in");
      console.error(err);
      window.location.reload();
    }
  };

  return (
    <Form
      onLoginSubmit={onLoginSubmit}
      onRegisterSubmit={onRegisterSubmit}
      registerAction="Register"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
};

// const Register = () => {
//     const navigate = useNavigate();

//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")

//     const onSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.post("http://localhost:3001/auth/register", { username, password });
//             alert("Registration Completed! Now login.");
//             window.location.reload();
//         } catch (err) {
//             alert("username already exists, please log in")
//             console.error(err);
//             window.location.reload();
//         }

//     };

//     return <Form loginAction="Login" username={username} setUsername={setUsername} password={password}  setPassword={setPassword} onSubmit={onSubmit}/>;
// }

const Form = ({
  onLoginSubmit,
  onRegisterSubmit,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
}) => {
  // return (
  // <div className="auth-container">
  //     <form onSubmit={onSubmit}>
  //         <h2>{action}</h2>
  //         <div className="form-group">
  //             <label htmlFor="username">Username:</label>
  //             <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
  //         </div>
  //         <div className="form-group">
  //             <label htmlFor="password">Password:</label>
  //             <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
  //         </div>

  //         <button type="submit"> {action} </button>
  //     </form>
  // </div>
  // );
  return (
    <div className="login-form">
      <form>
        {/* <h1 className="title">Start Cooking!</h1> */}
        <div className="content">
          <div className="input-field">
            <input
              type="username"
              placeholder="Username"
              autoComplete="nope"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {/* <a href="#" class="link">Forgot Your Password?</a> */}
        </div>
        <div className="action">
          <button onClick={onLoginSubmit}>Log in</button>
          <button onClick={onRegisterSubmit}>Register</button>
        </div>
      </form>
    </div>
  );
};
