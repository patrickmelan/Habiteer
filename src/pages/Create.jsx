import React, { useState } from "react";
import { supabase } from "../sbclient";
import { Link, useNavigate } from "react-router-dom";

export default function Create({setToken}) {

    let navigate = useNavigate();

    const [formData, updateFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
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
    
    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                  emailRedirectTo: 'https://www.example.com/',
                  data: {
                    first_name: formData.first_name,
                    last_name: formData.last_name
                  }
                },
              })
              
              if (error) throw error;
              console.log(data);
              setToken(data);
              navigate('/home');

            //alert("Check email for verification link!")

            const { data2, error2 } = await supabase
            .from('user')
            .insert([{   
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                user_uid: data.user.id
            }])


        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <div className="flex justify-center h-screen">
            <form action="" className=" py-36">
                <div className="flex flex-col space-y-3">
                    <div className="flex space-x-3">
                        <input type="text" name="first_name" onChange={handleChange} placeholder="First Name" required className="input input-bordered input-white "/>
                        <input type="text" name="last_name" onChange={handleChange} placeholder="Last Name" required className="input input-bordered input-white "/>
                    </div>
    
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="input input-bordered input-white w-full max-w-md"/>
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="input input-bordered input-white w-full max-w-md"/>
                    <button onClick={handleSubmit} className="btn btn-primary w-full max-w-md">Create Account</button>
                    <span>Already have an account? Login <span className="underline text-primary"><Link to="/login">Here</Link></span></span>
                </div>
            </form>
            
        </div>
    )

}




