import { ArrowRight, BarChart3, BrainCircuit, BellRing, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 border-b-4 border-ink bg-background flex justify-between items-center h-20 px-6 md:px-12 shadow-[3px_3px_0px_#1A1A1A]">
        <div className="text-2xl font-black text-ink uppercase tracking-tighter">
          StudyForge
        </div>
        <div className="hidden md:flex gap-8 items-center font-bold tracking-tighter uppercase text-sm">
          <a className="text-ink border-b-4 border-ink pb-1" href="#">Home</a>
          <a className="text-ink/60 hover:bg-primary-container hover:shadow-[2px_2px_0px_#1A1A1A] transition-all px-2" href="#">Features</a>
          <Link className="text-ink/60 hover:bg-primary-container hover:shadow-[2px_2px_0px_#1A1A1A] transition-all px-2" to="/dashboard">Dashboard</Link>
        </div>
        <Link to="/onboarding" className="bg-primary-container border-3 border-ink px-6 py-2 font-black uppercase tracking-tighter shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
          Sign In with Google
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 md:px-12 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-40 left-10 w-24 h-24 bg-secondary border-3 border-ink -rotate-12 hidden lg:block"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-tertiary border-3 border-ink hidden lg:block"></div>
        <div className="absolute top-60 right-10 w-16 h-16 bg-primary-container border-3 border-ink rotate-45 hidden lg:block"></div>
        
        <div className="z-10 text-center max-w-5xl">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 leading-none"
          >
            Track. <span className="bg-primary-container px-4">Analyze.</span> <br/>Dominate.
          </motion.h1>
          <p className="text-xl md:text-3xl font-medium max-w-3xl mx-auto mb-12 border-l-8 border-ink pl-6 text-left">
            AI-powered academic dashboard that tracks your grades, predicts your GPA, and tells you exactly what to study next.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/onboarding" className="bg-primary-container border-3 border-ink px-12 py-6 text-2xl md:text-4xl font-black uppercase tracking-tighter shadow-[6px_6px_0px_#1A1A1A] hover:shadow-[3px_3px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-all">
              Get Started with Google
            </Link>
          </div>
        </div>

        {/* Hero Graphic */}
        <div className="mt-20 w-full max-w-6xl border-3 border-ink shadow-[12px_12px_0px_#1A1A1A] bg-white overflow-hidden aspect-video relative group">
          <img 
            alt="StudyForge Dashboard Preview" 
            className="w-full h-full object-cover filter contrast-125 brightness-110" 
            src="https://picsum.photos/seed/dashboard/1200/800"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/10 mix-blend-multiply"></div>
          <div className="absolute bottom-8 left-8 bg-secondary text-white px-6 py-2 border-3 border-ink font-black uppercase tracking-widest -rotate-2">
            Predictive AI Active
          </div>
        </div>
      </main>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1: Smart Grade Tracking */}
          <div className="bg-primary-container border-3 border-ink p-8 shadow-[6px_6px_0px_#1A1A1A] flex flex-col gap-6">
            <div className="w-16 h-16 border-3 border-ink bg-white flex items-center justify-center">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">Smart Grade Tracking</h3>
            <p className="text-lg font-medium">Automatic sync with your university portals. Visualize your trajectory with brutalist precision.</p>
            <div className="mt-auto pt-6 border-t-4 border-ink">
              <span className="font-black uppercase text-sm">Real-time Sync Enabled</span>
            </div>
          </div>
          {/* Card 2: AI Study Recommendations */}
          <div className="bg-secondary border-3 border-ink p-8 shadow-[6px_6px_0px_#1A1A1A] text-white flex flex-col gap-6 -rotate-1">
            <div className="w-16 h-16 border-3 border-ink bg-white text-ink flex items-center justify-center">
              <BrainCircuit size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">AI Study Recommendations</h3>
            <p className="text-lg font-medium">Our neural network identifies your weak spots before you even take the midterm.</p>
            <div className="mt-auto pt-6 border-t-4 border-ink">
              <span className="font-black uppercase text-sm bg-white text-ink px-2">98% Accuracy Rate</span>
            </div>
          </div>
          {/* Card 3: Assignment Reminders */}
          <div className="bg-tertiary border-3 border-ink p-8 shadow-[6px_6px_0px_#1A1A1A] text-white flex flex-col gap-6">
            <div className="w-16 h-16 border-3 border-ink bg-white text-ink flex items-center justify-center">
              <BellRing size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">Assignment Reminders</h3>
            <p className="text-lg font-medium">Never miss a deadline. Get aggressive alerts that ensure you stay on top of your game.</p>
            <div className="mt-auto pt-6 border-t-4 border-ink">
              <span className="font-black uppercase text-sm">Anti-Procrastination Mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-ink text-background py-20 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="text-7xl md:text-9xl font-black leading-none">50K+</div>
            <div className="text-xl font-bold uppercase tracking-widest text-primary-container">Students Forging Success</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 border-2 border-zinc-700 p-4 font-bold uppercase text-xs">A+ Average Increase</div>
            <div className="bg-zinc-800 border-2 border-zinc-700 p-4 font-bold uppercase text-xs">12 Hours Saved Weekly</div>
            <div className="bg-zinc-800 border-2 border-zinc-700 p-4 font-bold uppercase text-xs">95% Success Rate</div>
            <div className="bg-zinc-800 border-2 border-zinc-700 p-4 font-bold uppercase text-xs">GPA Prediction AI</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-white border-8 border-ink p-12 shadow-[16px_16px_0px_#A8275A] relative">
          <div className="absolute -top-10 -right-10 bg-primary-container border-3 border-ink p-4 font-black uppercase -rotate-12">
            Free Forever
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Ready to Win?</h2>
          <p className="text-2xl font-bold mb-12">Join the elite cohort of students using data to destroy their competition.</p>
          <Link to="/onboarding" className="bg-primary-container border-3 border-ink px-12 py-6 text-2xl font-black uppercase tracking-tighter shadow-[6px_6px_0px_#1A1A1A] hover:bg-ink hover:text-primary-container transition-all inline-block w-full md:w-auto">
            Start Forging Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t-4 border-ink w-full">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 md:px-12 w-full gap-8">
          <div className="flex flex-col gap-4">
            <div className="font-black text-3xl text-ink uppercase tracking-tighter">StudyForge</div>
            <p className="uppercase tracking-widest text-sm text-ink/60 font-bold">
              Built for students who want to win.
            </p>
          </div>
          <div className="flex gap-8 font-bold uppercase tracking-widest text-sm">
            <a className="text-ink hover:text-secondary transition-colors" href="#">Twitter</a>
            <a className="text-ink hover:text-secondary transition-colors" href="#">Discord</a>
            <a className="text-ink hover:text-secondary transition-colors" href="#">GitHub</a>
          </div>
          <div className="text-xs font-bold uppercase tracking-tighter text-ink/40">
            © 2026 StudyForge Academic Systems. No soft corners allowed.
          </div>
        </div>
      </footer>
    </div>
  );
};
