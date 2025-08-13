import React, { useState } from 'react';
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

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeToTerms: false
  });

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
      
      // Mock successful login
      localStorage.setItem("token", "mock_token");
      setIsSuccess(true);
      navigate("/dashboard");

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
      
      // Mock successful signup
      setIsSuccess(true);
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
                : "Your account has been created successfully. Please check your email to verify your account."}
            </p>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                companyName: '',
                email: '',
                password: '',
                rememberMe: false,
                agreeToTerms: false
              });
              if (isLogin) navigate("/dashboard");
            }}
            className="success-button"
          >
            {isLogin ? "Go to Dashboard" : "Continue"}
          </button>
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