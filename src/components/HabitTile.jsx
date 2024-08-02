//imports
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { supabase } from "../sbclient";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HabitTile = ({id, name, streak, days_goal, times_per_day, hex}) => {
    const [times_today, setToday] = useState([]);
    let today = new Date().toLocaleDateString('en-CA', {timeZone: "UTC"});
    const [varStreak, setStreak] = useState(streak);
 
    //const uid = async () => (await supabase.auth.getUser()).data.user.id;

    async function log(e) {
        e.preventDefault();
        
        if (times_today && times_per_day > times_today.length) {
            try {
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

            setToday(data);


        } catch (error) {
            alert(error)
        } 
    }

    async function addToStreak() {
        setStreak(streak + 1);
        
        try {
            const { data, error } = await supabase
            .from("habits")
            .update({'streak': varStreak})
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
                {streak != 0 ? <ProgressBar completed={Math.round((((streak)/days_goal)*100))} className="w-full" baseBgColor="rgb(177, 165, 187)" maxCompleted={100} bgColor={hex} /> : ""}
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