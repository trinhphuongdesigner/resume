interface SectionHeadProps {
  num: string;
  title: string;
}

export default function SectionHead({ num, title }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-num">{num}</span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
