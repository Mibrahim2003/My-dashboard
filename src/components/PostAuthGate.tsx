import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { LoadingScreen } from './LoadingScreen';

/**
 * PostAuthGate — the single canonical routing decision point after any auth event.
 *
 * Both Google OAuth and email auth funnel here.
 * Zero UI — just reads state and redirects:
 *   1. Not authenticated → /auth
 *   2. No profile → /profile-setup
 *   3. No loadout committed → /onboarding
 *   4. All good → /dashboard
 */
export const PostAuthGate = () => {
  const { user, loading } = useAuth();
  const { userProfile, onboardingState } = useStore();

  if (loading) return <LoadingScreen message="Verifying Credentials..." />;

  if (!user) return <Navigate to="/auth" replace />;

  if (!userProfile?.name) return <Navigate to="/profile-setup" replace />;

  if (!onboardingState.loadoutCommitted) return <Navigate to="/onboarding" replace />;

  return <Navigate to="/dashboard" replace />;
};
