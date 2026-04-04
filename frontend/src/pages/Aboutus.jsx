import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100">
      <div className="relative bg-gray-900 py-40 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Fitness Tracking"
            className="w-full h-full object-cover opacity-40 motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
            />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="motion-safe:animate-[slideUpFade_0.8s_ease-out_both]">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter">
              About <span className="text-blue-500">Fitness Tracker</span>
            </h1>
            <p className="text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Your journey to a healthier, stronger version of yourself starts here. 
              We provide the tools to track every step of your fitness transformation.
            </p>
          </div>
        </div>
      </div>

      <div className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="space-y-10 motion-safe:animate-[fadeInLeft_1s_ease-out_both]">
              <div>
                <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Mission</h2>
                <h3 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Empowering you to take control of your health.
                </h3>
                <p className="text-gray-500 text-xl leading-relaxed">
                  FitTrack was born from a simple idea: that fitness tracking should be 
                  intuitive, comprehensive, and accessible to everyone.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Data-Driven Progress", desc: "Track every metric that matters to your success." },
                  { title: "Privacy & Security First", desc: "Your personal data is encrypted and always safe." },
                  { title: "Community Support", desc: "Join thousands of others on the same journey." }
                ].map((item, idx) => (
                  <div key={idx} className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="flex-shrink-0 bg-blue-100 rounded-xl p-3 text-blue-600 group-hover:scale-110 transition-transform">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative motion-safe:animate-[fadeInRight_1s_ease-out_both]">
              <div className="absolute -inset-6 bg-blue-400 rounded-[3rem] transform -rotate-3 blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 transition-transform hover:scale-[1.02] duration-500">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Core Principles</h3>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                  We follow strict guidelines to ensure your data is safe and your experience is seamless.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Uptime", value: "99.9%" },
                    { label: "Compliant", value: "GDPR" },
                    { label: "Encryption", value: "256-bit" },
                    { label: "Support", value: "24/7" }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-blue-300 hover:bg-white transition-all duration-300">
                      <span className="block text-3xl font-black text-blue-600 mb-1">{stat.value}</span>
                      <span className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[120px] animate-bounce-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Performance</h2>
          <h3 className="text-5xl md:text-6xl font-extrabold mb-10 tracking-tight">Built for Modern Athletes</h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light">
              FitTrack uses lightning-fast technology to ensure 
              your data is always ready when you are. From high-intensity training 
              to nutrition logging, we never miss a beat.
            </p>
            <button className="px-12 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl">
              Explore Features
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;