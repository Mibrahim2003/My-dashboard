import { useState } from 'react';
import { Plus, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Course } from '../types';

export const Onboarding = () => {
  const navigate = useNavigate();
  const { courses, addCourse, removeCourse } = useStore();
  
  // Track form state
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    code: '',
    name: '',
    credits: 3,
    weightage: { quizzes: 10, assignments: 20, midterm: 25, final: 35, project: 10 }
  });

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name) return;
    
    // Pick a random Neo-Brutalism theme color for the new course
    const colors = ['bg-primary-container', 'bg-secondary-container', 'bg-tertiary-container', 'bg-[#A8E6CF]'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    addCourse({
      id: Date.now().toString(),
      code: newCourse.code,
      name: newCourse.name,
      credits: Number(newCourse.credits) || 3,
      color: randomColor,
      gradeProgress: 0,
      grade: 'N/A',
      weightage: newCourse.weightage || { quizzes: 10, assignments: 20, midterm: 25, final: 35, project: 10 }
    });
    
    // Reset basic fields
    setNewCourse({ ...newCourse, code: '', name: '' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b-4 border-ink bg-background flex justify-between items-center h-16 px-6 md:px-12">
        <div className="text-xl font-black text-ink uppercase tracking-tighter">
          Outlier
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-ink text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Step 1 of 2
          </span>
          <div className="w-32 h-3 bg-background border-2 border-ink overflow-hidden hidden sm:block">
            <div className="h-full bg-secondary w-1/2"></div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6 md:px-12">
      {/* Decorative Geometric Shapes */}
      <div className="fixed -top-10 -left-10 w-32 h-32 bg-secondary/10 rotate-12 z-0"></div>
      <div className="fixed top-1/4 -right-10 w-24 h-24 bg-tertiary/20 rounded-full z-0"></div>
      
      <header className="mb-12 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 leading-none">
          What are you <br/>
          <span className="bg-primary-container px-2">studying</span> this semester?
        </h1>
        <p className="text-xl font-medium max-w-xl text-ink/60">
          Let's map out your path to academic dominance. Add your courses and their grade weightage to start forging.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Added Courses Chips */}
        <div className="lg:col-span-12 mb-4">
          <h3 className="font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
            <Plus size={14} />
            Current Loadout
          </h3>
          <div className="flex flex-wrap gap-3">
            {courses.map((course, i) => (
              <div key={i} className={`${course.color} border-2 border-ink px-4 py-2 flex items-center gap-3 shadow-[3px_3px_0px_#1A1A1A]`}>
                <span className="font-black">{course.code}</span>
                <span className="text-xs font-bold uppercase">{course.name}</span>
                <X size={14} className="cursor-pointer hover:text-secondary" onClick={() => removeCourse(course.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* Course Form Card */}
        <div className="lg:col-span-8 bg-white border-3 border-ink p-8 shadow-[6px_6px_0px_#a8275a] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-ink"></div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest">Course Code</label>
                <input 
                  className="w-full bg-background border-3 border-ink px-4 py-3 focus:bg-primary-container/10 outline-none placeholder:text-ink/30 font-bold" 
                  placeholder="e.g. CS50" 
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest">Course Name</label>
                <input 
                  className="w-full bg-background border-3 border-ink px-4 py-3 focus:bg-primary-container/10 outline-none placeholder:text-ink/30 font-bold" 
                  placeholder="e.g. Computer Science" 
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest">Credit Hours</label>
              <input 
                className="w-24 bg-background border-3 border-ink px-4 py-3 focus:bg-primary-container/10 outline-none font-bold" 
                placeholder="3" 
                type="number"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })}
              />
            </div>

            {/* Weightage Section */}
            <div className="pt-6 border-t-4 border-ink/10">
              <h3 className="font-black uppercase tracking-tighter text-2xl mb-6">Grade Breakdown (%)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { key: 'quizzes', label: 'Quizzes' },
                  { key: 'assignments', label: 'Assignments' },
                  { key: 'midterm', label: 'Midterm' },
                  { key: 'final', label: 'Final' },
                  { key: 'project', label: 'Project' },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <label className="block text-[10px] font-black uppercase">{item.label}</label>
                    <input 
                      className="w-full bg-background border-[3px] border-ink px-2 py-2 focus:bg-tertiary-container/20 outline-none font-bold" 
                      type="number" 
                      value={newCourse.weightage?.[item.key as keyof typeof newCourse.weightage] || 0}
                      onChange={(e) => setNewCourse({
                        ...newCourse,
                        weightage: {
                          ...newCourse.weightage!,
                          [item.key]: parseInt(e.target.value) || 0
                        }
                      })}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-xs font-bold uppercase px-2 py-1 bg-ink text-white">Total: 100%</span>
              </div>
            </div>
            <button 
              className="w-full py-4 bg-tertiary text-white border-3 border-ink font-black uppercase tracking-widest shadow-[3px_3px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2" 
              type="button"
              onClick={handleAddCourse}
            >
              <Plus size={18} />
              Add Course to List
            </button>
          </form>
        </div>

        {/* Summary & CTA */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border-3 border-ink p-6 shadow-[3px_3px_0px_#1A1A1A]">
            <h4 className="font-black uppercase text-sm mb-4 border-b-2 border-ink pb-2">Academic Overview</h4>
            <ul className="space-y-3">
              <li className="flex justify-between font-bold text-sm">
                <span>Total Credits:</span>
                <span className="text-xl">{courses.reduce((acc, c) => acc + c.credits, 0).toString().padStart(2, '0')}</span>
              </li>
              <li className="flex justify-between font-bold text-sm">
                <span>Courses Added:</span>
                <span>{courses.length.toString().padStart(2, '0')}</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-secondary/10 border-2 border-secondary border-dashed text-xs font-medium italic">
              "Your current schedule is balanced. Ready for research excellence."
            </div>
          </div>
          <div className="mt-auto">
            <button 
              className="w-full py-6 bg-primary-container text-ink border-3 border-ink font-black text-xl uppercase tracking-tighter shadow-[3px_3px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-3"
              onClick={() => navigate('/dashboard')}
            >
              Continue to Dashboard
              <ArrowRight size={24} />
            </button>
            <p className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-ink/40">
              You can edit these later in settings
            </p>
          </div>
          <div className="bg-secondary border-2 border-ink text-white px-4 py-2 font-bold text-xs uppercase -rotate-2 flex items-center gap-2 self-start shadow-[3px_3px_0px_#1A1A1A]">
            <Sparkles size={14} fill="currentColor" />
            AI Study Plan Generator Ready
          </div>
        </div>
      </div>

      {/* Illustration Component */}
      <section className="mt-20 border-t-4 border-ink pt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-3 border-ink z-0"></div>
            <img 
              alt="Abstract knowledge forge" 
              className="relative z-10 w-full aspect-video object-cover border-3 border-ink grayscale contrast-125" 
              src="https://picsum.photos/seed/forge/600/400"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic underline decoration-secondary decoration-4">The Forge Philosophy</h2>
            <p className="font-medium text-lg leading-relaxed">
              We don't just track grades. We build academic empires. By defining your weightages now, Outlier AI can predict your workload spikes and preemptively suggest focus blocks.
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
