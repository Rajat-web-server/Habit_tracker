import { create } from 'zustand'

const useHabit = create((set) => ({
  habit: "",
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))

const usehabitList = create((set)=>(
    {
        habitList:[],
        deleteHabit: (index)=>set((state)=>({
            habitList:state.habitList.filter((_,i)=>i!==index)
        })),
        updatehabit:((index,newValue)=>set((state) => {
    const updatedHabits = [...state.habitList]
    updatedHabits[index] = newValue
    return { habitList: updatedHabits }
  })),
  addhabit:(habit)=>set((state)=>({
    habitList:[...state.habitList,habit]
  }))
    }
))

function habit(){
    const habits=useHabit((state)=>state.bears)
}

function habitlist(){
    const habitlist=usehabitList((state)=>state.addhabit)
    const deletehabit=usehabitList((state)=>state.deleteHabit)
}