import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Course, Deadline, UserProfile } from '../types';

interface StoreContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
  deadlines: Deadline[];
  setDeadlines: (deadlines: Deadline[]) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('outlier-profile', null);

  // Initial demo data so the dashboard doesn't look empty for the first time
  const [courses, setCourses] = useLocalStorage<Course[]>('outlier-courses', [
    { id: '1', code: 'CS-201', name: 'Data Structures', credits: 3, gradeProgress: 88, color: 'bg-primary', grade: 'A', weightage: { quizzes: 15, assignments: 10, midterm: 30, final: 40, project: 5 } },
    { id: '2', code: 'EE-101', name: 'Circuit Theory', credits: 4, gradeProgress: 72, color: 'bg-secondary', grade: 'B+', weightage: { quizzes: 15, assignments: 10, midterm: 30, final: 40, project: 5 } },
  ]);

  const [deadlines, setDeadlines] = useLocalStorage<Deadline[]>('outlier-deadlines', [
    { id: '1', title: 'Quiz 2 — CS-201', course: 'CS-201', topic: 'Graph Algorithms', dueDate: 'Due Tomorrow', priority: 'urgent' },
  ]);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const removeCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  return (
    <StoreContext.Provider value={{ userProfile, setUserProfile, courses, setCourses, addCourse, removeCourse, deadlines, setDeadlines }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
