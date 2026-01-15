interface TimelineLineProps {
  direction: "horizontal" | "vertical";
  position?: "left" | "center";
}

export default function TimelineLine({ direction, position = "center" }: TimelineLineProps) {
  if (direction === "horizontal") {
    return (
      <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FA5252] to-[#DD2476] opacity-30" />
    );
  }
  
  const positionClasses = position === "center" 
    ? "left-4 md:left-1/2 md:-translate-x-1/2" 
    : "left-4";
  
  return (
    <div className={`absolute top-0 bottom-0 ${positionClasses} w-[2px] bg-gradient-to-b from-[#FA5252] to-[#DD2476] opacity-30`} />
  );
}
