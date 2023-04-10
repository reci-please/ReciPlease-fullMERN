import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export const Auth = () => {
    return <div className="auth">
        <Login />
        <Register />
    </div>
}


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [ , setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            alert(window.localStorage.getItem("userID"));
            navigate("/auth");
        } catch (err) {
            console.error(err);
        }
    };

    return <Form action="Login" username={username} setUsername={setUsername} password={password} setPassword={setPassword} onSubmit={onSubmit} />
}

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("Registration Completed! Now login.");
            window.location.reload();
        } catch (err) {
            alert("username already exists, please log in")
            console.error(err);
            window.location.reload();
        }

    };

    return <Form action="Register" username={username} setUsername={setUsername} password={password}  setPassword={setPassword} onSubmit={onSubmit}/>;
}

const Form = ({action, username, setUsername, password, setPassword, onSubmit}) => {
    return (<div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>{action}</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <button type="submit"> {action} </button>
        </form>
    </div>);
}