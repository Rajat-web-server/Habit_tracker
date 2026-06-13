import { Linechart } from "@/components/charts/lineChart";
import { Piechart } from "@/components/charts/pieChart";
import { Barchart } from "@/components/charts/barChart";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Chart = () => {
  return (
    <div className="bg-bgcolor1 text-textcolor1 h-screen flex flex-col">
      <h2 className="pt-25 text-5xl text-center shrink-0 pb-6">
        This is Where Analytical Data will be projected
      </h2>

        <ScrollArea className="flex-1 overflow-hidden">
          <div className="flex flex-col gap-8 p-6">
            <Linechart />
            <Piechart />
            <Barchart />
          </div>
        </ScrollArea>

    </div>
  );
};

/**
 * 
 * <div className="bg-bgcolor1 text-textcolor1 h-screen flex flex-col">

  
  <h2 className="pt-25 pb-6 text-5xl text-center shrink-0">
    This is Where Analytical Data will be projected
  </h2>

  <ScrollArea className="flex-1 overflow-hidden">
    <div className="flex flex-col gap-8 p-6">
      <Linechart />
      <Piechart />
      <Barchart />
    </div>
  </ScrollArea>
</div>
 */