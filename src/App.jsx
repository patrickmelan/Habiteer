import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Create from "./pages/Create";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/create" element={<Create />}></Route>
                        <Route path="*" element={<Home />}></Route>
                    </Routes>
            </BrowserRouter>


        </div>
    )
}