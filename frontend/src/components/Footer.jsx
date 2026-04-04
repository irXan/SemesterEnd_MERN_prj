import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-brand-600 flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Fitness Tracker
            </Link>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xs">
              Transforming lives through data-driven fitness. Join our community and start your journey today.
            </p>
          </div>

          {[
            { title: "Platform", links: ["Workout Plans", "Meal Tracking", "Analytics", "Community"] },
            { title: "Company", links: ["About Us", "Careers", "Success Stories", "Press"] },
            { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact"] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-gray-900 font-bold mb-8 text-sm uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to={link === "About Us" ? "/aboutus" : "/"} className="text-gray-500 hover:text-brand-600 transition-colors text-lg">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
          <p>© 2026 FitTrack. Built with ❤️ for a healthier world.</p>
          <div className="flex gap-8">
            <button className="hover:text-brand-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-brand-600 transition-colors">Terms of Service</button>
            <button className="hover:text-brand-600 transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;