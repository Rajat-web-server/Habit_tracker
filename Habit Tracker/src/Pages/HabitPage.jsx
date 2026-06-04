import { Habititem } from "../components/habit_item";
import { Input } from "../components/input";
import "../index.css";
export const HabitPage = ({
  updateHabit,
  deleteHabit,
  habitList,
  now,
  habit,
  setHabit,
  Submit,
}) => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center ">
        <div className="pb-4  shrink-0">
          <h2 className="p-3 font-bold text-4xl ">This is the Habit Page</h2>
       
          <div className="flex  justify-center items-center gap-4 mt-2 ">
            <Input setHabit={setHabit} habit={habit} />
            <button
              className="bg-amber-300 p-2 rounded text-cyan-950"
              onClick={Submit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">

          {habitList.map((h, index) => (
            <Habititem
              key={h.id}
              habit={h}
              index={index}
              updateHabit={updateHabit}
              deleteHabit={deleteHabit}
              now={now}
              habitList={habitList}
            />
          ))}
        </div>
      
      </div>
    </>
  );
};
