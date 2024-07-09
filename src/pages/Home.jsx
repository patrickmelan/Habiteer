import Navbar from "../components/Navbar";

function Home() {
    return (
      <div className="flex justify-center">
          <div className="flex flex-col">
            <Navbar />
            <span className="text-6xl">Welcome to <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-400 inline-block text-transparent bg-clip-text">Habiteer</span>.</span>
            <p>Where your habits grow with you.</p>
            <button class="btn btn-primary rounded-full mt-4">Click ME!</button>
        </div>
      </div>
    );
  }
  
  export default Home;