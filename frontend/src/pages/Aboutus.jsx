import React from 'react';
import Navbar from '../components/Navbar';
import { Check, Shield, Zap, Users, ArrowRight } from "lucide-react";
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#0a0a0a] min-h-screen font-sans tracking-tight selection:bg-yellow-500/30">
        

        <div className="relative py-40 text-white overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Fitness Tracking"
              className="w-full h-full object-cover opacity-20 motion-safe:animate-[slowZoom_25s_infinite_ease-in-out]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[160px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="motion-safe:animate-[slideUpFade_0.8s_ease-out_both]">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em] mb-8 inline-block">
                The Protocol
              </span>
              <h1 className="text-white md:text-8xl text-5xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                About <span className="text-yellow-500 italic">Fitness</span> Tracker
              </h1>
              <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-wider leading-relaxed">
                Your journey to a healthier, stronger version of yourself starts here. 
                We provide the elite tools to track every step of your transformation.
              </p>
            </div>
          </div>
        </div>

        <div className="py-32 overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              
              <div className="space-y-10 motion-safe:animate-[fadeInLeft_1s_ease-out_both]">
                <div>
                  <h2 className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4">Our Mission</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                    Empowering you to take <span className="text-yellow-500">absolute control</span> of your health.
                  </h3>
                  <p className="text-gray-500 font-bold uppercase tracking-wide text-sm leading-relaxed">
                    FitTrack was born from a simple idea: that fitness tracking should be 
                    intuitive, comprehensive, and built for those who demand excellence.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Data-Driven Progress", desc: "Track every metric that matters to your success.", icon: Zap },
                    { title: "Privacy & Security First", desc: "Your personal data is encrypted and always safe.", icon: Shield },
                    { title: "Community Support", desc: "Join thousands of others on the same journey.", icon: Users }
                  ].map((item, idx) => (
                    <div key={idx} className="group flex items-start gap-5 p-5 rounded-3xl bg-[#111] border border-white/5 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-xl p-2 text-black group-hover:rotate-12 transition-transform">
                        <item.icon size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative motion-safe:animate-[fadeInRight_1s_ease-out_both]">
                <div className="absolute -inset-6 bg-yellow-500 rounded-[3rem] transform -rotate-3 blur-3xl opacity-5 animate-pulse"></div>
                <div className="relative bg-[#111] p-10 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl transition-transform hover:scale-[1.01] duration-500">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                    <Check className="text-yellow-500 w-4 h-4" /> Core Principles
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Uptime", value: "99.9%" },
                      { label: "Compliant", value: "GDPR" },
                      { label: "Encryption", value: "256-bit" },
                      { label: "Support", value: "24/7" }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-6 bg-[#0a0a0a] rounded-2xl border border-white/5 group hover:border-yellow-500/20 transition-all duration-300 text-center">
                        <span className="block text-2xl font-black text-white mb-1 group-hover:text-yellow-500 transition-colors">{stat.value}</span>
                        <span className="text-gray-600 font-black uppercase text-[10px] tracking-[0.2em]">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-[#0a0a0a] py-32 text-white overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-block mb-6">
              <h2 className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[10px] bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">
                Performance
              </h2>
            </div>

            <h3 className="text-white text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-none">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Modern Athletes</span>
            </h3>
            
            <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/[0.02] p-8 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl">
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm leading-relaxed mb-12">
                FitTrack uses <span className="text-white">lightning-fast technology</span> to ensure your data is always ready when you are. 
                From high-intensity training to nutrition logging, we never miss a beat.
              </p>
              
              <button className="group relative overflow-hidden px-12 py-6 bg-yellow-500 text-black font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-yellow-500/30 flex items-center gap-3 mx-auto">
                <div className="absolute inset-0 w-full h-full bg-white/20 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                <span className="relative z-10">Explore Features</span> 
                <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
              </button>

              <p className="mt-8 text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">
                Secure • Encrypted • Real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <Footer/>
    </div>
  );
};

export default AboutUs;