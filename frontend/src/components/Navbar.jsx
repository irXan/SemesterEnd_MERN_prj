import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const leftLinks = [
    {
      label: "Dashboard",
      to: isAuthenticated ? "/dashboard" : "/login",
    },
    {
      label: "Home",
      to: "/",
    },
    {
      label: "About Us",
      to: "/aboutus",
    },
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

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white"
          onClick={closeMenu}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          Fitness Tracker
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {leftLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <div className="mx-1 h-7 w-px bg-white/20" />

          {authLinks.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={
                index === authLinks.length - 1
                  ? "rounded-full bg-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/30"
                  : "rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border border-white/15 bg-white/10 p-2 text-white md:hidden"
          type="button"
        >
          <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/20 bg-slate-900/75 p-4 shadow-lg backdrop-blur-xl md:hidden">
          <div className="space-y-2">
            {[...leftLinks, ...authLinks].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
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
