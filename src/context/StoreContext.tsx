import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
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

const DEFAULT_ONBOARDING_STATE: OnboardingState = {
  loadoutCommitted: false,
  version: 1,
};

const normalizeCourse = (course: any): Course => {
  const legacyColor = typeof course?.color === 'string' ? course.color : '';

  let impactLevel: Course['impactLevel'] = course?.impactLevel;
  if (!impactLevel || !['heavy', 'standard', 'minimal'].includes(impactLevel)) {
    if (legacyColor.includes('secondary')) impactLevel = 'heavy';
    else if (legacyColor.includes('primary')) impactLevel = 'standard';
    else if (Number(course?.credits) >= 4) impactLevel = 'heavy';
    else if (Number(course?.credits) === 3) impactLevel = 'standard';
    else impactLevel = 'minimal';
  }

  return {
    id: String(course?.id ?? Date.now()),
    code: String(course?.code ?? 'UNKNOWN'),
    name: String(course?.name ?? 'UNKNOWN COURSE'),
    credits: Number(course?.credits ?? 0),
    gradeProgress: Number(course?.gradeProgress ?? 0),
    impactLevel,
    grade: String(course?.grade ?? 'N/A'),
    weightage: {
      quizzes: Number(course?.weightage?.quizzes ?? 0),
      assignments: Number(course?.weightage?.assignments ?? 0),
      midterm: Number(course?.weightage?.midterm ?? 0),
      final: Number(course?.weightage?.final ?? 0),
      project: Number(course?.weightage?.project ?? 0),
    },
  };
};

