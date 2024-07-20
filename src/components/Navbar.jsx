import { useNavigate } from "react-router-dom";
import AppLogo from "./AppLogo.jsx";

function Navbar({logout}) {
    let navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/landing");
    }

    return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl" href="#"><AppLogo size={30}/>Habiteer</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li>
                <details>
                <summary>Account</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                    <li onClick={handleLogout}><a>Logout</a></li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
    </div>
    );
  }
  
  export default Navbar;