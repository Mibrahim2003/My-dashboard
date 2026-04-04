import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { LoadingScreen } from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If true, user must have completed profile setup. Default: true */
  requireProfile?: boolean;
  /** If true, user must have at least one course. Default: false */
  requireCourses?: boolean;
}

/**
 * Guard wrapper for protected routes.
 *
 * Tiers:
 *   - Auth required (always) — redirect to /auth if no session
 *   - Profile required (default on) — redirect to /profile-setup if no profile
 *   - Courses required (opt-in) — redirect to /onboarding if no courses
 */
export const ProtectedRoute = ({
  children,
  requireProfile = true,
  requireCourses = false,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { userProfile, courses } = useStore();

  if (loading) return <LoadingScreen message="Verifying Access..." />;

  if (!user) return <Navigate to="/auth" replace />;

  if (requireProfile && !userProfile?.name) return <Navigate to="/profile-setup" replace />;

  if (requireCourses && courses.length === 0) return <Navigate to="/onboarding" replace />;

  return <>{children}</>;
};
