import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Target,
  Trophy,
  Calendar,
  Star,
  Upload,
  Plus,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

// Extended mock data for the detail view
const COURSE_DATA = {
  id: '1',
  code: 'CS-201',
  name: 'Data Structures',
  credits: 3,
  gradeProgress: 88,
  color: 'bg-primary',
  grade: 'B+',
  instructor: 'Dr. Sarah Mitchell',
  weightage: { quizzes: 15, assignments: 10, midterm: 30, final: 40, project: 5 },
  quizzes: [
    { title: 'Quiz 1: Array Manipulation', date: 'Oct 12', score: '8/10', classAvg: '6.5', status: 'graded', progress: 80 },
    { title: 'Quiz 2: Linked Lists', date: 'Oct 20', score: '5/10', classAvg: '7.2', status: 'below-average', progress: 50 },
    { title: 'Quiz 3: Binary Trees', date: 'Nov 05', topics: 'Traversal, Insertion, Deletion', status: 'scheduled' },
  ],
  assignments: [
    { title: 'HW 1: Linked Lists', date: 'Feb 20', score: '95/100', status: 'completed' },
    { title: 'HW 2: Sorting Algos', date: 'Mar 10', score: '80/100', status: 'completed' },
  ],
  quickStats: {
    yourAverage: '6.5/10',
    classAverage: '6.8/10',
    stdDeviation: '1.4',
    distanceFromTopper: '-3.0',
    projectedGrade: 'B+',
    projectedNote: 'Based on weightage (12% of final grade accounted for)',
  },
};

const TABS = ['Quizzes', 'Assignments', 'Midterm/Final', 'Project', 'AI Insights'];

