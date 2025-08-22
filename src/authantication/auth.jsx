import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import './auth.css';

export default function AuthPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeToTerms: false
  });

  // Initialize Google OAuth
  useEffect(() => {
    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id',
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Mock user database (in real app, this would be your backend API)
  const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');

  const findUser = (email) => {
    return mockUsers.find(user => user.email === email);
  };

  const createUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      companyName: userData.companyName || userData.name || 'My Company',
      name: userData.name || userData.email.split('@')[0],
      avatar: userData.picture || null,
      createdAt: new Date().toISOString(),
      isGoogleUser: userData.isGoogleUser || false
    };
    
    const updatedUsers = [...mockUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return newUser;
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const validateSignupForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGoogleResponse = async (response) => {
    try {
      setIsGoogleLoading(true);
      
      // Decode JWT token to get user info
      const userInfo = JSON.parse(atob(response.credential.split('.')[1]));
      
      const userData = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        isGoogleUser: true
      };

      // Check if user exists
      let user = findUser(userData.email);
      
      if (!user) {
        // Create new user if doesn't exist
        user = createUser(userData);
        console.log('New user created:', user);
      } else {
        console.log('Existing user found:', user);
      }

      // Set session
      const sessionData = {
        token: 'google_auth_token_' + Date.now(),
        user: user,
        loginMethod: 'google'
      };
      
      localStorage.setItem('authToken', sessionData.token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('loginMethod', 'google');

      // Navigate to dashboard
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Google authentication failed:', error);
      setErrors({ general: 'Google authentication failed. Please try again.' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      setErrors({ general: 'Google authentication is not available. Please try again.' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validateLoginForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists
      const user = findUser(formData.email);
      
      if (!user) {
        setErrors({ general: "No account found with this email. Please sign up first." });
        return;
      }

      // In real app, you'd verify password hash here
      // For demo, we'll just check if password is not empty
      if (!formData.password) {
        setErrors({ general: "Invalid email or password" });
        return;
      }

      // Set session
      const sessionData = {
        token: 'email_auth_token_' + Date.now(),
        user: user,
        loginMethod: 'email'
      };
      
      localStorage.setItem('authToken', sessionData.token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('loginMethod', 'email');

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Sign in failed:", error);
      setErrors({ general: "Invalid email or password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = validateSignupForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const existingUser = findUser(formData.email);
      
      if (existingUser) {
        setErrors({ general: "An account with this email already exists. Please sign in instead." });
        return;
      }

      // Create new user
      const newUser = createUser({
        email: formData.email,
        companyName: formData.companyName,
        isGoogleUser: false
      });

      // Set session
      const sessionData = {
        token: 'email_auth_token_' + Date.now(),
        user: newUser,
        loginMethod: 'email'
      };
      
      localStorage.setItem('authToken', sessionData.token);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('loginMethod', 'email');

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      setErrors({ general: "Signup failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !/\S+@\S+\.\S+/.test(resetEmail)) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResetEmailSent(true);
  };

  if (isSuccess) {
    return (
      <div className="auth-success-container">
        <div className="success-card">
          <div className="success-content">
            <CheckCircle className="success-icon" />
            <h2 className="success-title">
              {isLogin ? "Welcome back! 👋" : "Welcome aboard! 🎉"}
            </h2>
            <p className="success-message">
              {isLogin 
                ? "You have successfully signed in to your account."
                : "Your account has been created successfully. Redirecting to your dashboard..."}
            </p>
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Setting up your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="forgot-container">
        <div className="forgot-card">
          {resetEmailSent ? (
            <div className="reset-success">
              <CheckCircle className="reset-success-icon" />
              <h2 className="reset-success-title">Check your email</h2>
              <p className="reset-success-message">
                We've sent a password reset link to <strong>{resetEmail}</strong>
              </p>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmailSent(false);
                  setResetEmail('');
                }}
                className="success-button"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="forgot-header">
                <h1 className="forgot-title">Reset Password</h1>
                <p className="forgot-subtitle">Enter your email to receive a reset link</p>
              </div>
              <div className="forgot-form">
                <div className="form-group">
                  <label htmlFor="resetEmail" className="form-label">
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      id="resetEmail"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <button
                  onClick={handleForgotPassword}
                  disabled={!resetEmail.trim() || !/\S+@\S+\.\S+/.test(resetEmail)}
                  className="reset-button"
                >
                  Send Reset Link
                </button>
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="back-button"
                >
                  Back to Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? 'login' : 'signup'}`}>
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="auth-subtitle">
            {isLogin ? "Sign in to your account" : "Join us today and get started!"}
          </p>
        </div>

        {/* Google Sign In Button */}
        <div className="google-auth-section">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="google-signin-button"
          >
            {isGoogleLoading ? (
              <div className="button-loading">
                <div className="spinner"></div>
                Connecting...
              </div>
            ) : (
              <>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLogin ? 'Continue with Google' : 'Sign up with Google'}
              </>
            )}
          </button>
          
          <div className="divider">
            <span className="divider-text">or</span>
          </div>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="auth-form">
          {errors.general && (
            <div className="error-alert">
              <AlertCircle className="error-icon" />
              <p className="error-text">{errors.general}</p>
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`form-input ${errors.companyName ? 'input-error' : ''}`}
                  placeholder="Your Company"
                />
              </div>
              {errors.companyName && (
                <p className="error-message">{errors.companyName}</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder={isLogin ? "john@example.com" : "your@company.com"}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
            {!isLogin && (
              <div className="password-hint">
                Password must be at least 8 characters
              </div>
            )}
          </div>

          {isLogin ? (
            <div className="remember-forgot">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="remember-checkbox"
                />
                <label htmlFor="rememberMe" className="remember-label">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>
          ) : (
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label htmlFor="agreeToTerms" className="checkbox-label">
                I agree to the{' '}
                <a href="#" className="link">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="link">
                  Privacy Policy
                </a>
              </label>
              {errors.agreeToTerms && (
                <p className="error-message">{errors.agreeToTerms}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <div className="button-loading">
                <div className="spinner"></div>
                {isLogin ? "Signing In..." : "Creating Account..."}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="auth-switch">
          <p className="switch-text">
            {isLogin 
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="switch-link"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}