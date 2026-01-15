interface TimelineCardProps {
  time: string;
  title: string;
  subtitle: string;
  bg: string;
}

export default function TimelineCard({ time, title, subtitle, bg }: TimelineCardProps) {
  return (
    <div className={`${bg} p-3 sm:p-4 rounded-xl`}>
      <p className="text-[#FA5252] font-medium text-xs sm:text-sm leading-5 sm:leading-6 mb-1">{time}</p>
      <p className="text-xs sm:text-sm md:text-base leading-5 sm:leading-6 font-medium">{title}</p>
      <p className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 mt-1">{subtitle}</p>
    </div>
  );
}
