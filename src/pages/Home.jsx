import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorPicker from "react-best-gradient-color-picker";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TileLayout from "../components/TileLayout";

const Home = ({token}) => {
    let currentDate = new Date().toJSON().slice(0, 10);

    return (
        <div className="h-screen mx-4">
            <Navbar />
            
            <center className="h-screen">
                <h1 className="text-2xl">Ready to make good habits, <strong>{token.user.user_metadata.first_name}?</strong></h1>
                <TileLayout />
            </center>

        </div>
    )
}

export default Home;