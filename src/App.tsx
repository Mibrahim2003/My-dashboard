/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Onboarding } from './components/Onboarding';
import { CourseDetail } from './components/CourseDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected Routes (Wrapped in Layout) */}
        <Route 
          path="/dashboard" 
          element={
            <Layout>
              <Dashboard />
            </Layout>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <Layout>
              <Analytics />
            </Layout>
          } 
        />
        <Route 
          path="/courses" 
          element={
            <Layout>
              <div className="py-12 text-center">
                <h2 className="text-4xl font-black uppercase tracking-tighter">My Courses</h2>
                <p className="mt-4 text-xl font-medium opacity-60 italic">Course listing view coming soon...</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/courses/:id" 
          element={
            <Layout>
              <CourseDetail />
            </Layout>
          } 
        />
        <Route 
          path="/library" 
          element={
            <Layout>
              <div className="py-12 text-center">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Knowledge Library</h2>
                <p className="mt-4 text-xl font-medium opacity-60 italic">Library management coming soon...</p>
              </div>
            </Layout>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <Layout>
              <div className="py-12 text-center">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Settings</h2>
                <p className="mt-4 text-xl font-medium opacity-60 italic">Account settings coming soon...</p>
              </div>
            </Layout>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

