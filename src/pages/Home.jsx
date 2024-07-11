import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    return (
      <div className="flex justify-center flex-col">
          <div className="flex flex-col h-screen w-full items-center text-white">
            
            <span className="text-6xl">Welcome to <span className="bg-gradient-to-r from-green-200 via-indigo-300 to-purple-400 inline-block text-transparent bg-clip-text">Habiteer</span>.</span>
            <p>Where your habits grow with you.</p>
            <div className="flex space-x-4">
              <button class="btn btn-primary rounded-full mt-4"><Link to="/auth">Create your first habit</Link></button>
              <button class="btn btn-primary rounded-full mt-4"><Link to="/auth">Create your first habit</Link></button>  
            </div>
        </div>
        <div>
          <h1>hello there</h1>
        </div>
      </div>
    );
  }
  
  export default Home;