import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import { supabase } from "../sbclient";

const HabitTile = ({id, name, days_goal, times_per_day, hex}) => {

    
    async function log(e) {
        e.preventDefault();
        
        try {
            const { data, error } = await supabase
            .from("date_log")
            .insert(
                {
                    habit_id: id,
                    user_id: (await supabase.auth.getUser()).data.user.id
                }
            , { returning: 'minimal' }).select('*')

            console.log(data);
            console.log((await supabase.auth.getUser()).data.user.id);

            if (error) {
                console.log("Error found: ", error);
            };
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div className="flex flex-col border-zinc-900 border-2 shadow-2xl py-4 px-4 rounded-lg w-full h-full">
            <div className="text-left">
                <ProgressBar completed={Math.round((((days_goal/2)/days_goal)*100))} className="w-full" baseBgColor="rgb(177, 165, 187)" maxCompleted={100} customLabel="" bgColor={hex} />
            </div>
            <div className="text-center">
                <h1 className="pt-2 text-xl text-white">{name}</h1>
                <h1>Goal: {days_goal} days</h1>
                <h1>{times_per_day}x/Day</h1>
                <button className="btn my-2" onClick={log}>Log Today</button>
            </div>
        </div>
    )
}

export default HabitTile;