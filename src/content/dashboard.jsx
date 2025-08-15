import React, { useState } from 'react';
import './dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Settings, 
  ChevronDown,
  Heart,
  ThumbsUp,
  Eye,
  TrendingUp,
  LogOut,
  CalendarClock,
  LineChart,
  Handshake,
  MessageCircle,
  CreditCard,
  Cog
} from 'lucide-react';

const Dashboard = () => {

  const socialStats = [
    {
      platform: 'Instagram',
      icon: Instagram,
      followers: '12.4K',
      label: 'Total Followers',
      className: 'instagram',
      link: '/instagram'
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      followers: '9.2K',
      label: 'Total Followers',
      className: 'facebook',
      link: '/facebook'
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      followers: '21.5K',
      label: 'Total Subscribers',
      className: 'youtube',
      link: '/youtube'
    },
    {
      platform: 'Smart Scheduling',
      icon: CalendarClock,
      followers: '',
      label: 'Optimal Post Times',
      className: 'smart-scheduling',
      link: '/smart-scheduling'
    },
    {
      platform: 'Trend Discovery',
      icon: LineChart,
      followers: '',
      label: 'Trending Topics',
      className: 'trend-discovery',
      link: '/trend-discovery'
    },
    {
      platform: 'Brand Collaboration',
      icon: Handshake,
      followers: '',
      label: 'Collab Opportunities',
      className: 'brand-collaboration',
      link: '/brand-collaboration'
    },
    {
      platform: 'AI Chatbot',
      icon: MessageCircle,
      followers: '',
      label: 'AI Assistant',
      className: 'ai-chatbot',
      link: '/ai-chatbot'
    },
    {
      platform: 'Manage Subscription',
      icon: CreditCard,
      followers: '',
      label: 'Billing & Plans',
      className: 'manage-subscription',
      link: '/manage-subscription'
    },
    {
      platform: 'Settings',
      icon: Cog,
      followers: '',
      label: 'Account Settings',
      className: 'settings',
      link: '/settings'
    }
  ];

  // Using useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  const handlePlatformClick = (link) => {
    navigate(link); // Navigates to internal page
  };

  return (
    <div className="homePage-dashboard-container">
      {/* Header */}
      <header className="homePage-header">
        <div className="homePage-header-content">
          <div className="homePage-header-title">
            {/* Replace text logo with image logo */}
            <img
              src="/assets/brandsmat.png"
              alt="SMATHUB Logo"
              className="brand-logo"
              style={{ height: '40px', marginRight: '1rem' }}
            />
            <div className='Dashboardoverview'>Dashboard Overview</div>
          </div>
          <div className="user-profile">
            <div className="profile-info">
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="avatar"
              />
              <div className="user-details">
                <span className="username">Demo</span>
                <p className="user-role">Admin</p>
              </div>
              {/* Settings and Logout icons */}

              <button
                className="profile-action-btn"
                title="Logout"
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '6px' }}
                onClick={() => {
                  // Add your logout logic here
                  // For example: clear auth, redirect to login
                  navigate('/auth'); // Redirect to authentication page
                }}
              >
                <LogOut size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="homePage-main-content">
        {/* Main Dashboard Content */}
        <main className="homePage-dashboard-main">
          {/* Overview Cards */}
          <section className="homepage-overview-section">
            <div className="stats-grid">
              {socialStats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <Link
                    key={stat.platform}
                    to={stat.link}
                    className={`stat-card ${stat.className}`}
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    <div className="homePage-card-header">
                      <div className="homePage-card-title">
                        <div className="icon-wrapper">
                          <stat.icon className="platform-icon" />
                        </div>
                        <span className="homePage-platform-name">{stat.platform}</span>
                      </div>
                      <TrendingUp className="trending-icon" />
                    </div>
                    
                    <div className="card-stats">
                      <h2 className="follower-count">{stat.followers}</h2>
                      <p className="follower-label">{stat.label}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;