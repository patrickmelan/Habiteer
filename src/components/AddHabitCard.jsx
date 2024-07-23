import { useNavigate } from "react-router-dom";
import AddSign from "./AddSign";

const AddHabitCard = () => {
    let navigate = useNavigate();
    
    return (
        <div>
            <div onClick={() => navigate("/add")} className="h-full w-full border-x-neutral-400 border-2 hover:shadow-xl hover:cursor-pointer rounded-lg">
                <h1 className="text-2xl pt-6">Add Habit!</h1>
                <AddSign />
            </div>
        </div>
    )
}

export default AddHabitCard