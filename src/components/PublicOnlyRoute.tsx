import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingScreen } from './LoadingScreen';

/**
 * Guard for public-only pages (/auth, /).
 * If the user is already authenticated, redirect to /post-auth
 * so the canonical router decides where they belong.
 */
export const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (user) return <Navigate to="/post-auth" replace />;

  return <>{children}</>;
};
