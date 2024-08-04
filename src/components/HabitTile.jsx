//imports
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { supabase } from "../sbclient";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HabitTile = ({id, name, streak, days_goal, preview, times_per_day, hex}) => {
    const [times_today, setToday] = useState([]);
    let today = new Date().toLocaleDateString('en-CA', {timeZone: "UTC"});
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toLocaleDateString('en-CA', {timeZone: "UTC"});
    //console.log(today);
    //console.log(yesterday);
    const [varStreak, setStreak] = useState(streak);
 
    //const uid = async () => (await supabase.auth.getUser()).data.user.id;

    async function log(e) {
        e.preventDefault();
        
        // checks if the amount of logs today is less than the amount the user inputted
        if (times_today && times_today.length < 1) {
            try {
                //log habit to supabase db
                const { data, error } = await supabase
                .from("date_log")
                .insert(
                    {
                        habit_id: id,
                        user_id: (await supabase.auth.getUser()).data.user.id,
                        date: today
                    }
                , { returning: 'minimal' }).select('*')
    
                if (error) {
                    console.log("Error found: ", error);
                }
                
                checkToday();

                if (times_today && times_per_day == times_today.length) {
                    changeStreak(varStreak+1);
                }
            
            } catch (error) {
                alert(error);
            
            }
        } 
          
    }

    async function checkToday() {
        try {
            const { data, error } = await supabase
            .from("date_log")
            .select("created_at")
            .eq('habit_id', id)
            .eq("date", today)
            
            const { data2, error2 } = await supabase
            .from("date_log")
            .select("created_at")
            .eq('habit_id', id)
            .eq("date", yesterday)

            if (data2 && data2.length == 0) {
                changeStreak(0);
            }

            setToday(data);

        } catch (error) {
            alert(error)
        } 
    }

    async function changeStreak(changeTo) {
        setStreak(changeTo);
        
        try {
            const { data, error } = await supabase
            .from("habits")
            .update({'streak': changeTo})
            .eq('user_id', (await supabase.auth.getUser()).data.user.id)
            .eq('id', id)

            if(data) {
                console.log(data);
            }

            if(error) {
                console.log(error)
            }
            

        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        checkToday();
    }, [])

    return (
        <div className="flex flex-col border-zinc-900 border-2 shadow-2xl py-4 px-4 rounded-lg w-full h-full">
            <div className="text-left">
                {streak != 0 ? <ProgressBar completed={preview ? 50 : Math.round((((streak)/days_goal)*100))} className="w-full" baseBgColor="rgb(177, 165, 187)" maxCompleted={100} bgColor={hex} /> : ""}
            </div>
            <div className="text-center">
                <h1 className="pt-2 text-xl text-white">{name ? name : "{Type habit name}"}</h1>
                <h1>Goal: {days_goal ? days_goal : "{Type your goal}"} days</h1>
                
                <h1>You're on a {varStreak ? varStreak : "0"} day streak!</h1>
                <button style={{'background-color': 'black'}} className="btn my-2" onClick={log}>{times_today && times_today.length == times_per_day ? <h1>All Done!</h1> : <h1>Log Today</h1>}({times_today ? times_today.length : 0}/{times_per_day})</button>
            </div>
        </div>
    )
}

export default HabitTile;

//<h1>{times_per_day ? times_per_day : "{Times per day}"}x/Day</h1>