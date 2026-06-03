import { Habititem } from "../components/habit_item";
import { Input } from "../components/input";
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
      <div style={{
        paddingTop:"400px"
      }
      }>
        <h2 style={{ padding: "25px" }}>This is the Habit Page</h2>
        <Input setHabit={setHabit} habit={habit} />
        <button onClick={Submit}>Submit</button>
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
    </>
  );
};
