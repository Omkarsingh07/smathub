import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Facebook.css';

const Facebook = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 28 days');
  const [selectedAudience, setSelectedAudience] = useState('All Followers');
  const [selectedOnlineTimeframe, setSelectedOnlineTimeframe] = useState('Last 7 Days');
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'overview', icon: 'fas fa-chart-line', label: 'Overview' },
    { id: 'posts', icon: 'fas fa-newspaper', label: 'Posts' },
    { id: 'audience', icon: 'fas fa-users', label: 'Audience' },
    { id: 'ads', icon: 'fas fa-ad', label: 'Ads' },
    { id: 'videos', icon: 'fas fa-video', label: 'Videos' },
    { id: 'shops', icon: 'fas fa-store', label: 'Page Shops' }
  ];

  const metricCards = [
    {
      title: 'Page Likes',
      icon: 'fas fa-thumbs-up',
      value: '24,850',
      change: '5.7% from last week',
      changeType: 'positive'
    },
    {
      title: 'Total Reach',
      icon: 'fas fa-eye',
      value: '145,600',
      change: '8.3% from last week',
      changeType: 'positive'
    },
    {
      title: 'Engagement',
      icon: 'fas fa-hand-holding-heart',
      value: '32,450',
      change: '12.1% improvement',
      changeType: 'positive'
    },
    {
      title: 'New Posts',
      icon: 'fas fa-newspaper',
      value: '18',
      change: 'Same as last week',
      changeType: 'neutral'
    }
  ];

  const engagementMetrics = [
    {
      title: 'Page Views',
      tooltip: 'Total number of times your Page\'s profile has been viewed',
      value: '56,230',
      change: '15% from last period',
      changeType: 'positive',
      chartHeight: '82%'
    },
    {
      title: 'Post Reach',
      tooltip: 'Number of people who saw any of your Page\'s posts',
      value: '89,340',
      change: '7% from last period',
      changeType: 'positive',
      chartHeight: '75%'
    },
    {
      title: 'Story Reach',
      tooltip: 'Number of people who saw your Page\'s stories',
      value: '32,150',
      change: '3% from last period',
      changeType: 'negative',
      chartHeight: '65%'
    },
    {
      title: 'Post Engagements',
      tooltip: 'Total number of actions people took involving your posts',
      value: '24,560',
      change: '12% from last period',
      changeType: 'positive',
      chartHeight: '72%'
    },
    {
      title: 'Reactions',
      tooltip: 'Total number of reactions (like, love, wow, etc.) on your posts',
      value: '18,230',
      change: '8% from last period',
      changeType: 'positive',
      chartHeight: '68%'
    },
    {
      title: 'Comments',
      tooltip: 'Number of comments your posts received',
      value: '3,450',
      change: '5% from last period',
      changeType: 'positive',
      chartHeight: '55%'
    },
    {
      title: 'Video Views',
      tooltip: 'Total number of times your videos were viewed for 3 seconds or more',
      value: '156,780',
      change: '32% from last period',
      changeType: 'positive',
      chartHeight: '88%'
    },
    {
      title: 'Video Engagement',
      tooltip: 'Number of actions taken on your videos (reactions, shares, comments)',
      value: '12,430',
      change: '18% from last period',
      changeType: 'positive',
      chartHeight: '74%'
    },
    {
      title: 'Engagement Rate',
      tooltip: '(Reactions + Comments + Shares) / Reach',
      value: '6.4%',
      change: '1.2% improvement',
      changeType: 'positive',
      chartHeight: '64%',
      highlight: true,
      benchmark: 'Industry benchmark: 5.2%'
    }
  ];

  const topPosts = [
    {
      title: 'Product Launch Announcement',
      date: 'Posted 5 days ago',
      likes: '2.4k',
      comments: '430',
      shares: '120',
      engagementRate: '8.5%',
      rateWidth: '85%',
      type: 'Photo Post',
      typeIcon: 'fas fa-image',
      bgColor: '#f5f5f5'
    },
    {
      title: 'Customer Success Story',
      date: 'Posted 1 week ago',
      likes: '1.8k',
      comments: '290',
      shares: '90',
      engagementRate: '7.2%',
      rateWidth: '72%',
      type: 'Video Post',
      typeIcon: 'fas fa-video',
      bgColor: '#e9e9e9'
    },
    {
      title: 'Industry News Update',
      date: 'Posted 2 weeks ago',
      likes: '1.5k',
      comments: '220',
      shares: '80',
      engagementRate: '6.8%',
      rateWidth: '68%',
      type: 'Link Post',
      typeIcon: 'fas fa-link',
      bgColor: '#dedede'
    }
  ];

  const locations = [
    { flag: '🇺🇸', name: 'United States', percent: '35%', width: '35%' },
    { flag: '🇮🇳', name: 'India', percent: '25%', width: '25%' },
    { flag: '🇬🇧', name: 'United Kingdom', percent: '15%', width: '15%' }
  ];

  const ageGroups = [
    { range: '18-24', width: '30%' },
    { range: '25-34', width: '45%' },
    { range: '35-44', width: '15%' },
    { range: '45+', width: '10%' }
  ];

  return (
    <div className="fb-dashboard-container">
      {/* Header */}
      <header className="fb-header">
        <div className="fb-header-content">
          <div className="fb-header-left">
            <i className="fb-fab fa-facebook header-logo"></i>
            <h1 className="fb-header-title">Facebook Analytics</h1>
            <button className="fb-home-button" onClick={() => navigate('/dashboard')}>
              <i className="fb-fas fa-home"></i>
              <span>Home</span>
            </button>
          </div>
          
          <div className="fb-header-right">
            <div className="fb-date-range-container">
              <div className="fb-date-input-wrapper">
                <i className="fb-far fa-calendar-alt"></i>
                <input type="date" className="fb-date-input" />
              </div>
              <span className="fb-date-separator">to</span>
              <div className="fb-date-input-wrapper">
                <i className="fb-far fa-calendar-alt"></i>
                <input type="date" className="fb-date-input" />
              </div>
              <button className="fb-apply-button">
                <i className="fb-fas fa-check"></i> Apply
              </button>
            </div>
            
            <button className="fb-export-button">
              <i className="fb-fas fa-file-export"></i> Export Report
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="fb-nav-tabs">
          <ul className="fb-tabs-list">
            {tabs
              .filter(tab => tab.id !== 'videos') // Remove the Videos tab
              .map((tab) => (
                <li key={tab.id} className="fb-tab-item">
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.id);
                    }}
                    className={`tab-link ${activeTab === tab.id ? 'tab-active' : ''}`}
                  >
                    <i className={tab.icon}></i> {tab.label}
                  </a>
                  {activeTab === tab.id && <div className="fb-tab-indicator"></div>}
                </li>
              ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="fb-main-content">
        {/* Overview Tab: Show summary cards and page performance */}
        {activeTab === 'overview' && (
          <>
            {/* Summary Cards */}
            <section className="fb-summary-cards">
              {metricCards.map((card, index) => (
                <div key={index} className="fb-metric-card">
                  <div className="fb-metric-header">
                    <h3 className="fb-metric-title">{card.title}</h3>
                    <i className={`${card.icon} metric-icon`}></i>
                  </div>
                  <div className="fb-metric-value">{card.value}</div>
                  <div className={`fb-metric-change ${card.changeType}`}>
                    <i className={`fb-fas fa-arrow-${card.changeType === 'positive' ? 'up' : 
                                                card.changeType === 'negative' ? 'down' : 'minus'}`}></i>
                    {card.change}
                  </div>
                </div>
              ))}
            </section>

            {/* Page Performance Section */}
            <section className="fb-page-performance">
              <div className="fb-section-header">
                <h2 className="fb-section-title">
                  <i className="fb-fas fa-chart-line section-icon"></i>
                  Page Performance
                </h2>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="fb-timeframe-select"
                >
                  <option>Last 7 days</option>
                  <option>Last 15 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This Quarter</option>
                </select>
              </div>
              
              <div className="fb-engagement-metrics">
                {engagementMetrics.map((metric, index) => (
                  <div key={index} className={`fb-engagement-card ${metric.highlight ? 'highlighted' : ''}`}>
                    <div className="fb-engagement-content">
                      <div className="fb-engagement-info">
                        <h4 className="fb-engagement-title">
                          {metric.title}
                          <i className="fb-fas fa-info-circle tooltip-icon" title={metric.tooltip}></i>
                        </h4>
                        <div className="fb-engagement-value">{metric.value}</div>
                        <div className={`fb-engagement-change ${metric.changeType}`}>
                          <i className={`fb-fas fa-arrow-${metric.changeType === 'positive' ? 'up' : 
                                                      metric.changeType === 'negative' ? 'down' : 'minus'}`}></i>
                          {metric.change}
                        </div>
                      </div>
                      <div className="fb-chart-container">
                        <div className="fb-chart-bar" style={{ height: metric.chartHeight }}></div>
                      </div>
                    </div>
                    {metric.benchmark && (
                      <div className="fb-benchmark">
                        <i className="fb-fas fa-bullseye benchmark-icon"></i>
                        {metric.benchmark}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Posts Tab: Show Top Performing Posts */}
        {activeTab === 'posts' && (
          <section className="fb-top-posts">
            <div className="fb-section-header">
              <h2 className="fb-section-title">
                <i className="fb-fas fa-newspaper section-icon"></i>
                Top Performing Posts
              </h2>
              <button className="fb-view-all-button">View All Posts</button>
            </div>
            
            <div className="fb-posts-grid">
              {topPosts.map((post, index) => (
                <div key={index} className="fb-post-card">
                  <div className="fb-post-image" style={{ backgroundColor: post.bgColor }}>
                    <div className="fb-post-stats">
                      <span className="fb-stat-item">
                        <i className="fb-fas fa-thumbs-up"></i> {post.likes}
                      </span>
                      <span className="fb-stat-item">
                        <i className="fb-fas fa-comment"></i> {post.comments}
                      </span>
                      <span className="fb-stat-item">
                        <i className="fb-fas fa-share"></i> {post.shares}
                      </span>
                    </div>
                  </div>
                  <div className="fb-post-content">
                    <h4 className="fb-post-title">{post.title}</h4>
                    <p className="fb-post-date">{post.date}</p>
                    <div className="fb-engagement-bar-container">
                      <div className="fb-engagement-bar" style={{ width: post.rateWidth }}></div>
                      <span className="fb-engagement-text">{post.engagementRate} engagement</span>
                    </div>
                    <div className="fb-post-type">
                      <i className={post.typeIcon}></i> {post.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Audience Tab: Show Audience Insights */}
        {activeTab === 'audience' && (
          <section className="fb-audience-insights">
            <div className="fb-section-header">
              <h2 className="fb-section-title">
                <i className="fb-fas fa-users section-icon"></i>
                Audience Insights
              </h2>
              <select 
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="fb-audience-select"
              >
                <option>All Followers</option>
                <option>Engaged Users</option>
                <option>New Followers</option>
                <option>Video Viewers</option>
              </select>
            </div>
            
            <div className="fb-insights-grid">
              {/* Gender Distribution */}
              <div className="fb-insight-card">
                <h4 className="fb-insight-title">
                  <i className="fb-fas fa-venus-mars"></i> Gender Distribution
                </h4>
                <div className="fb-gender-chart">
                  <div className="fb-gender-male">👨 45% Male</div>
                  <div className="fb-gender-female">👩 55% Female</div>
                </div>
              </div>
              
              {/* Top Locations */}
              <div className="fb-insight-card">
                <h4 className="fb-insight-title">
                  <i className="fb-fas fa-globe"></i> Top Locations
                </h4>
                <ul className="fb-locations-list">
                  {locations.map((location, index) => (
                    <li key={index} className="fb-location-item">
                      <div className="fb-location-info">
                        <span className="fb-location-flag">{location.flag}</span>
                        <span className="fb-location-name">{location.name}</span>
                        <span className="fb-location-percent">{location.percent}</span>
                      </div>
                      <div className="fb-location-bar" style={{ width: location.width }}></div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Age Distribution */}
              <div className="fb-insight-card">
                <h4 className="fb-insight-title">
                  <i className="fb-fas fa-birthday-cake"></i> Age Distribution
                </h4>
                <div className="fb-age-groups">
                  {ageGroups.map((group, index) => (
                    <div key={index} className="fb-age-group">
                      <span className="fb-age-range">{group.range}</span>
                      <div className="fb-age-bar" style={{ width: group.width }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Facebook;