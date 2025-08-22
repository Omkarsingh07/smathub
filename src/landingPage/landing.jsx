import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaRobot, FaDollarSign } from 'react-icons/fa';

import './landing.css';

const LandingPage = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => navigate('/auth');
  const handleLoginClick = () => navigate('/auth');

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
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Schedule posts across multiple platforms with AI-powered optimal timing recommendations to maximize engagement and reach.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Get detailed insights into your social media performance with comprehensive reports and actionable recommendations.'
    },
    {
      icon: '👥',
      title: 'Brand Collaboration',
      description: 'Work with your team or clients in one space. Share drafts, get approvals, assign roles, and leave feedback—all inside the tool.'
    },
    {
      icon: '📈',
      title: 'Trend Discovery',
      description: "Identify what's trending across platforms. Leverage AI to suggest viral hashtags, content formats, and top-performing topics in your niche."
    },
    {
      icon: '🤖',
      title: 'AI Chatbot Assistant',
      description: 'Get instant help with content creation, strategy suggestions, and platform-specific advice from our intelligent AI assistant available 24/7.',
      action: {
        text: 'Try AI Assistant',
        onClick: () => {
          // You can add navigation to chatbot or open a chat widget
          alert('AI Chatbot feature coming soon!');
        }
      }
    },
    {
      icon: '💰',
      title: 'Flexible Pricing',
      description: 'Choose from our affordable plans designed for individuals, small businesses, and enterprises. Start free and scale as you grow.',
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
        '10 scheduled posts per month',
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
        'Up to 10 social accounts',
        'Unlimited scheduled posts',
        'Advanced analytics',
        'Priority support',
        'Full AI assistant access',
        'Team collaboration',
        'Custom branding'
      ],
      buttonText: 'Start Pro Trial',
      popular: true
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, name: 'Twitter', url: 'https://x.com/wrsmat' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/smat-ai/' },
    { icon: <FaFacebook />, name: 'Facebook', url: '#' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://www.instagram.com/wr.smat/' }
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

  return (
    <div className="lp-landing-page">
      {/* Header */}
      <header className={isScrolled ? 'lp-scrolled' : ''}>
        <div className="lp-container">
          <nav className="lp-navbar">
            <div className="lp-logo">
              <img src="/assets/brandlogo.svg" alt="Smathub Logo" />
            </div>
            <div className="lp-nav-links">
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#" onClick={() => setShowPricingModal(true)}>Pricing</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="lp-auth-buttons">
              <button className="lp-btn lp-btn-outline" onClick={handleLoginClick}>Sign In</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-container">
          <div className="lp-hero-content">
            <h1>Automate Your Social Media Success</h1>
            <p className="lp-subtitle">
              Powerful tools to grow your audience while saving you hours every week
            </p>
            <div className="lp-cta-buttons">
              <button className="lp-btn lp-btn-primary" onClick={handleSignUpClick}>
                Get Started Free
              </button>
              <button className="lp-btn lp-btn-outline" onClick={() => setShowDemoModal(true)}>
                Watch Demo
              </button>
            </div>

            <p className="lp-trust-note">
              
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lp-features-section">
        <div className="lp-container">
          <h2>Why Choose Smathub?</h2>
          <p className="lp-section-description">
            Smathub is the ultimate social media automation platform designed to streamline your digital marketing efforts.
          </p>

          <div className="lp-features-grid">
            {features.map((feature, index) => (
              <div key={index} id={`feature-${index}`} className="lp-feature-card">
                <div className="lp-feature-icon-container">
                  <span className="lp-feature-icon">{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                {feature.action && (
                  <button 
                    className="lp-btn lp-btn-outline lp-btn-sm"
                    onClick={feature.action.onClick}
                    style={{ marginTop: '1rem' }}
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
            <h2>Revolutionizing Social Media Management</h2>
            <p>
              Our intelligent tools help businesses and content creators save time while maximizing their social media impact.
              From small startups to enterprise organizations, our platform scales with your needs while providing the insights
              and tools necessary to drive meaningful engagement and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="lp-container">
          <div className="lp-footer-content">
            <div className="lp-footer-section">
              <div className="lp-social-links">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="lp-footer-section">
              <h3>Contact</h3>
              <p>📧 smathubai@gmail.com</p>
              <p>📞 (91- 222033423)</p>
              <p>📍Mumbai, Maharashtra</p>
            </div>

            <div className="lp-footer-section">
              <h3>Quick Links</h3>
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#" onClick={() => toggleModal('pricing')}>Pricing</a>
              <a href="#" onClick={() => toggleModal('privacy')}>Privacy Policy</a>
              <a href="#" onClick={() => toggleModal('terms')}>Terms</a>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <p>&copy; {new Date().getFullYear()} Smathub. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
              <p>By accessing and using SocialFlow, you accept and agree to be bound by the terms and provision of this agreement.</p>

              <h3>2. Service Description</h3>
              <p>SmatHub provides social media automation tools including post scheduling, analytics, and management features.</p>

              <h3>3. User Responsibilities</h3>
              <p>Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.</p>

              <h3>4. Privacy and Data</h3>
              <p>We collect and use information in accordance with our Privacy Policy. User data is protected and not shared with third parties without consent.</p>

              <h3>5. Limitation of Liability</h3>
              <p>SmatHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

              <h3>6. Contact Information</h3>
              <p>For questions about these Terms, please contact us at legal@smathub.com</p>
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
                  src="https://www.youtube.com/watch?v=csgq76kIHT0"
                  title="Smathub Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
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
              <p>You have the right to access, update, or delete your personal information. Contact us at privacy@smathub.com for assistance.</p>

              <h3>Contact Us</h3>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@smathub.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;