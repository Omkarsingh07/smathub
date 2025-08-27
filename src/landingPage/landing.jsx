import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaRobot, FaDollarSign, FaPlay, FaCheckCircle, FaStar, FaClock, FaUsers, FaThumbsUp, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import './landing.css';

const LandingPage = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  // Redirect to dashboard if already signed in

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Production-ready navigation functions

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  // Smooth scrolling for anchor links

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Header scroll effect

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <FaPlay />,
      title: 'Smart Scheduling',
      description: 'Schedule posts across multiple platforms with AI-powered optimal timing recommendations to maximize engagement and reach.',
      color: '#4F46E5'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Advanced Analytics',
      description: 'Get detailed insights into your social media performance with comprehensive reports and actionable recommendations.',
      color: '#059669'
    },
    {
      icon: <FaInstagram />,
      title: 'Brand Collaboration',
      description: 'Work with your team or clients in one space. Share drafts, get approvals, assign roles, and leave feedback—all inside the tool.',
      color: '#DC2626'
    },
    {
      icon: <FaLinkedin />,
      title: 'Trend Discovery',
      description: "Identify what's trending across platforms. Leverage AI to suggest viral hashtags, content formats, and top-performing topics in your niche.",
      color: '#7C3AED'
    },
    {
      icon: <FaRobot />,
      title: 'AI Chatbot Assistant',
      description: 'Get instant help with content creation, strategy suggestions, and platform-specific advice from our intelligent AI assistant available 24/7.',
      color: '#EA580C',
      action: {
        text: 'Try AI Assistant',
        onClick: () => {
          alert('AI Chatbot feature coming soon!');
        }
      }
    },
    {
      icon: <FaDollarSign />,
      title: 'Flexible Pricing',
      description: 'Choose from our affordable plans designed for individuals, small businesses, and enterprises. Start free and scale as you grow.',
      color: '#0891B2',
      action: {
        text: 'View Pricing',
        onClick: () => setShowPricingModal(true)
      }
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 social accounts',
        '5 scheduled posts per month',
        'Basic analytics',
        'Email support',
        'AI assistant (limited)'
      ],
      buttonText: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For growing businesses',
      features: [
        'Unlimited social accounts',
        'Unlimited scheduled posts',
        'Advanced analytics',
        'Priority support',
        'Full AI assistant access',
        'Team collaboration',
        'Content calendar',
        'Brand collaboration',
        'Custom branding'
      ],
      buttonText: 'Start Pro Trial',
      popular: true
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, name: 'Twitter', url: 'https://x.com/wrsmat' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: '#' },
    { icon: <FaFacebook />, name: 'Facebook', url: '#' },
    { icon: <FaInstagram />, name: 'Instagram', url: '#' }
  ];

  const toggleModal = (type) => {
    if (type === 'terms') {
      setShowTermsModal(!showTermsModal);
    } else if (type === 'privacy') {
      setShowPrivacyModal(!showPrivacyModal);
    } else if (type === 'pricing') {
      setShowPricingModal(!showPricingModal);
    }
  };

  // Show loading state while Clerk is initializing
  
  if (!isLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="lp-landing-page">
      {/* Header */}
      <header className={`lp-header ${isScrolled ? 'lp-scrolled' : ''}`}>
        <nav className="lp-navbar lp-container">
          <div className="lp-logo">
            <img src="/assets/brandlogo.svg" alt="WRSMAT" />
          </div>
          
          <div className="lp-nav-links">
            <a href="#features" className="lp-nav-link">Features</a>
            <a href="#about" className="lp-nav-link">About</a>
            <a href="#" className="lp-nav-link" onClick={(e) => { e.preventDefault(); setShowPricingModal(true); }}>Pricing</a>
            <a href="#contact" className="lp-nav-link">Contact</a>
          </div>
          
          <div className="lp-auth-buttons">
            <button className="lp-btn lp-btn-sm" onClick={handleLoginClick}>
              Sign In
            </button>
            <button className="lp-btn lp-btn-primary lp-btn-sm" onClick={handleSignUpClick}>
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-background">
          <div className="lp-hero-gradient"></div>
          <div className="lp-floating-elements">
            <div className="lp-floating-icon lp-float-1"><FaPlay /></div>
            <div className="lp-floating-icon lp-float-2"><FaCheckCircle /></div>
            <div className="lp-floating-icon lp-float-3"><FaRobot /></div>
            <div className="lp-floating-icon lp-float-4"><FaInstagram /></div>
          </div>
        </div>
        <div className="lp-hero-content lp-container">
          <div className="lp-hero-badge">
            <span>New: AI-Powered Content Generation</span>
          </div>
          <h1 className="lp-hero-title">
            Automate Your 
            <span className="lp-gradient-text"> Social Media Success</span>
          </h1>
          <p className="lp-hero-subtitle">
            Powerful AI-driven tools to grow your audience, increase engagement, 
            and save hours every week. Join 50,000+ creators and businesses already winning with WRSMAT.
          </p>
          
          <div className="lp-cta-buttons">
            <button className="lp-btn lp-btn-primary lp-btn-large" onClick={handleSignUpClick}>
              <span>Start Free Trial</span>
              <FaPlay className="lp-btn-icon" />
            </button>
            <button className="lp-btn lp-btn-outline lp-btn-large" onClick={() => setShowDemoModal(true)}>
              <FaPlay className="lp-btn-icon" />
              <span>Watch Demo</span>
            </button>
          </div>
          
          <div className="lp-trust-indicators">
            <div className="lp-trust-item">
              <FaCheckCircle className="lp-trust-icon" />
              <span>No Credit Card Required</span>
            </div>
            <div className="lp-trust-item">
              <FaCheckCircle className="lp-trust-icon" />
              <span>14-Day Free Trial</span>
            </div>
            <div className="lp-trust-item">
              <FaCheckCircle className="lp-trust-icon" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lp-features-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Why Choose WRSMAT?</h2>
            <p className="lp-section-description">
              WRSMAT is the ultimate social media automation platform designed to streamline your digital marketing efforts 
              and maximize your online presence across all major platforms.
            </p>
          </div>

          <div className="lp-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="lp-feature-card" style={{'--accent-color': feature.color}}>
                <div className="lp-feature-icon-container">
                  <span className="lp-feature-icon">{feature.icon}</span>
                </div>
                <h3 className="lp-feature-title">{feature.title}</h3>
                <p className="lp-feature-description">{feature.description}</p>
                {feature.action && (
                  <button 
                    className="lp-btn lp-btn-outline lp-btn-sm lp-feature-btn"
                    onClick={feature.action.onClick}
                  >
                    {feature.action.text}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="lp-about-section">
        <div className="lp-container">
          <div className="lp-about-content">
            <div className="lp-about-text">
              <div className="lp-section-header">
                <h2 className="lp-section-title">Revolutionizing Social Media Management</h2>
                <p className="lp-about-description">
                  Our intelligent platform connects all your favorite social media platforms in one powerful dashboard. 
                  From small startups to enterprise organizations, WRSMAT scales with your needs while providing 
                  the insights and automation tools necessary to drive meaningful engagement and explosive growth.
                </p>
              </div>
              
              <div className="lp-about-features">
                <div className="lp-about-feature">
                  <FaCheckCircle className="lp-check-icon" />
                  <span>Cross-platform scheduling and management</span>
                </div>
                <div className="lp-about-feature">
                  <FaCheckCircle className="lp-check-icon" />
                  <span>AI-powered content optimization</span>
                </div>
                <div className="lp-about-feature">
                  <FaCheckCircle className="lp-check-icon" />
                  <span>Real-time analytics and insights</span>
                </div>
                <div className="lp-about-feature">
                  <FaCheckCircle className="lp-check-icon" />
                  <span>Team collaboration tools</span>
                </div>
              </div>
            </div>
            
            <div className="lp-about-platforms">
              <h3 className="lp-platforms-title">Supported Platforms</h3>
              <div className="lp-platforms-grid">
                <div className="lp-platform-card">
                  <img src="/assets/instagram.png" alt="Instagram" className="lp-platform-image" />
                  <div className="lp-platform-info">
                    <h4>Instagram</h4>
                    <p>Connect and automate your Instagram marketing.</p>
                  </div>
                </div>
                <div className="lp-platform-card">
                  <img src="/assets/facebook.png" alt="Facebook" className="lp-platform-image" />
                  <div className="lp-platform-info">
                    <h4>Facebook</h4>
                    <p>Manage your Facebook pages and ads with ease.</p>
                  </div>
                </div>
                <div className="lp-platform-card">
                  <img src="/assets/youtube.png" alt="YouTube" className="lp-platform-image" />
                  <div className="lp-platform-info">
                    <h4>YouTube</h4>
                    <p>Upload and manage your video content effortlessly.</p>
                  </div>
                </div>
                
              </div>
              <p className="lp-coming-soon">More platforms coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-cta-section">
        <div className="lp-container">
          <div className="lp-cta-content">
            <h2>Ready to Transform Your Social Media?</h2>
            <p>
              Join thousands of creators and businesses already growing their audience 
              with WRSMAT's intelligent automation tools.
            </p>
            <div className="lp-cta-buttons">
              <button className="lp-btn lp-btn-primary lp-btn-large" onClick={handleSignUpClick}>
                Start Your Free Trial
              </button>
              <button className="lp-btn lp-btn-outline lp-btn-large" onClick={() => setShowPricingModal(true)}>
                View Pricing Plans
              </button>
            </div>
            
            <div className="lp-cta-trust">
              <div className="lp-cta-trust-item">
                <FaCheckCircle className="lp-cta-trust-icon" />
                <span>14-day free trial</span>
              </div>
              <div className="lp-cta-trust-item">
                <FaCheckCircle className="lp-cta-trust-icon" />
                <span>No credit card required</span>
              </div>
              <div className="lp-cta-trust-item">
                <FaCheckCircle className="lp-cta-trust-icon" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-content">
            <div className="lp-footer-section lp-footer-brand">
              <div className="lp-footer-logo">
                <img src="/assets/brandlogo.svg" alt="WRSMAT" />
              </div>
              <p>Empowering creators and businesses to succeed on social media with intelligent automation and insights.</p>
              <div className="lp-social-links">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name} className="lp-social-link">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="lp-footer-section">
              <h3>Product</h3>
              <a href="#features">Features</a>
              <a href="#" onClick={() => setShowPricingModal(true)}>Pricing</a>
              <a href="#" onClick={() => setShowDemoModal(true)}>Demo</a>
              <a href="#about">About</a>
            </div>

            <div className="lp-footer-section">
              <h3>Support</h3>
              <a href="#">Help Center</a>
              <a href="#">Contact Support</a>
            </div>

            <div className="lp-footer-section">
              <h3>Contact</h3>
              <div className="lp-contact-info">
                <p>Email: support@wrsmat.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Location: San Francisco, CA</p>
              </div>
            </div>

            <div className="lp-footer-section">
              <h3>Legal</h3>
              <a href="#" onClick={() => toggleModal('privacy')}>Privacy Policy</a>
              <a href="#" onClick={() => toggleModal('terms')}>Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR</a>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <p>&copy; {new Date().getFullYear()} WRSMAT. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* All existing modals... */}
      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="lp-modal-overlay" onClick={() => toggleModal('pricing')}>
          <div className="lp-modal-content lp-pricing-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => toggleModal('pricing')}>
              &times;
            </button>
            <h2>Choose Your Plan</h2>
            <p className="lp-pricing-subtitle">Select the perfect plan for your social media needs</p>
            
            <div className="lp-pricing-grid">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`lp-pricing-card ${plan.popular ? 'lp-pricing-popular' : ''}`}>
                  {plan.popular && <div className="lp-popular-badge">Most Popular</div>}
                  <div className="lp-pricing-header">
                    <h3>{plan.name}</h3>
                    <div className="lp-pricing-price">
                      <span className="lp-price">{plan.price}</span>
                      <span className="lp-period">{plan.period}</span>
                    </div>
                    <p className="lp-pricing-description">{plan.description}</p>
                  </div>
                  
                  <div className="lp-pricing-features">
                    <ul>
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <span className="lp-checkmark">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    className={`lp-btn ${plan.popular ? 'lp-btn-primary' : 'lp-btn-outline'} lp-pricing-button`}
                    onClick={() => {
                      toggleModal('pricing');
                      handleSignUpClick();
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="lp-pricing-note">
              <p>All plans include 14-day free trial • No credit card required • Cancel anytime</p>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="lp-modal-overlay" onClick={() => setShowDemoModal(false)}>
          <div className="lp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => setShowDemoModal(false)}>
              &times;
            </button>
            <div className="lp-modal-body" style={{ padding: '1rem 0' }}>
              <div className="lp-video-wrapper">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/csgq76kIHT0"
                  title="WRSMAT Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="lp-modal-overlay" onClick={() => toggleModal('terms')}>
          <div className="lp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => toggleModal('terms')}>
              &times;
            </button>
            <h2>Terms & Conditions</h2>
            <div className="lp-modal-body">
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using WRSMAT, you accept and agree to be bound by the terms and provision of this agreement.</p>

              <h3>2. Service Description</h3>
              <p>WRSMAT provides social media automation tools including post scheduling, analytics, and management features.</p>

              <h3>3. User Responsibilities</h3>
              <p>Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.</p>

              <h3>4. Privacy and Data</h3>
              <p>We collect and use information in accordance with our Privacy Policy. User data is protected and not shared with third parties without consent.</p>

              <h3>5. Limitation of Liability</h3>
              <p>WRSMAT shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

              <h3>6. Contact Information</h3>
              <p>For questions about these Terms, please contact us at legal@wrsmat.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="lp-modal-overlay" onClick={() => toggleModal('privacy')}>
          <div className="lp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => toggleModal('privacy')}>
              &times;
            </button>
            <h2>Privacy Policy</h2>
            <div className="lp-modal-body">
              <h3>Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>

              <h3>How We Use Your Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

              <h3>Information Sharing</h3>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>

              <h3>Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

              <h3>Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information. Contact us at privacy@wrsmat.com for assistance.</p>

              <h3>Contact Us</h3>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@wrsmat.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;