import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import HabitTile from "../components/HabitTile";
import { useNavigate } from "react-router-dom";
import { supabase } from "../sbclient";
import Navbar from "../components/Navbar";

export default function AddHabit({token}) {

    const [color, setColor] = useState('rgba(255, 255, 255, 1)');
    let navigate = useNavigate();
    const [formData, updateFormData] = useState({
        name: "",
        streak: 0,
        color_hex: color,
        dates_completed: [""],
        times_per_day: 1,
        days_goal: ""
    })
    
    const handleChange = (event) => {
        updateFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            
            const { data, error } = await supabase
            .from("habits")
            .insert([
                    {
                        name: formData.name,
                        streak: formData.streak,
                        color_hex: color,
                        dates_completed: formData.dates_completed,
                        times_per_day: formData.times_per_day,
                        days_goal: formData.days_goal,
                        user_id: (await supabase.auth.getUser()).data.user.id,
                        streak: 0
                    }
            ], { returning: 'minimal' }).select('*')
            //console.log(formData);
            //console.log(supabase.auth.getUser());
            if (error) {
                console.log("Error found: ", error);
            };

            navigate("/home");
        } catch (error) {
            alert(error);
        }
    } 

    return (
        <div className="flex flex-col items-center">
            
            <h1 className="text-4xl py-8 text-white font-bold">Add a Habit here!</h1>

            <div className="grid grid-cols-2 divide-x-2 divide-zinc-500">
                <div className="flex flex-col items-center h-5/6 space-y-4 pr-16">
                    <h2>Create</h2>
                    <div className="flex flex-col items-center space-y-2">
                        <input type="text" name="name" onChange={handleChange} placeholder="Habit Name?" required className="input w-full input-bordered input-white "/>
                        <input className="input w-full input-bordered input-white" type="number" max={1000} name="days_goal" onChange={handleChange} placeholder="Goal (Days)?" required />
                    </div>

                    <div className="flex w-full">
                        <ColorPicker id="color" value={color} onChange={setColor} hidePresets={true} hideControls={true} hideOpacity={true} hideInputs={true} />     
                    </div>             
                </div>
                <div className="hidden flex-col md:block items-center h-5/6 space-y-4 px-8 pb-8">
                    <h2>Preview</h2>
                    <HabitTile  name={formData.name} hex={color} times_per_day={formData.times_per_day} days_goal={formData.days_goal}/>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit} >Add this Habit</button>
        </div>
    )
}

//<input className="input w-1/3 input-bordered input-white" type="number" max={24}  name="times_per_day" onChange={handleChange} placeholder="Times/Day?" required />