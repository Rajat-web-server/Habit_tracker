import { Linechart } from "@/components/charts/lineChart"
import { Piechart } from "@/components/charts/pieChart"

export const Chart=()=>{
    return(
        <>
        
        <h2 className="pt-25 text-5xl text-center">This is Where Analytical Data will be projected</h2>

        <Linechart/>
        <Piechart/>
        </>
    )
}