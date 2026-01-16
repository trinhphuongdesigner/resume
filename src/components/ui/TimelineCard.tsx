// TimelineCard component for displaying timeline items
interface TimelineCardProps {
  time: string;
  title: string;
  subtitle: string;
  subtitleUrl?: string;
  bg: string;
}

export default function TimelineCard({ time, title, subtitle, subtitleUrl, bg }: TimelineCardProps) {
  return (
    <div className={`${bg} p-3 sm:p-4 rounded-xl`}>
      <p className="text-[#FA5252] font-medium text-xs sm:text-sm leading-5 sm:leading-6 mb-1">{time}</p>
      <p className="text-xs sm:text-sm md:text-base leading-5 sm:leading-6 font-medium">{title}</p>
      {subtitleUrl ? (
        <a 
          href={subtitleUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 mt-1 block hover:text-[#FA5252] cursor-pointer transition-colors"
        >
          {subtitle}
        </a>
      ) : (
        <p className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
