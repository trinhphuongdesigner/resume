"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faLocationDot, faCalendarDays, faDownload, faCheck, faCopy, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SocialLink {
  href: string;
  icon: IconDefinition;
  alt: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com/trinhphuong.dev/", icon: faFacebookF, alt: "facebook", color: "#1877F2" },
  { href: "https://twitter.com/TrnhPhn77262273", icon: faTwitter, alt: "twitter", color: "#1DA1F2" },
  { href: "https://www.instagram.com/_22august96_/", icon: faInstagram, alt: "instagram", color: "#E4405F" },
  { href: "https://www.linkedin.com/in/trinh-phuong-392051130", icon: faLinkedinIn, alt: "linkedin", color: "#0A66C2" },
];

interface ContactInfo {
  icon: IconDefinition;
  title: string;
  value: string;
  copyable: boolean;
  color: string;
}

const contactInfo: ContactInfo[] = [
  { icon: faPhone, title: "Phone", value: "+84 386 592 529", copyable: true, color: "#25D366" },
  { icon: faEnvelope, title: "Email", value: "trinhphuong.designer@gmail.com", copyable: true, color: "#EA4335" },
  { icon: faLocationDot, title: "Location", value: "Da Nang, Viet Nam", copyable: false, color: "#FF5722" },
  { icon: faCalendarDays, title: "Birthday", value: "July 09, 1996", copyable: false, color: "#9C27B0" },
];

interface SidebarProps {
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
}

export default function Sidebar({ onDownloadPDF, isGeneratingPDF }: SidebarProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="relative bg-white rounded-[20px] w-full xl:w-[420px] xl:min-w-[420px] h-fit flex flex-col md:flex-row xl:flex-col items-center p-6 md:p-8">
      <Image
        src="/img/brand/ava-min.jpg"
        alt="Avatar"
        width={240}
        height={240}
        priority
        className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] object-cover rounded-[20px] 
          absolute md:relative xl:absolute 
          top-[-90px] md:top-0 xl:top-[-100px] 
          left-1/2 md:left-0 xl:left-1/2 
          -translate-x-1/2 md:translate-x-0 xl:-translate-x-1/2"
      />

      <div className="pt-[100px] md:pt-0 xl:pt-[120px] md:ml-6 xl:ml-0 flex-1 w-full">
        {/* Name & Title - centered on mobile/xl, left on md */}
        <div className="text-center md:text-left xl:text-center px-4">
          <p className="font-[var(--font-roboto-slab)] font-medium text-xl md:text-[1.5rem] leading-[2rem]">
            Mr. Trinh Phuong
          </p>
          <p className="inline-block mt-3 px-4 py-[5px] font-medium text-sm bg-[#F3F6F6] rounded-lg">
            Full-stack Developer
          </p>
        </div>

        {/* Social links - centered on mobile/xl, left on md */}
        <div className="flex flex-row mt-4 mb-5 px-4 justify-center md:justify-start xl:justify-center">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center w-9 h-9 mr-2 last:mr-0 bg-[#F3F6F6] rounded-lg hover:bg-[#E3E3E3] transition-colors"
            >
              <FontAwesomeIcon 
                icon={social.icon} 
                className="w-[18px] h-[18px]" 
                style={{ color: social.color }}
              />
            </a>
          ))}
        </div>

        {/* Contact info - full width */}
        <div className="w-full mb-5 p-4 rounded-2xl bg-[#F3F6F6] md:bg-white xl:bg-[#F3F6F6]">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="flex flex-row items-center mb-2 pb-2 border-b border-[#E3E3E3] last:mb-0 last:pb-0 last:border-b-0 md:last:mb-2 md:last:pb-2 md:last:border-b xl:last:mb-0 xl:last:pb-0 xl:last:border-b-0"
            >
              <div className="flex-shrink-0 flex justify-center items-center w-9 h-9 p-2 mr-2 bg-white rounded-lg">
                <FontAwesomeIcon 
                  icon={info.icon} 
                  className="w-4 h-4" 
                  style={{ color: info.color }}
                />
              </div>
              <div className="flex flex-col items-start flex-1 min-w-0 overflow-hidden">
                <p className="text-[#44566C] text-xs leading-4">{info.title}</p>
                <p 
                  className="w-full text-left text-sm leading-5 break-all" 
                  title={info.value}
                >
                  {info.value}
                </p>
              </div>
              {info.copyable && mounted && (
                <button
                  onClick={() => handleCopy(info.value, idx)}
                  className="flex-shrink-0 ml-2 p-2 rounded-lg hover:bg-white/50 transition-colors group relative"
                  title={`Copy ${info.title.toLowerCase()}`}
                >
                  {copiedIndex === idx ? (
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
                  ) : (
                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4 text-[#44566C] group-hover:text-[#FA5252]" />
                  )}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {copiedIndex === idx ? "Copied!" : `Copy ${info.title.toLowerCase()}`}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Download button - centered on mobile/xl, left on md */}
        <div className="text-center md:text-left xl:text-center px-4">
          <button
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-[#FA5252] to-[#DD2476] hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin w-5 h-5 mr-2 text-white" />
            ) : (
              <FontAwesomeIcon icon={faDownload} className="w-5 h-5 mr-2 text-white" />
            )}
            <span className="text-white font-medium text-sm leading-5">
              {isGeneratingPDF ? "Generating..." : "Download Resume"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
