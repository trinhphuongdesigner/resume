"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGraduationCap, faBriefcase, faLightbulb, faChevronLeft, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface NavItem {
  href: string;
  icon: IconDefinition;
  title: string;
  id: string;
}

const navItems: NavItem[] = [
  { href: "#about", icon: faUser, title: "About", id: "about" },
  { href: "#experience", icon: faBriefcase, title: "Experience", id: "experience" },
  { href: "#knowledge", icon: faLightbulb, title: "Knowledge", id: "knowledge" },
  { href: "#education", icon: faGraduationCap, title: "Education", id: "education" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeNavbar = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Auto close navbar after 3 seconds
  useEffect(() => {
    if (isOpen) {
      autoCloseTimerRef.current = setTimeout(() => {
        closeNavbar();
      }, 3000);
    }
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [isOpen, closeNavbar]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);

      const sectionIds = ["about", "experience", "knowledge", "education"];
      const scrollPosition = window.scrollY + 200;
      
      // Check if scrolled to bottom of page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      
      if (isAtBottom) {
        setActiveSection("education");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Desktop navbar - absolute top right, above main content */}
      <nav className={`hidden xl:flex items-center absolute right-0 top-0 p-[20px] rounded-xl bg-white shadow-sm transition-opacity duration-300 print:hidden ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`group flex flex-col items-center justify-center w-[72px] h-[72px] p-3 rounded-xl transition-all mr-3 last:mr-0
              ${activeSection === item.id
                ? "bg-gradient-to-br from-[#FA5252] to-[#DD2476]" 
                : "bg-[#F3F6F6] hover:bg-gradient-to-br hover:from-[#FA5252] hover:to-[#DD2476]"
              }`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`w-[22px] h-[22px] transition-all ${
                activeSection === item.id
                  ? "text-white" 
                  : "text-[#44566C] group-hover:text-white"
              }`}
            />
            <p className={`mt-1 font-medium text-[0.65rem] leading-4 transition-colors ${
              activeSection === item.id
                ? "text-white" 
                : "text-[#44566C] group-hover:text-white"
            }`}>
              {item.title}
            </p>
          </a>
        ))}
      </nav>

      {/* Desktop floating navbar - right side (visible when scrolled) */}
      <div className={`hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col bg-white rounded-xl shadow-lg p-3 gap-2 transition-all duration-300 print:hidden ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`group flex flex-col items-center justify-center w-14 h-14 p-2 rounded-xl transition-all
              ${activeSection === item.id 
                ? "bg-gradient-to-br from-[#FA5252] to-[#DD2476]" 
                : "bg-[#F3F6F6] hover:bg-gradient-to-br hover:from-[#FA5252] hover:to-[#DD2476]"
              }`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`w-[18px] h-[18px] transition-all ${activeSection === item.id ? "text-white" : "text-[#44566C] group-hover:text-white"}`}
            />
            <p className={`mt-1 font-medium text-[0.55rem] leading-3 transition-colors ${activeSection === item.id ? "text-white" : "text-[#44566C] group-hover:text-white"}`}>
              {item.title}
            </p>
          </a>
        ))}
      </div>

      {/* Mobile/Tablet navbar - right side floating */}
      <div className={`xl:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-transform duration-300 print:hidden ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-24px)]"}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-6 h-14 bg-gradient-to-b from-[#FA5252] to-[#DD2476] rounded-l-lg flex items-center justify-center shadow-lg"
        >
          <FontAwesomeIcon 
            icon={faChevronLeft}
            className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex flex-col bg-white rounded-l-xl shadow-lg p-2 gap-1.5">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`group flex flex-col items-center justify-center w-14 h-14 p-2 rounded-xl transition-all
                ${activeSection === item.id 
                  ? "bg-gradient-to-br from-[#FA5252] to-[#DD2476]" 
                  : "bg-[#F3F6F6] hover:bg-gradient-to-br hover:from-[#FA5252] hover:to-[#DD2476]"
                }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-[18px] h-[18px] transition-all ${activeSection === item.id ? "text-white" : "text-[#44566C] group-hover:text-white"}`}
              />
              <p className={`mt-1 font-medium text-[0.55rem] leading-3 transition-colors ${activeSection === item.id ? "text-white" : "text-[#44566C] group-hover:text-white"}`}>
                {item.title}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", window.location.pathname);
        }}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-gradient-to-br from-[#FA5252] to-[#DD2476] rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 print:hidden ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <FontAwesomeIcon icon={faArrowUp} className="w-5 h-5 text-white" />
      </button>
    </>
  );
}
