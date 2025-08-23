import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './landingPage/landing';
import Dashboard from './content/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { SignIn, SignUp } from '@clerk/clerk-react';
import './globals.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file")
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      afterSignOutUrl="/" 
      appearance={{
        variables: {
          colorPrimary: '#4F46E5',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#1f2937',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          borderRadius: '8px'
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
          card: 'shadow-lg',
          headerTitle: 'text-2xl font-bold',
          headerSubtitle: 'text-gray-600'
        }
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sign-in/*" 
          element={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '100vh',
              backgroundColor: '#f9fafb'
            }}>
              <SignIn 
                routing="path" 
                path="/sign-in" 
                redirectUrl="/dashboard"
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: 'mx-auto',
                    card: 'shadow-xl border border-gray-200'
                  }
                }}
              />
            </div>
          } 
        />
        <Route 
          path="/sign-up/*" 
          element={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '100vh',
              backgroundColor: '#f9fafb'
            }}>
              <SignUp 
                routing="path" 
                path="/sign-up" 
                redirectUrl="/dashboard"
                signInUrl="/sign-in"
                appearance={{
                  elements: {
                    rootBox: 'mx-auto',
                    card: 'shadow-xl border border-gray-200'
                  }
                }}
              />
            </div>
          } 
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <Router>
      <ClerkProviderWithRoutes />
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);