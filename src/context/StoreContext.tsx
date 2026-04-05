import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Course, Deadline, UserProfile, OnboardingState } from '../types';

interface StoreContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
  deadlines: Deadline[];
  setDeadlines: (deadlines: Deadline[]) => void;
  onboardingState: OnboardingState;
  commitLoadout: () => void;
  resetLoadoutCommit: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('outlier-profile', null);
  
  const [onboardingState, setOnboardingState] = useLocalStorage<OnboardingState>('outlier-onboarding', { 
    loadoutCommitted: false, 
    version: 1 
  });

  // Zero-data initialization ensures new authenticated users pass through onboarding natively.
  const [courses, setCourses] = useLocalStorage<Course[]>('outlier-courses', []);

  // Demo data removed. We also clear out deadlines so we start with a pure state.
  const [deadlines, setDeadlines] = useLocalStorage<Deadline[]>('outlier-deadlines', []);

  // Migration Effect for old courses that lack impactLevel and have raw color classes.
  useEffect(() => {
    if (courses.length > 0) {
      let migrated = false;
      const updatedCourses = courses.map(c => {
        let newCourse = { ...c };
        let needsMigration = false;

        // 1. Guarantee impactLevel
        if (!newCourse.impactLevel || !['heavy', 'standard', 'minimal'].includes(newCourse.impactLevel)) {
          needsMigration = true;
          const legacyColor = (newCourse as any).color;
          if (typeof legacyColor === 'string') {
            if (legacyColor.includes('secondary')) newCourse.impactLevel = 'heavy';
            else if (legacyColor.includes('primary')) newCourse.impactLevel = 'standard';
            else newCourse.impactLevel = 'minimal';
          } else {
            if (newCourse.credits >= 4) newCourse.impactLevel = 'heavy';
            else if (newCourse.credits === 3) newCourse.impactLevel = 'standard';
            else newCourse.impactLevel = 'minimal';
          }
        }

        // 2. Erase legacy color
        if ('color' in newCourse) {
          needsMigration = true;
          delete (newCourse as any).color;
        }

        if (needsMigration) migrated = true;
        return newCourse;
      });
      if (migrated) {
        setCourses(updatedCourses);
      }
    }
  }, [courses, setCourses]);

  const commitLoadout = () => {
    setOnboardingState(prev => ({
      ...prev,
      loadoutCommitted: true,
      committedAt: new Date().toISOString()
    }));
  };

  const resetLoadoutCommit = () => {
    setOnboardingState(prev => ({
      ...prev,
      loadoutCommitted: false,
      committedAt: undefined
    }));
  };

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const removeCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  return (
    <StoreContext.Provider value={{ 
      userProfile, setUserProfile, 
      courses, setCourses, addCourse, removeCourse, 
      deadlines, setDeadlines, 
      onboardingState, commitLoadout, resetLoadoutCommit 
    }}>
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
