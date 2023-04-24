import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import {useNavigate } from 'react-router-dom';
import logo from "./img/logo.png"


export const Navbar = () => { 
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    var img = new Image();
    img.src = "./img/logo.png"

    return (<div><div className="navbar">
        <ul>
        <img src={logo} alt="logo" />
        <li><Link to="/">Home</Link></li>
        {!cookies.access_token ? (
            <li><Link to="/auth">Login/Register</Link></li>
        ) : (<>
        <div>
            <li><Link to="/create-recipe">Create Recipe</Link></li>
            <li><Link to="/saved-recipes">Saved Recipes</Link></li>
            <li ><Link to="/search">Search</Link></li>
            <li ><Link to="/profile">Learn</Link></li>
                <li className="logout" ><button  onClick={logout}> Logout </button></li>
            
            <p className="barrier">____________________________________________________________________________________________________________________________________________</p>
            </div>
            </>
        )}
        </ul>
    </div>
    </div>)
}