import React, { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
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
  const { user } = useUser();
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
    navigate('/landing.');
  };

  const connectPlatform = (platform) => {
    // Handle platform connection logic
    console.log(`Connecting to ${platform}`);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-container">
          <div className="dashboard-nav">
            <h1>WRSMAT Dashboard</h1>
            <div className="dashboard-user">
              <span>Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</span>
              
              {/* Option 1: Clerk's UserButton with redirect to landing page */}
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-10 h-10',
                    userButtonPopoverCard: 'shadow-lg border border-gray-200',
                    userButtonPopoverActions: 'space-y-2',
                    userButtonPopoverActionButton: 'text-sm hover:bg-gray-50'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h2>Your Social Media Hub</h2>
            <p>Start managing your social media accounts from here.</p>
            
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>Connected Accounts</h3>
                <p>Manage your social media connections</p>
                <button className="dashboard-card-btn">Connect Account</button>
              </div>
              
              <div className="dashboard-card">
                <h3>Scheduled Posts</h3>
                <p>View and manage your scheduled content</p>
                <button className="dashboard-card-btn">Schedule Post</button>
              </div>
              
              <div className="dashboard-card">
                <h3>Analytics</h3>
                <p>Track your social media performance</p>
                <button className="dashboard-card-btn">View Analytics</button>
              </div>
              
              <div className="dashboard-card">
                <h3>AI Assistant</h3>
                <p>Get help with content creation</p>
                <button className="dashboard-card-btn">Try AI Assistant</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;