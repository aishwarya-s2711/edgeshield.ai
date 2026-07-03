import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MicrosoftLogin from './pages/MicrosoftLogin';

export const getDashboardRoute = (role) => {
  if (!role) return '/login';
  switch (role) {
    case 'Administrator': return '/admin/dashboard';
    case 'Plant Manager': return '/plant-manager/dashboard';
    case 'Maintenance Engineer': return '/maintenance/dashboard';
    case 'Machine Operator': return '/operator/dashboard';
    default: return '/login';
  }
};

// Protected Route Component with Role Validation
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center animate-pulse">
          <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase animate-pulse">Authenticating Identity...</span>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return children;
};

// Public Route Component to redirect already authenticated users to their specific dashboard
const PublicRoute = ({ children }) => {
  const { token, user } = useAuth();
  if (token && user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/microsoft-login" element={<PublicRoute><MicrosoftLogin /></PublicRoute>} />

          {/* Protected Role Routes */}
          <Route 
            path="/admin/dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['Administrator']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/plant-manager/dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['Plant Manager']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['Maintenance Engineer']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/operator/dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['Machine Operator']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
