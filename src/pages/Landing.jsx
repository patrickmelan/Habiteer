import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
    return (
      <div className="flex justify-center flex-col">
          <div className="flex flex-col h-screen w-full items-center ">
            
            <span className="text-6xl text-white"><span className="bg-gradient-to-r from-green-200 via-indigo-300 to-purple-400 inline-block text-transparent bg-clip-text">Habiteer.</span></span>
            <p>Where your habits grow with you.</p>
            <div className="flex space-x-4">
              <button class="btn btn-success rounded-md mt-4"><Link to="/create">Create an Account</Link></button>
              <button class="btn btn-secondary rounded-md mt-4"><Link to="/login">Login</Link></button>  
            </div>
        </div>
      </div>
    );
  }
  
  export default Landing;