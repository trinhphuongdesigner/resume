interface KnowledgeTagProps {
  label: string;
}

export default function KnowledgeTag({ label }: KnowledgeTagProps) {
  return (
    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-[#EDF2F2] text-[#44566C] text-[10px] sm:text-xs md:text-sm">
      {label}
    </span>
  );
}
