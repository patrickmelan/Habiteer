import AddHabitCard from "./AddHabitCard";
import HabitTile from "./HabitTile";


const TileLayout = () => {
    return (
        <div>
            <div className="grid h-full grid-cols-5 space-x-4">
                <HabitTile />
                <HabitTile />
                <HabitTile />
                <AddHabitCard />
            </div>
        </div>
    )
}

export default TileLayout;