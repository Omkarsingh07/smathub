import React, { useState, useEffect } from 'react';
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
  Plus,
  BarChart3,
  Users,
  Bell,
  Search,
  Play,
  Share2,
  Camera,
  Video,
  Edit3,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
  }, []);

  const socialPlatforms = [
    {
      platform: 'Instagram',
      icon: Instagram,
      followers: '12.4K',
      growth: '+12%',
      posts: 156,
      engagement: '4.2%',
      color: 'instagram',
      connected: true,
      lastPost: '2 hours ago',
      avgReach: '2.1K',
      description: 'Photo & Story sharing'
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      followers: '9.2K',
      growth: '+8%',
      posts: 89,
      engagement: '3.8%',
      color: 'facebook',
      connected: true,
      lastPost: '4 hours ago',
      avgReach: '1.8K',
      description: 'Social networking & Pages'
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      followers: '21.5K',
      growth: '+15%',
      posts: 42,
      engagement: '6.1%',
      color: 'youtube',
      connected: true,
      lastPost: '1 day ago',
      avgReach: '3.4K',
      description: 'Video content creation'
    }
  ];

  const quickActions = [
    {
      title: 'Create Instagram Post',
      description: 'Share photos and stories',
      icon: Camera,
      color: 'instagram',
      link: '/create-post/instagram'
    },
    {
      title: 'Facebook Campaign',
      description: 'Create engaging posts',
      icon: Share2,
      color: 'facebook',
      link: '/create-post/facebook'
    },
    {
      title: 'YouTube Upload',
      description: 'Upload and manage videos',
      icon: Video,
      color: 'youtube',
      link: '/create-post/youtube'
    },
    {
      title: 'Content Calendar',
      description: 'Schedule across platforms',
      icon: CalendarClock,
      color: 'purple',
      link: '/content-calendar'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View performance metrics',
      icon: BarChart3,
      color: 'blue',
      link: '/analytics'
    },
    {
      title: 'AI Content Assistant',
      description: 'Get content suggestions',
      icon: MessageCircle,
      color: 'green',
      link: '/ai-assistant'
    }
  ];

  const recentActivity = [
    { 
      action: 'Instagram Story posted', 
      platform: 'Instagram', 
      time: '2 hours ago', 
      status: 'success',
      engagement: '324 views'
    },
    { 
      action: 'Facebook post published', 
      platform: 'Facebook', 
      time: '4 hours ago', 
      status: 'success',
      engagement: '89 likes, 12 comments'
    },
    { 
      action: 'YouTube video uploaded', 
      platform: 'YouTube', 
      time: '1 day ago', 
      status: 'processing',
      engagement: 'Processing...'
    },
    { 
      action: 'Instagram Reel scheduled', 
      platform: 'Instagram', 
      time: '2 days ago', 
      status: 'scheduled',
      engagement: 'Scheduled for tomorrow'
    }
  ];

  const platformMetrics = {
    totalFollowers: socialPlatforms.reduce((sum, platform) => {
      const followers = parseFloat(platform.followers.replace('K', '')) * 1000;
      return sum + followers;
    }, 0),
    totalPosts: socialPlatforms.reduce((sum, platform) => sum + platform.posts, 0),
    avgEngagement: (socialPlatforms.reduce((sum, platform) => 
      sum + parseFloat(platform.engagement.replace('%', '')), 0) / socialPlatforms.length).toFixed(1)
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginMethod');
    navigate('/auth');
  };

  const connectPlatform = (platform) => {
    // Handle platform connection logic
    console.log(`Connecting to ${platform}`);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <img
              src="/assets/brandlogo.svg"
              alt="SMATHUB"
              className="brand-logo"
            />
            <div className="header-info">
              <h1>Social Media Dashboard</h1>
              <p>Manage Instagram, Facebook & YouTube</p>
            </div>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              <button className="action-btn">
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <button className="action-btn">
                <Search size={20} />
              </button>
            </div>
            
            <div className="user-profile">
              <img
                src={currentUser?.avatar || "https://i.pravatar.cc/40"}
                alt="User Avatar"
                className="avatar"
              />
              <div className="user-info">
                <span className="username">{currentUser?.name || currentUser?.companyName || 'Demo User'}</span>
                <span className="user-role">Content Creator</span>
              </div>
              <div className="profile-dropdown">
                <button className="dropdown-btn">
                  <ChevronDown size={16} />
                </button>
                <div className="dropdown-menu">
                  <Link to="/settings" className="dropdown-item">
                    <Settings size={16} />
                    Settings
                  </Link>
                  <Link to="/manage-subscription" className="dropdown-item">
                    <CreditCard size={16} />
                    Billing
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          
          {/* Platform Overview */}
          <section className="overview-section">
            <div className="section-header">
            </div>
            
            <div className="platform-cards">
              {socialPlatforms.map((platform) => (
                <div key={platform.platform} className={`platform-card ${platform.color}`}>
                  <div className="card-header">
                    <div className="platform-info">
                      <div className="platform-icon-wrapper">
                        <platform.icon size={24} />
                      </div>
                      <div>
                        <h3>{platform.platform}</h3>
                        <span className="platform-description">{platform.description}</span>
                      </div>
                    </div>
                    <div className="connection-status connected">
                      <div className="status-dot"></div>
                      Connected
                    </div>
                  </div>
                  
                  <div className="card-stats">
                    <div className="stat-group">
                      <div className="stat-item">
                        <div className="stat-value">{platform.followers}</div>
                        <div className="stat-label">Followers</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{platform.posts}</div>
                        <div className="stat-label">Posts</div>
                      </div>
                    </div>
                    <div className="stat-group">
                      <div className="stat-item">
                        <div className="stat-value">{platform.engagement}</div>
                        <div className="stat-label">Engagement</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{platform.avgReach}</div>
                        <div className="stat-label">Avg. Reach</div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="last-activity">
                      <Clock size={14} />
                      <span>Last post: {platform.lastPost}</span>
                    </div>
                    <div className="growth-indicator">
                      <TrendingUp size={14} />
                      <span>{platform.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
              <p className="section-subtitle">Create and manage content across platforms</p>
            </div>
            
            <div className="action-grid">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link} className={`action-card ${action.color}`}>
                  <div className="action-icon">
                    <action.icon size={20} />
                  </div>
                  <div className="action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                  <div className="action-arrow">
                    <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Overall Performance */}
          <section className="analytics-section">
            <div className="section-header">
              <h2>Overall Performance</h2>
              <button className="btn-outline">
                <BarChart3 size={16} />
                Detailed Analytics
              </button>
            </div>
            
            <div className="analytics-cards">
              <div className="analytics-card">
                <div className="analytics-icon total-followers">
                  <Users size={20} />
                </div>
                <div className="analytics-content">
                  <div className="analytics-value">{(platformMetrics.totalFollowers / 1000).toFixed(1)}K</div>
                  <div className="analytics-label">Total Followers</div>
                  <div className="analytics-change positive">Across all platforms</div>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon total-posts">
                  <Edit3 size={20} />
                </div>
                <div className="analytics-content">
                  <div className="analytics-value">{platformMetrics.totalPosts}</div>
                  <div className="analytics-label">Total Posts</div>
                  <div className="analytics-change positive">Published content</div>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon avg-engagement">
                  <Heart size={20} />
                </div>
                <div className="analytics-content">
                  <div className="analytics-value">{platformMetrics.avgEngagement}%</div>
                  <div className="analytics-label">Avg. Engagement</div>
                  <div className="analytics-change positive">Cross-platform</div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="activity-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
              <button className="btn-text">View All Activities</button>
            </div>
            
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-status ${activity.status}`}></div>
                  <div className="activity-content">
                    <div className="activity-main">
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-engagement">{activity.engagement}</div>
                    </div>
                    <div className="activity-details">
                      <span className={`activity-platform ${activity.platform.toLowerCase()}`}>
                        {activity.platform === 'Instagram' && <Instagram size={12} />}
                        {activity.platform === 'Facebook' && <Facebook size={12} />}
                        {activity.platform === 'YouTube' && <Youtube size={12} />}
                        {activity.platform}
                      </span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                  <div className="activity-actions">
                    <button className="activity-btn">View</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;