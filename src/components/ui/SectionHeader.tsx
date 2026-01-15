import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SectionHeaderProps {
  icon: IconDefinition;
  title: string;
  centered?: boolean;
}

export default function SectionHeader({ icon, title, centered = false }: SectionHeaderProps) {
  return (
    <div className={`flex items-center mb-4 sm:mb-6 ${centered ? 'justify-center' : ''}`}>
      <FontAwesomeIcon icon={icon} className="w-5 h-5 mr-2 text-[#FA5252]" />
      <p className="font-medium text-base sm:text-lg md:text-xl leading-6 sm:leading-7">{title}</p>
    </div>
  );
}
