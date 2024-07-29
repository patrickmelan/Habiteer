import { useEffect, useState } from "react";
import AddHabitCard from "./AddHabitCard";
import HabitTile from "./HabitTile";
import { supabase } from "../sbclient";


const TileLayout = () => {
    const [habits, setHabits] = useState([{}]);
    
    async function GetHabits() {
        let { data: habits, error } = await supabase
        .from('habits')
        .select()
        .eq('user_id', (await supabase.auth.getUser()).data.user.id);

        //console.log(habits);

        setHabits(habits);
    }

    useEffect(() => {
        GetHabits();
        //console.log(habits);
    }, [])
    
    return (
        <div>
            <div className="grid h-full grid-cols-1 md:grid-cols-5 mt-4 space-x-4 space-y-2">
                {habits ? habits.map((habit) => 
                    <div className="">
                        <HabitTile id={habit.id} name={habit.name} streak={habit.streak} days_goal={habit.days_goal} times_per_day={habit.times_per_day} hex={habit.color_hex}/>
                    </div>
                ) : <h1>No Habits!</h1>}
                <AddHabitCard />
            </div>
        </div>
    )
}

export default TileLayout;