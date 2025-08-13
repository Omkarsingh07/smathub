import React, { useState } from 'react';
import './youtube.css';
import { useNavigate } from 'react-router-dom';

const Youtube = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 28 days');
  const [selectedSegment, setSelectedSegment] = useState('All Viewers');
  const [selectedTrafficTimeframe, setSelectedTrafficTimeframe] = useState('Last 28 days');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
    { id: 'videos', label: 'Videos', icon: 'fas fa-video' },
    { id: 'audience', label: 'Audience', icon: 'fas fa-users' },
    { id: 'traffic', label: 'Traffic Sources', icon: 'fas fa-search' },
    { id: 'revenue', label: 'Revenue', icon: 'fas fa-dollar-sign' },
    { id: 'comments', label: 'Comments', icon: 'fas fa-comments' }
  ];

  const MetricCard = ({ title, value, change, changeType, icon, className = '' }) => (
    <div className={`yt-metric-card ${className}`}>
      <div className="yt-metric-header">
        <h3>{title}</h3>
        <i className={icon}></i>
      </div>
      <div className="yt-metric-value">{value}</div>
      <div className={`yt-metric-change ${changeType}`}>
        <i className={`yt-fas fa-arrow-${changeType === 'positive' ? 'up' : changeType === 'negative' ? 'down' : 'minus'}`}></i>
        {change}
      </div>
    </div>
  );

  const EngagementCard = ({ title, value, change, changeType, height, tooltip, highlight = false, benchmark }) => (
    <div className={`yt-engagement-card ${highlight ? 'highlight' : ''}`}>
      <div className="yt-engagement-metric">
        <div className="yt-metric-info">
          <h4>
            {title}
            <i className="yt-fas fa-info-circle tooltip" title={tooltip}></i>
          </h4>
          <div className="yt-metric-value">{value}</div>
          <div className={`yt-metric-change ${changeType}`}>
            <i className={`yt-fas fa-arrow-${changeType === 'positive' ? 'up' : changeType === 'negative' ? 'down' : 'minus'}`}></i>
            {change}
          </div>
        </div>
        <div className="yt-metric-chart">
          <div className="yt-chart-placeholder" style={{ height: `${height}%` }}></div>
        </div>
      </div>
      {benchmark && (
        <div className="yt-benchmark-indicator">
          <i className="yt-fas fa-bullseye"></i> {benchmark}
        </div>
      )}
    </div>
  );

  const ContentCard = ({ title, posted, duration, views, likes, comments, engagement, retention, bgImage }) => (
    <div className="yt-content-card">
      <div 
        className="yt-content-preview" 
        style={{ 
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${bgImage}')`,
          backgroundSize: 'cover'
        }}
      >
        <div className="yt-content-stats">
          <span><i className="yt-fas fa-eye"></i> {views}</span>
          <span><i className="yt-fas fa-thumbs-up"></i> {likes}</span>
          <span><i className="yt-fas fa-comment"></i> {comments}</span>
        </div>
      </div>
      <div className="yt-content-info">
        <h4>{title}</h4>
        <p>{posted} • {duration} duration</p>
        <div className="yt-engagement-rate">
          <div className="yt-rate-bar" style={{ width: `${parseFloat(engagement)}*10%` }}></div>
          <span>{engagement} engagement</span>
        </div>
        <div className="yt-watch-time-distribution">
          {retention.map((block, index) => (
            <div key={index} className={`yt-watch-time-block ${block.type}`}>
              <span>{block.time}</span>
              <span>{block.retention}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="yt-dashboard-container">
      {/* Header with Navigation */}
      <header className="yt-dashboard-header">
        <div className="yt-header-content">
          <div className="yt-branding">
            <i className="yt-fab fa-youtube logo-icon"></i>
            <h1 className="yt-dashboard-title">YouTube Analytics</h1>
            <button className="yt-home-button" onClick={() => navigate('/dashboard')}>
              <i className="yt-fas fa-home"></i>
              <span>Home</span>
            </button>
          </div>
          
          <div className="yt-header-actions">
            <div className="yt-date-range-picker">
              <div className="yt-date-input-group">
                <i className="yt-far fa-calendar-alt"></i>
                <input type="date" className="yt-date-input" />
              </div>
              <span className="yt-date-separator">to</span>
              <div className="yt-date-input-group">
                <i className="yt-far fa-calendar-alt"></i>
                <input type="date" className="yt-date-input" />
              </div>
              <button className="yt-apply-btn">
                <i className="yt-fas fa-check"></i> Apply
              </button>
            </div>
            
            <button className="yt-export-btn">
              <i className="yt-fas fa-file-export"></i> Export Report
            </button>
          </div>
        </div>
        
        <nav className="yt-dashboard-tabs">
          <ul>
            {tabs.map(tab => (
              <li 
                key={tab.id} 
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                <a href="#">
                  <i className={tab.icon}></i> {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Dashboard Content */}
      <main className="yt-dashboard-content">
        {/* Overview Tab: Show metrics summary and channel performance */}
        {activeTab === 'overview' && (
          <>
            {/* Summary Cards */}
            <section className="yt-metrics-summary">
              <MetricCard
                title="Views"
                value="245,780"
                change="12.5% from last week"
                changeType="positive"
                icon="fas fa-eye"
                className="yt-views"
              />
              <MetricCard
                title="Watch Time (hours)"
                value="8,450"
                change="9.2% from last week"
                changeType="positive"
                icon="fas fa-clock"
                className="yt-watch-time"
              />
              <MetricCard
                title="Subscribers"
                value="12,350"
                change="3.7% from last week"
                changeType="positive"
                icon="fas fa-users"
                className="yt-subscribers"
              />
              <MetricCard
                title="Estimated Revenue"
                value="$3,450"
                change="No change"
                changeType="neutral"
                icon="fas fa-dollar-sign"
                className="yt-revenue"
              />
            </section>
            {/* Channel Performance Section */}
            <section className="yt-analytics-section">
              <div className="yt-section-header">
                <h2><i className="yt-fas fa-chart-line"></i> Channel Performance</h2>
                <div className="yt-timeframe-selector">
                </div>
              </div>
              
              <div className="yt-engagement-grid">
                <EngagementCard
                  title="Impressions"
                  value="356,230"
                  change="15% from last period"
                  changeType="positive"
                  height={82}
                  tooltip="How many times your thumbnails were shown to viewers"
                />
                <EngagementCard
                  title="Click-Through Rate"
                  value="6.8%"
                  change="1.2% from last period"
                  changeType="positive"
                  height={68}
                  tooltip="Percentage of impressions that turned into views"
                />
                <EngagementCard
                  title="Average View Duration"
                  value="4:35"
                  change="0:12 from last period"
                  changeType="negative"
                  height={65}
                  tooltip="Average length of time viewers watched your videos"
                />
                <EngagementCard
                  title="Likes"
                  value="24,560"
                  change="12% from last period"
                  changeType="positive"
                  height={72}
                  tooltip="Total number of likes on your videos"
                />
                <EngagementCard
                  title="Comments"
                  value="3,450"
                  change="8% from last period"
                  changeType="positive"
                  height={55}
                  tooltip="Number of comments on your videos"
                />
                <EngagementCard
                  title="Shares"
                  value="5,230"
                  change="18% from last period"
                  changeType="positive"
                  height={65}
                  tooltip="Number of times your videos were shared"
                />
                <EngagementCard
                  title="Ad Revenue"
                  value="$2,450"
                  change="No change"
                  changeType="neutral"
                  height={58}
                  tooltip="Estimated revenue from ads"
                />
                <EngagementCard
                  title="YouTube Premium Revenue"
                  value="$780"
                  change="5% from last period"
                  changeType="positive"
                  height={45}
                  tooltip="Revenue from YouTube Premium subscribers"
                />
                <EngagementCard
                  title="Engagement Rate"
                  value="13.5%"
                  change="2.1% improvement"
                  changeType="positive"
                  height={74}
                  tooltip="(Likes + Comments + Shares) / Views"
                  highlight={true}
                  benchmark="Industry benchmark: 10.2%"
                />
              </div>
            </section>
          </>
        )}

        {/* Videos Tab: Show Top Performing Videos */}
        {activeTab === 'videos' && (
          <section className="yt-analytics-section">
            <div className="yt-section-header">
              <h2><i className="yt-fas fa-video"></i> Top Performing Videos</h2>
              <button className="yt-view-all-btn">View All Videos</button>
            </div>
            
            <div className="yt-content-grid">
              <ContentCard
                title="How to Build a YouTube Dashboard - Tutorial"
                posted="Posted 5 days ago"
                duration="12:34"
                views="124k"
                likes="8.4k"
                comments="430"
                engagement="8.5%"
                retention={[
                  { time: "0:00-2:30", retention: "High Retention (85%)", type: "high-watch" },
                  { time: "2:30-8:00", retention: "Medium Retention (62%)", type: "medium-watch" }
                ]}
                bgImage="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
              />
              <ContentCard
                title="Advanced Analytics Techniques"
                posted="Posted 2 weeks ago"
                duration="18:22"
                views="89k"
                likes="6.2k"
                comments="290"
                engagement="7.2%"
                retention={[
                  { time: "0:00-3:45", retention: "High Retention (82%)", type: "high-watch" },
                  { time: "3:45-12:00", retention: "Medium Retention (58%)", type: "medium-watch" }
                ]}
                bgImage="https://i.ytimg.com/vi/yPYZpwSpKmA/maxresdefault.jpg"
              />
              <ContentCard
                title="Data Visualization Best Practices"
                posted="Posted 3 weeks ago"
                duration="15:45"
                views="76k"
                likes="5.1k"
                comments="220"
                engagement="6.8%"
                retention={[
                  { time: "0:00-2:15", retention: "High Retention (80%)", type: "high-watch" },
                  { time: "2:15-10:30", retention: "Medium Retention (55%)", type: "medium-watch" }
                ]}
                bgImage="https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg"
              />
            </div>
          </section>
        )}

        {/* Audience Tab: Show Audience Insights */}
        {activeTab === 'audience' && (
          <section className="yt-analytics-section">
            <div className="yt-section-header">
              <h2><i className="yt-fas fa-users"></i> Audience Insights</h2>
              <div className="yt-segment-selector">
                <select 
                  value={selectedSegment} 
                  onChange={(e) => setSelectedSegment(e.target.value)}
                >
                  <option>All Viewers</option>
                  <option>Subscribers</option>
                  <option>Non-subscribers</option>
                  <option>Returning Viewers</option>
                </select>
              </div>
            </div>
            
            <div className="yt-audience-grid">
              <div className="yt-audience-card">
                <h4><i className="yt-fas fa-venus-mars"></i> Gender Distribution</h4>
                <div className="yt-gender-chart">
                  <div className="yt-male-segment" style={{ width: '65%' }}>
                    <span>👨 65% Male</span>
                  </div>
                  <div className="yt-female-segment" style={{ width: '35%' }}>
                    <span>👩 35% Female</span>
                  </div>
                </div>
              </div>
              
              <div className="yt-audience-card">
                <h4><i className="yt-fas fa-globe"></i> Top Locations</h4>
                <ul className="yt-location-list">
                  <li>
                    <span className="yt-country-flag">🇺🇸</span>
                    <span className="yt-country-name">United States</span>
                    <span className="yt-country-percent">42%</span>
                    <div className="yt-location-bar" style={{ width: '42%' }}></div>
                  </li>
                  <li>
                    <span className="yt-country-flag">🇮🇳</span>
                    <span className="yt-country-name">India</span>
                    <span className="yt-country-percent">18%</span>
                    <div className="yt-location-bar" style={{ width: '18%' }}></div>
                  </li>
                  <li>
                    <span className="yt-country-flag">🇬🇧</span>
                    <span className="yt-country-name">United Kingdom</span>
                    <span className="yt-country-percent">12%</span>
                    <div className="yt-location-bar" style={{ width: '12%' }}></div>
                  </li>
                </ul>
              </div>
              
              <div className="yt-audience-card">
                <h4><i className="yt-fas fa-birthday-cake"></i> Age Distribution</h4>
                <div className="yt-age-distribution">
                  <div className="yt-age-group">
                    <span>18-24</span>
                    <div className="yt-age-bar" style={{ width: '35%' }}></div>
                  </div>
                  <div className="yt-age-group">
                    <span>25-34</span>
                    <div className="yt-age-bar" style={{ width: '40%' }}></div>
                  </div>
                  <div className="yt-age-group">
                    <span>35-44</span>
                    <div className="yt-age-bar" style={{ width: '15%' }}></div>
                  </div>
                  <div className="yt-age-group">
                    <span>45+</span>
                    <div className="yt-age-bar" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Traffic Tab: Show Traffic Sources */}
        {activeTab === 'traffic' && (
          <section className="yt-analytics-section">
            <div className="yt-section-header">
              <h2><i className="yt-fas fa-search"></i> Traffic Sources</h2>
              <div className="yt-timeframe-selector">
                <select 
                  value={selectedTrafficTimeframe} 
                  onChange={(e) => setSelectedTrafficTimeframe(e.target.value)}
                >
                  <option>Last 7 days</option>
                  <option>Last 15 days</option>
                  <option>Last 30 days</option>
                  <option>Last 60 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            
            <div className="yt-traffic-grid">
              <div className="yt-traffic-card">
                <h4><i className="yt-fas fa-mobile-alt"></i> Device Types</h4>
                <div className="yt-device-distribution">
                  <div className="yt-device-group">
                    <span>Mobile</span>
                    <div className="yt-device-bar" style={{ width: '65%' }}></div>
                    <span>65%</span>
                  </div>
                  <div className="yt-device-group">
                    <span>Desktop</span>
                    <div className="yt-device-bar" style={{ width: '25%' }}></div>
                    <span>25%</span>
                  </div>
                  <div className="yt-device-group">
                    <span>Tablet</span>
                    <div className="yt-device-bar" style={{ width: '8%' }}></div>
                    <span>8%</span>
                  </div>
                  <div className="yt-device-group">
                    <span>TV</span>
                    <div className="yt-device-bar" style={{ width: '2%' }}></div>
                    <span>2%</span>
                  </div>
                </div>
              </div>
              
              <div className="yt-traffic-card">
                <h4><i className="yt-fas fa-external-link-alt"></i> External Sources</h4>
                <ul className="yt-source-list">
                  <li>
                    <span>Google Search</span>
                    <span>32%</span>
                    <div className="yt-source-bar" style={{ width: '32%' }}></div>
                  </li>
                  <li>
                    <span>Social Media</span>
                    <span>25%</span>
                    <div className="yt-source-bar" style={{ width: '25%' }}></div>
                  </li>
                  <li>
                    <span>Direct</span>
                    <span>18%</span>
                    <div className="yt-source-bar" style={{ width: '18%' }}></div>
                  </li>
                  <li>
                    <span>Other Websites</span>
                    <span>15%</span>
                    <div className="yt-source-bar" style={{ width: '15%' }}></div>
                  </li>
                </ul>
              </div>
              
              <div className="yt-traffic-card">
                <h4><i className="yt-fab fa-youtube"></i> YouTube Features</h4>
                <ul className="yt-feature-list">
                  <li>
                    <span>Browse Features</span>
                    <span>40%</span>
                    <div className="yt-feature-bar" style={{ width: '40%' }}></div>
                  </li>
                  <li>
                    <span>Suggested Videos</span>
                    <span>35%</span>
                    <div className="yt-feature-bar" style={{ width: '35%' }}></div>
                  </li>
                  <li>
                    <span>Channel Pages</span>
                    <span>15%</span>
                    <div className="yt-feature-bar" style={{ width: '15%' }}></div>
                  </li>
                  <li>
                    <span>Playlists</span>
                    <span>10%</span>
                    <div className="yt-feature-bar" style={{ width: '10%' }}></div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Youtube;