export const CourseDetail = () => {
  const { id } = useParams();
  const { courses } = useStore();
  const [activeTab, setActiveTab] = useState(0);
  
  const localCourse = courses.find((c) => c.id === id);
  
  const course = localCourse ? {
    ...COURSE_DATA,
    ...localCourse,
    instructor: 'Dr. AI Professor',
  } : COURSE_DATA;

  if (!localCourse) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-4xl font-black uppercase">Course Not Found</h2>
        <Link to="/dashboard" className="text-tertiary underline font-bold">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      {/* Course Header — Yellow card */}
      <header className="bg-primary-container border-3 border-ink p-8 md:p-10 shadow-[6px_6px_0px_#1A1A1A] relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">{course.code}</h1>
            <p className="text-xl md:text-2xl font-black uppercase tracking-tight opacity-80">{course.name}</p>
          </div>
          <div className="bg-white border-3 border-ink p-4 shadow-[3px_3px_0px_#1A1A1A] text-center min-w-[100px]">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Est. Grade</p>
            <p className="text-4xl font-black leading-none mt-1">{course.grade}</p>
          </div>
        </div>
        
        {/* Weightage Pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="bg-ink text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            {course.credits} Credit Hours
          </span>
          {course.weightage && Object.entries(course.weightage).map(([key, val]) => (
            <span key={key} className="bg-white border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-widest">
              {key} {val}%
            </span>
          ))}
        </div>
      </header>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-3 text-xs font-black uppercase tracking-widest border-3 transition-all flex items-center gap-2 ${
              activeTab === i 
                ? 'bg-ink text-white border-ink shadow-none' 
                : 'bg-white text-ink border-ink shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px]'
            }`}
          >
            {i === 0 && <FileText size={14} />}
            {i === 1 && <FileText size={14} />}
            {i === 2 && <Target size={14} />}
            {i === 3 && <Settings size={14} />}
            {i === 4 && <Sparkles size={14} />}
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Tab Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quizzes Tab */}
          {activeTab === 0 && (
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Active Quizzes</h3>
                <div className="flex gap-3">
                  <button className="bg-white border-3 border-ink px-4 py-2 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-2">
                    <Upload size={14} />
                    Upload Class Marks
                  </button>
                  <button className="bg-primary-container border-3 border-ink px-4 py-2 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#1A1A1A] hover:shadow-[1px_1px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-2">
                    <Plus size={14} />
                    Add Quiz
                  </button>
                </div>
              </div>

              {/* Quiz Items */}
              {COURSE_DATA.quizzes.map((quiz, i) => (
                <div key={i} className={`bg-white border-3 border-ink p-6 shadow-[3px_3px_0px_#1A1A1A] ${quiz.status === 'scheduled' ? 'border-dashed' : ''}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="text-xl font-black leading-tight">{quiz.title}</h4>
                        {quiz.status === 'graded' && (
                          <span className="bg-tertiary/20 text-tertiary px-2 py-0.5 text-[10px] font-black uppercase border border-tertiary">Graded</span>
                        )}
                        {quiz.status === 'below-average' && (
                          <span className="bg-secondary/20 text-secondary px-2 py-0.5 text-[10px] font-black uppercase border border-secondary">Below Average</span>
                        )}
                        {quiz.status === 'scheduled' && (
                          <span className="bg-ink/10 text-ink px-2 py-0.5 text-[10px] font-black uppercase border border-ink/30">Scheduled</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold opacity-60">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {quiz.date}</span>
                        {quiz.score && <span className="flex items-center gap-1"><Star size={12} /> Score: {quiz.score}</span>}
                        {quiz.classAvg && <span className="italic">Class Avg: {quiz.classAvg}</span>}
                        {quiz.topics && <span className="italic">Topics: {quiz.topics}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {quiz.progress !== undefined && (
                        <div className="w-32 h-3 bg-background border-2 border-ink">
                          <div className={`h-full ${quiz.progress >= 70 ? 'bg-tertiary' : 'bg-secondary'}`} style={{ width: `${quiz.progress}%` }}></div>
                        </div>
                      )}
                      {quiz.status === 'scheduled' && (
                        <button className="bg-white border-2 border-ink px-3 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#1A1A1A] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                          Set Reminder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Performance Chart */}
              <div className="bg-white border-3 border-ink p-8 shadow-[3px_3px_0px_#1A1A1A]">
                <h4 className="text-sm font-black uppercase tracking-widest mb-6">Your Performance vs Class Average</h4>
                <div className="relative h-48 w-full border-b-4 border-ink flex items-end justify-around px-8 gap-8">
                  {['Quiz 1', 'Quiz 2', 'Quiz 3'].map((label, i) => (
                    <div key={label} className="flex-1 flex items-end justify-center gap-2 h-full">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div 
                          className="w-full bg-primary-container border-2 border-ink" 
                          style={{ height: i === 0 ? '80%' : i === 1 ? '50%' : '10%' }}
                        ></div>
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div 
                          className="w-full bg-ink/20 border-2 border-ink" 
                          style={{ height: i === 0 ? '65%' : i === 1 ? '72%' : '10%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-around text-[10px] font-black uppercase tracking-widest mt-3 px-8">
                  <span>Quiz 1</span>
                  <span>Quiz 2</span>
                  <span>Quiz 3</span>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-3 h-3 bg-primary-container border border-ink"></div> You</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-3 h-3 bg-ink/20 border border-ink"></div> Class Average</div>
                </div>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Assignments</h3>
              {COURSE_DATA.assignments.map((item, i) => (
                <div key={i} className="bg-white border-3 border-ink p-6 shadow-[3px_3px_0px_#1A1A1A] flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="p-2 border-2 border-ink bg-tertiary text-white">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg">{item.title}</h4>
                      <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase opacity-40">Score</p>
                    <p className="font-black text-xl">{item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Tabs - Placeholder */}
          {activeTab >= 2 && activeTab <= 3 && (
            <div className="bg-white border-3 border-ink p-12 shadow-[3px_3px_0px_#1A1A1A] text-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{TABS[activeTab]}</h3>
              <p className="text-lg font-medium opacity-60 italic">Content coming soon...</p>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === 4 && (
            <div className="bg-secondary text-white border-3 border-ink p-8 shadow-[6px_6px_0px_#1A1A1A] relative overflow-hidden">
              <Sparkles className="absolute -right-4 -top-4 opacity-20" size={120} fill="currentColor" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={24} fill="currentColor" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">AI Insights</h3>
                </div>
                <p className="text-lg font-medium leading-snug">
                  "Your midterm performance was <span className="underline decoration-4 decoration-primary-container">below your target</span>. To secure an A, you need at least <span className="bg-white text-ink px-2 font-black">92%</span> on the Final Exam."
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase">
                    <AlertCircle size={14} />
                    Weakness: Graph Traversal
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase">
                    <Target size={14} />
                    Opportunity: Final Project
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Critical Insight - Always visible at bottom */}
          <div className="bg-ink text-white border-3 border-ink p-8 shadow-[6px_6px_0px_#a8275a]">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-secondary border-2 border-white/20 mt-1">
                <Settings size={20} />
              </div>
              <div className="space-y-3 flex-1">
                <h4 className="text-xl font-black uppercase tracking-tighter">Critical Insight: Linked Lists</h4>
                <p className="font-medium leading-relaxed opacity-90">
                  Your Quiz 2 was 2.2 points below class average. AI suggests reviewing Chapters 4-6 (Double Linked Lists & Memory Management) before Quiz 3 on Binary Trees.
                </p>
                <button className="bg-white text-ink border-2 border-white px-4 py-2 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all mt-2">
                  Generate Study Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Stats */}
          <div className="bg-white border-3 border-ink shadow-[3px_3px_0px_#1A1A1A]">
            <div className="p-6 border-b-4 border-ink">
              <h3 className="text-xl font-black uppercase tracking-tighter">Quick Stats</h3>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: 'Your Average', value: COURSE_DATA.quickStats.yourAverage },
                { label: 'Class Average', value: COURSE_DATA.quickStats.classAverage },
                { label: 'Std Deviation', value: COURSE_DATA.quickStats.stdDeviation },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center border-b border-ink/10 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
                  <span className="text-xl font-black">{stat.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-b border-ink/10 pb-3">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Distance from Topper</span>
                <span className="text-xl font-black text-secondary">{COURSE_DATA.quickStats.distanceFromTopper}</span>
              </div>
            </div>
            {/* Current Projected Grade */}
            <div className="p-6 bg-primary-container border-t-4 border-ink">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">Current Projected Grade</p>
              <p className="text-4xl font-black leading-none">{COURSE_DATA.quickStats.projectedGrade}</p>
              <p className="text-[10px] font-bold uppercase mt-2 opacity-60">{COURSE_DATA.quickStats.projectedNote}</p>
            </div>
          </div>

          {/* Recommended Resource */}
          <div className="bg-white border-3 border-ink shadow-[3px_3px_0px_#1A1A1A] overflow-hidden">
            <div className="h-48 bg-ink overflow-hidden relative">
              <img 
                alt="Code visualization" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
                src="https://picsum.photos/seed/code/400/300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Recommended Resource</p>
              <h4 className="text-lg font-black leading-tight">Visualizing Data Structures: An Interactive Guide</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
