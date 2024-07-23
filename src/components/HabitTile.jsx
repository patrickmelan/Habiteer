import ProgressBar from "@ramonak/react-progress-bar";

const HabitTile = ({name, days_goal, times_per_day, hex}) => {
    
    return (
        <div className="flex flex-col border-zinc-900 border-2 shadow-2xl py-4 items-center px-4 rounded-lg w-full h-full">
            <ProgressBar completed={Math.round((((days_goal/2)/days_goal)*100))} className="w-full" baseBgColor="rgb(177, 165, 187)" maxCompleted={100} customLabel="" bgColor={hex} />
            <div className="text-center">
                <h1 className="pt-2 text-xl text-white">{name}</h1>
                <h1>Goal: {days_goal} days</h1>
                <h1>Freq: {times_per_day} times per day</h1>
            </div>
        </div>
    )
}

export default HabitTile;