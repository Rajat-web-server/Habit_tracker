import { Card } from "../ui/card";
import { Quote } from "lucide-react";
import { quotes } from "./quotes";

export const MotivationalQuote = () => {
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const quote = quotes[dayNumber % quotes.length];

  return (
    <Card className="flex h-full flex-col justify-center gap-4  p-6 text-primary-fg bg-[#111313] text-white">
      <Quote size={22} className="opacity-70" />

      <p className="text-lg font-medium leading-snug">
        {quote.text}
      </p>

      {quote.author && (
        <p className="text-sm opacity-80">
          — {quote.author}
        </p>
      )}
    </Card>
  );
};