import React, { useState } from "react";
import { supabase } from "../sbclient";
import { Link, useNavigate } from "react-router-dom";

export default function Login({setToken}) {
    
    let navigate = useNavigate();

    const [formData, updateFormData] = useState({
        email: "",
        password: ""
    })
    
    const handleChange = (event) => {
        updateFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    
        console.log(formData);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
              })
            
              if (error) throw error;
              console.log(data);
              setToken(data);
              navigate('/home');

        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <div className="flex justify-center h-screen">
            <form action="" className=" py-36">
                <div className="flex flex-col space-y-3">
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="input input-bordered input-white w-full max-w-md"/>
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="input input-bordered input-white w-full max-w-md"/>
                    <button onClick={handleSubmit} className="btn btn-primary w-full max-w-md">Sign In</button>
                    <span>Don't have an account? Create an account <span className="underline text-primary"><Link to="/create">Here</Link></span></span>
                </div>
            </form>
            
        </div>
    )
}