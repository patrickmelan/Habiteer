import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorPicker from "react-best-gradient-color-picker";

const Home = ({token}) => {
    
    let navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }

    const [formData, updateFormData] = useState({
        name: "",
        streak: 0,
        color_hex: "",
        dates_completed: [""],
        user_id: token.user.user_metadata.id
    })
    
    const handleChange = (event) => {
        updateFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    
        //console.log(formData);
    }

    const [color, setColor] = useState('rgba(255, 255, 255, 1)');

    return (
        <div>
            <h1>Ready to make good habits, {token.user.user_metadata.first_name}?</h1>
            <button onClick={handleLogout} className="btn btn-secondary"> Logout</button>
            <button className="btn btn-primary ml-8">Create a Habit</button>

        </div>
    )
}

export default Home;