const mapOnboardingRow = (row: any): OnboardingState => ({
  loadoutCommitted: Boolean(row?.loadout_committed),
  committedAt: row?.committed_at ?? undefined,
  version: Number(row?.version ?? 1),
});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [courses, setCoursesState] = useState<Course[]>([]);
  const [deadlines, setDeadlinesState] = useState<Deadline[]>([]);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(DEFAULT_ONBOARDING_STATE);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setUserProfileState(null);
      setCoursesState([]);
      setDeadlinesState([]);
      setOnboardingState(DEFAULT_ONBOARDING_STATE);
      return;
    }

    const hydrateStore = async () => {
      const [profileRes, coursesRes, deadlinesRes, onboardingRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('courses').select('*').eq('user_id', user.id),
        supabase.from('deadlines').select('*').eq('user_id', user.id),
        supabase.from('onboarding_states').select('*').eq('user_id', user.id).maybeSingle(),
      ]);

      if (profileRes.error && profileRes.error.code !== 'PGRST116') {
        console.warn('Failed to load profile from Supabase:', profileRes.error.message);
      }
      if (coursesRes.error) {
        console.warn('Failed to load courses from Supabase:', coursesRes.error.message);
      }
      if (deadlinesRes.error) {
        console.warn('Failed to load deadlines from Supabase:', deadlinesRes.error.message);
      }
      if (onboardingRes.error && onboardingRes.error.code !== 'PGRST116') {
        console.warn('Failed to load onboarding state from Supabase:', onboardingRes.error.message);
      }

      setUserProfileState(
        profileRes.data
          ? {
              name: profileRes.data.name,
              degree: profileRes.data.degree,
              universityName: profileRes.data.university_name,
              graduationYear: String(profileRes.data.graduation_year),
              currentCgpa: Number(profileRes.data.current_cgpa),
              targetGpa: Number(profileRes.data.target_gpa),
              semester: profileRes.data.semester,
              courseCount: Number(profileRes.data.course_count ?? 0),
            }
          : null,
      );

      setCoursesState((coursesRes.data ?? []).map(normalizeCourse));
      setDeadlinesState(
        (deadlinesRes.data ?? []).map((row: any) => ({
          id: String(row.id),
          title: row.title,
          course: row.course,
          topic: row.topic,
          dueDate: row.due_date,
          priority: row.priority,
        })),
      );
      setOnboardingState(onboardingRes.data ? mapOnboardingRow(onboardingRes.data) : DEFAULT_ONBOARDING_STATE);
    };

    hydrateStore();
  }, [user, authLoading]);

  const setUserProfile = (profile: UserProfile | null) => {
    setUserProfileState(profile);

    if (!user || !profile) return;

    void supabase.from('profiles').upsert(
      {
        user_id: user.id,
        name: profile.name,
        degree: profile.degree,
        university_name: profile.universityName,
        graduation_year: profile.graduationYear,
        current_cgpa: profile.currentCgpa,
        target_gpa: profile.targetGpa,
        semester: profile.semester,
        course_count: profile.courseCount,
      },
      { onConflict: 'user_id' },
    );
  };

  const setCourses = (nextCourses: Course[]) => {
    const normalized = nextCourses.map(normalizeCourse);
    setCoursesState(normalized);

    if (!user) return;

    const payload = normalized.map((course) => ({
      id: course.id,
      user_id: user.id,
      code: course.code,
      name: course.name,
      credits: course.credits,
      grade_progress: course.gradeProgress,
      impact_level: course.impactLevel,
      grade: course.grade,
      weightage: course.weightage,
    }));

    void supabase.from('courses').delete().eq('user_id', user.id).then(({ error }) => {
      if (error) {
        console.warn('Failed to clear courses before sync:', error.message);
        return;
      }
      if (payload.length === 0) return;
      void supabase.from('courses').insert(payload).then(({ error: insertError }) => {
        if (insertError) console.warn('Failed to sync courses to Supabase:', insertError.message);
      });
    });
  };

  const addCourse = (course: Course) => {
    const normalized = normalizeCourse(course);
    setCoursesState((prev) => [...prev, normalized]);

    if (!user) return;

    void supabase.from('courses').upsert(
      {
        id: normalized.id,
        user_id: user.id,
        code: normalized.code,
        name: normalized.name,
        credits: normalized.credits,
        grade_progress: normalized.gradeProgress,
        impact_level: normalized.impactLevel,
        grade: normalized.grade,
        weightage: normalized.weightage,
      },
      { onConflict: 'id' },
    );
  };

  const removeCourse = (courseId: string) => {
    setCoursesState((prev) => prev.filter((c) => c.id !== courseId));

    if (!user) return;

    void supabase.from('courses').delete().eq('user_id', user.id).eq('id', courseId);
  };

  const setDeadlines = (nextDeadlines: Deadline[]) => {
    setDeadlinesState(nextDeadlines);

    if (!user) return;

    const payload = nextDeadlines.map((d) => ({
      id: d.id,
      user_id: user.id,
      title: d.title,
      course: d.course,
      topic: d.topic,
      due_date: d.dueDate,
      priority: d.priority,
    }));

    void supabase.from('deadlines').delete().eq('user_id', user.id).then(({ error }) => {
      if (error) {
        console.warn('Failed to clear deadlines before sync:', error.message);
        return;
      }
      if (payload.length === 0) return;
      void supabase.from('deadlines').insert(payload).then(({ error: insertError }) => {
        if (insertError) console.warn('Failed to sync deadlines to Supabase:', insertError.message);
      });
    });
  };

  const commitLoadout = () => {
    const next = {
      ...onboardingState,
      loadoutCommitted: true,
      committedAt: new Date().toISOString(),
    };
    setOnboardingState(next);

    if (!user) return;

    void supabase.from('onboarding_states').upsert(
      {
        user_id: user.id,
        loadout_committed: true,
        committed_at: next.committedAt,
        version: next.version,
      },
      { onConflict: 'user_id' },
    );
  };

  const resetLoadoutCommit = () => {
    const next = {
      ...onboardingState,
      loadoutCommitted: false,
      committedAt: undefined,
    };
    setOnboardingState(next);

    if (!user) return;

    void supabase.from('onboarding_states').upsert(
      {
        user_id: user.id,
        loadout_committed: false,
        committed_at: null,
        version: next.version,
      },
      { onConflict: 'user_id' },
    );
  };

  return (
    <StoreContext.Provider
      value={{
        userProfile,
        setUserProfile,
        courses,
        setCourses,
        addCourse,
        removeCourse,
        deadlines,
        setDeadlines,
        onboardingState,
        commitLoadout,
        resetLoadoutCommit,
      }}
    >
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
