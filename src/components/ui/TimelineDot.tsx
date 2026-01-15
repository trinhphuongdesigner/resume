interface TimelineDotProps {
  size?: "sm" | "md";
  position?: "left" | "center";
  className?: string;
}

export default function TimelineDot({ size = "md", position = "left", className = "" }: TimelineDotProps) {
  const sizeClasses = size === "sm" ? "w-3 h-3" : "w-3 sm:w-4 h-3 sm:h-4";
  const positionClasses = position === "center" 
    ? "left-4 md:left-1/2 md:-translate-x-1/2" 
    : "left-4";
  
  return (
    <div className={`absolute ${positionClasses} ${sizeClasses} rounded-full bg-gradient-to-r from-[#FA5252] to-[#DD2476] border-2 border-white z-10 ${className}`} />
  );
}
