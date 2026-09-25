"use client";

interface PdfLoadingOverlayProps {
  visible: boolean;
  label?: string;
}

export default function PdfLoadingOverlay({
  visible,
  label = "Generating PDF…",
}: PdfLoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="pdf-loader-overlay" role="status" aria-live="polite" aria-label={label}>
      <div className="pdf-loader-icon">
        <div className="pdf-loader-flip">
          <span className="pdf-loader-flip-spine" />
          <span className="pdf-loader-flip-base" />
          <span className="pdf-loader-flip-page" />
          <span className="pdf-loader-flip-page" />
          <span className="pdf-loader-flip-page" />
        </div>
      </div>
      <p className="pdf-loader-label">{label}</p>
    </div>
  );
}
