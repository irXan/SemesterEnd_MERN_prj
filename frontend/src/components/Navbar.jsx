import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const dividerRef = useRef(null);

  const leftLinks = [
    { label: "Dashboard", to: isAuthenticated ? "/dashboard" : "/login" },
    { label: "Home", to: "/" },
    { label: "About Us", to: "/aboutus" },
  ];

  const authLinks = isAuthenticated
    ? [
        { label: "Feedback", to: "/feedback" },
        { label: "Profile", to: "/settings" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];

  const allDesktopLinks = [...leftLinks, ...authLinks];

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.5 }
      );

      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { opacity: 0, y: -8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.07,
          delay: 0.6,
        }
      );

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.3, delay: 0.9 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const menuItems = mobileMenuRef.current.querySelectorAll("a");

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        menuItems,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.05,
          ease: "power1.out",
          delay: 0.1,
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.97,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const handleLinkHover = (el, entering) => {
    gsap.to(el, {
      y: entering ? -2 : 0,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleCtaHover = (el, entering) => {
    gsap.to(el, {
      scale: entering ? 1.05 : 1,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-xl pointer-events-auto">

        <Link
          to="/"
          ref={logoRef}
          className="flex items-center gap-2 text-xl font-black tracking-tighter text-white uppercase"
          onClick={closeMenu}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-black">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="hidden sm:block">
            Fitness<span className="text-yellow-500">Tracker</span>
          </span>
        </Link>


        <div className="hidden items-center gap-2 md:flex">
          {leftLinks.map((item, i) => (
            <Link
              key={item.label}
              to={item.to}
              ref={(el) => (linksRef.current[i] = el)}
              className="rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white/70 transition-colors hover:text-yellow-500"
              onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
            >
              {item.label}
            </Link>
          ))}

          <div
            ref={dividerRef}
            className="mx-2 h-4 w-[1px] bg-white/10"
          />

          {authLinks.map((item, i) => {
            const isCta = i === authLinks.length - 1;
            const refIndex = leftLinks.length + 1 + i;
            return (
              <Link
                key={item.label}
                to={item.to}
                ref={(el) => (linksRef.current[refIndex] = el)}
                className={
                  isCta
                    ? "ml-2 rounded-full bg-yellow-500 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-white shadow-lg shadow-yellow-500/20"
                    : "rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                }
                onMouseEnter={(e) =>
                  isCta
                    ? handleCtaHover(e.currentTarget, true)
                    : handleLinkHover(e.currentTarget, true)
                }
                onMouseLeave={(e) =>
                  isCta
                    ? handleCtaHover(e.currentTarget, false)
                    : handleLinkHover(e.currentTarget, false)
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden focus:outline-none"
          type="button"
        >
          <svg
            className="h-5 w-5"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="mx-auto mt-4 max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden pointer-events-auto"
        >
          <div className="flex flex-col gap-1">
            {[...leftLinks, ...authLinks].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white/80 transition-colors hover:bg-yellow-500 hover:text-black"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
