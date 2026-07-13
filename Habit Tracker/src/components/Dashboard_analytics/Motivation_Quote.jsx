export const MotivationalQuote=()=> {
  return (
    <Card className="flex h-full flex-col justify-center gap-4 bg-primary p-6 text-primary-fg">
      <Quote size={22} className="opacity-70" />
      <p className="text-lg font-medium leading-snug">{quote.text}</p>
      <p className="text-sm opacity-80">— {quote.author}</p>
    </Card>
  );
}
