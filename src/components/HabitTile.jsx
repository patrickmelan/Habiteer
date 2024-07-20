import ProgressBar from "@ramonak/react-progress-bar";


const HabitTile = ({name, days_goal, times_per_day, hex}) => {
    //console.log(hex);
    
    return (
        <div className="flex flex-col border-2 border-sky-950 shadow-xl rounded-md w-full h-3/4">
            <ProgressBar completed={Math.round((((days_goal/2)/days_goal)*100))} baseBgColor="rgb(177, 165, 187)" maxCompleted={100} customLabel="" bgColor={hex} />
            <h1>{name}</h1>
            <h1>Goal: {days_goal} days</h1>
            <h1>Do it {times_per_day} times per day</h1>
            <h1>In that time, I will do it a total of {times_per_day * days_goal} times! WOW!</h1>
            <h1 style={{ color: hex}}>color = {hex}</h1>
        </div>
    )
}

export default HabitTile;