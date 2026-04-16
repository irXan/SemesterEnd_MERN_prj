import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const sectionsRef = useRef([]);
  const dividerRef = useRef(null);
  const bottomRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: brandRef.current,
            start: 'top 90%',
          },
        }
      );

      gsap.fromTo(
        sectionsRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionsRef.current[0],
            start: 'top 90%',
          },
        }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 95%',
          },
        }
      );

      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 98%',
          },
        }
      );

      gsap.fromTo(
        buttonsRef.current.filter(Boolean),
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.5)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 98%',
          },
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, { x: 4, duration: 0.2, ease: 'power1.out' });
  };
  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.2, ease: 'power1.out' });
  };

  const handleBtnEnter = (e) => {
    gsap.to(e.currentTarget, { y: -3, scale: 1.04, duration: 0.2, ease: 'power1.out' });
  };
  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.2, ease: 'power1.out' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0a0a0a] pt-24 pb-12 border-t border-white/5 font-sans tracking-tight"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

          <div ref={brandRef} className="col-span-1 lg:col-span-1">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 mb-6 uppercase"
            >
              Fitness<span className="text-yellow-500 italic">Tracker</span>
            </Link>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider leading-relaxed mb-8 max-w-xs">
              Experience elite fitness tracking. Built for those who demand maximum performance.
            </p>
          </div>

          {[
            { title: 'Platform', links: ['Workout Plans', 'Meal Tracking', 'Analytics', 'Community'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Success Stories', 'Press'] },
            { title: 'Support', links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'] },
          ].map((section, i) => (
            <div key={section.title} ref={(el) => (sectionsRef.current[i] = el)}>
              <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.2em]">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link} className="group">
                    <Link
                      to={link === 'About Us' ? '/aboutus' : '/'}
                      className="text-gray-500 hover:text-yellow-500 transition-colors duration-300 text-sm font-bold uppercase tracking-wide flex items-center gap-1"
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      <ChevronRight className="w-0 h-4 group-hover:w-4 transition-all duration-300 text-yellow-500" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={dividerRef} className="border-t border-white/5" />

        <div
          ref={bottomRef}
          className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            © 2026 FitnessTracker. Engineered for{' '}
            <span className="text-gray-400">Excellence.</span>
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
              <button
                key={item}
                ref={(el) => (buttonsRef.current[i] = el)}
                className="relative group bg-yellow-500 hover:bg-white px-6 py-2.5 rounded-xl transition-colors duration-300 active:scale-95 shadow-lg shadow-yellow-500/10"
                onMouseEnter={handleBtnEnter}
                onMouseLeave={handleBtnLeave}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-black text-[10px] font-black uppercase tracking-[0.2em]">
                  {item}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;