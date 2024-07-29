import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { supabase } from "../sbclient";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HabitTile = ({id, name, streak, days_goal, times_per_day, hex}) => {
    const [times_today, setToday] = useState([]);
    let today = new Date().toLocaleDateString('en-CA', {timeZone: "UTC"});
    const [done, setDone] = useState(false);
    //const uid = async () => (await supabase.auth.getUser()).data.user.id;

    async function log(e) {
        e.preventDefault();
        
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
            };
        } catch (error) {
            alert(error);
        }
        
        todayfunc();
    }

    async function todayfunc() {
        try {
            const { data, error } = await supabase
            .from("date_log")
            .select("created_at")
            .eq('habit_id', id)
            .eq("date", today)

            setToday(data);

            if (!done && times_today == times_per_day) {
                addToStreak();
                setDone(true)
            }

        } catch (error) {
            alert(error)
        } 
    }

    async function addToStreak() {
        try {
            const { data, error } = await supabase
            .from("habits")
            .update({'streak': streak+1})
            .eq('user_id', (await supabase.auth.getUser()).data.user.id)

            streak += 1;

        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        todayfunc();
    }, [])




    return (
        <div className="flex flex-col border-zinc-900 border-2 shadow-2xl py-4 px-4 rounded-lg w-full h-full">
            <div className="text-left">
                <ProgressBar completed={Math.round((((days_goal/2)/days_goal)*100))} className="w-full" baseBgColor="rgb(177, 165, 187)" maxCompleted={100} customLabel="" bgColor={hex} />
            </div>
            <div className="text-center">
                <h1 className="pt-2 text-xl text-white">{name}</h1>
                <h1>Goal: {days_goal} days</h1>
                <h1>{times_per_day}x/Day</h1>
                <h1>You're on a {streak} day streak!</h1>
                <button style={{'background-color': 'black'}} className="btn my-2" onClick={log}>Log Today ({times_today ? times_today.length : 0}/{times_per_day})</button>
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    )
}

export default HabitTile;