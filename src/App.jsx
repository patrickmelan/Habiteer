import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import AddHabit from "./pages/AddHabit";

export default function App() {
    
    const [token, setToken] = useState(false)

    if(token){
        sessionStorage.setItem('token',JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
        let data = JSON.parse(sessionStorage.getItem('token'))
        setToken(data)
        }
        
    }, [])
    
    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route index element={<Landing />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/login" element={<Login setToken={setToken} />} />
                        <Route path="/create" element={<Create setToken={setToken} />} />
                        {token ? <Route path="/home" element={ <Home token={token}/>} /> : ""}
                        <Route path="*" element={<Landing />} />
                        {token ? <Route path="/add" element={<AddHabit token={token}/>} /> : ""}
                    </Routes>
            </BrowserRouter>


        </div>
    )
}