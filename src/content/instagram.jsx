import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import './instagram.css';

const Instagram = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('Last 30 days');
  const [audienceSegment, setAudienceSegment] = useState('All Followers');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate(); // <-- Add this line

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  const handleApplyDates = () => {
    console.log('Applying date range:', startDate, 'to', endDate);
  };

  const handleHomeClick = () => {
    navigate('/dashboard'); // <-- Redirect to dashboard
  };

  return (
    <div className="ig-dashboard-container">
      {/* Header with Navigation */}
      <header className="ig-dashboard-header">
        <div className="ig-header-content">
          <div className="ig-branding">
            <i className="ig-fab fa-instagram logo-icon"></i>
            <h1 className="ig-dashboard-title">Instagram Analytics</h1>
            <button className="ig-home-button" onClick={handleHomeClick}>
              <i className="ig-fas fa-home"></i>
              <span>Home</span>
            </button>
          </div>

          <div className="ig-header-actions">
            <div className="ig-date-range-picker">
              <div className="date-input-group">
                <i className="far fa-calendar-alt"></i>
                <input 
                  type="date" 
                  className="ig-date-input" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <span className="ig-date-separator">to</span>
              <div className="date-input-group">
                <i className="far fa-calendar-alt"></i>
                <input 
                  type="date" 
                  className="ig-date-input" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button className="ig-apply-btn" onClick={handleApplyDates}>
                <i className="fas fa-check"></i> Apply
              </button>
            </div>

            <button className="ig-export-btn" onClick={handleExport}>
              <i className="ig-fas fa-file-export"></i> Export Report
            </button>
          </div>
        </div>

        <nav className="ig-dashboard-tabs">
          <ul>
            <li className={activeTab === 'overview' ? 'active' : ''}>
              <a onClick={() => handleTabClick('overview')}>
                <i className="ig-fas fa-chart-line"></i> Overview
              </a>
            </li>
            <li className={activeTab === 'content' ? 'active' : ''}>
              <a onClick={() => handleTabClick('content')}>
                <i className="ig-fas fa-image"></i> Content
              </a>
            </li>
            <li className={activeTab === 'audience' ? 'active' : ''}>
              <a onClick={() => handleTabClick('audience')}>
                <i className="ig-fas fa-users"></i> Audience
              </a>
            </li>
            <li className={activeTab === 'notifications' ? 'active' : ''}>
              <a onClick={() => handleTabClick('notifications')}>
                <i className="ig-fas fa-bell"></i> Notifications
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Dashboard Content */}
      <main className="ig-dashboard-content">
        {/* Overview Tab: Show metrics summary and engagement metrics */}
        {activeTab === 'overview' && (
          <>
            {/* Summary Cards */}
            <section className="ig-metrics-summary">
              <div className="ig-metric-card followers">
                <div className="ig-metric-header">
                  <h3>Followers</h3>
                  <i className="ig-fas fa-user-plus"></i>
                </div>
                <div className="ig-metric-value">12,350</div>
                <div className="ig-metric-change positive">
                  <i className="ig-fas fa-arrow-up"></i> 4.2% from last week
                </div>
              </div>

              <div className="ig-metric-card following">
                <div className="ig-metric-header">
                  <h3>Following</h3>
                  <i className="ig-fas fa-user-friends"></i>
                </div>
                <div className="ig-metric-value">180</div>
                <div className="ig-metric-change neutral">
                  <i className="ig-fas fa-minus"></i> No change
                </div>
              </div>

              <div className="ig-metric-card posts">
                <div className="ig-metric-header">
                  <h3>Posts</h3>
                  <i className="ig-fas fa-image"></i>
                </div>
                <div className="ig-metric-value">210</div>
                <div className="ig-metric-change positive">
                  <i className="ig-fas fa-arrow-up"></i> 3 new this week
                </div>
              </div>

              <div className="ig-metric-card engagement">
                <div className="ig-metric-header">
                  <h3>Engagement Rate</h3>
                  <i className="ig-fas fa-heart"></i>
                </div>
                <div className="ig-metric-value">8.2%</div>
                <div className="ig-metric-change positive">
                  <i className="ig-fas fa-arrow-up"></i> 1.1% improvement
                </div>
              </div>
            </section>
            {/* Engagement Metrics Section */}
            <section className="ig-analytics-section">
              <div className="ig-section-header">
                <h2><i className="ig-fas fa-chart-line"></i> Engagement Metrics</h2>
                <div className="ig-timeframe-selector">
                  <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              <div className="ig-engagement-grid">
                {/* Row 1: Core Engagement Metrics */}
                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Likes <i className="ig-fas fa-info-circle tooltip" title="Number of people who liked your post"></i></h4>
                      <div className="ig-metric-value">24,560</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 12% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '72%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Comments <i className="ig-fas fa-info-circle tooltip" title="Number of comments your post received"></i></h4>
                      <div className="ig-metric-value">1,230</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 8% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '65%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Shares <i className="ig-fas fa-info-circle tooltip" title="Number of times your post was shared with others"></i></h4>
                      <div className="ig-metric-value">890</div>
                      <div className="ig-metric-change neutral">
                        <i className="ig-fas fa-minus"></i> No change
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '58%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Content Interaction Metrics */}
                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Saves <i className="ig-fas fa-info-circle tooltip" title="How many users saved your post for later"></i></h4>
                      <div className="ig-metric-value">3,450</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 22% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '68%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Impressions <i className="ig-fas fa-info-circle tooltip" title="Total number of times your content was shown"></i></h4>
                      <div className="ig-metric-value">145,600</div>
                      <div className="ig-metric-change negative">
                        <i className="ig-fas fa-arrow-down"></i> 5% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '82%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Reach <i className="ig-fas fa-info-circle tooltip" title="Number of unique users who saw your post"></i></h4>
                      <div className="ig-metric-value">89,340</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 7% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '75%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Profile and Link Metrics */}
                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Profile Views <i className="ig-fas fa-info-circle tooltip" title="Number of people who visited your profile from the post"></i></h4>
                      <div className="ig-metric-value">8,230</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 15% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '62%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Link Clicks <i className="ig-fas fa-info-circle tooltip" title="Clicks on the website link in your bio"></i></h4>
                      <div className="ig-metric-value">1,430</div>
                      <div className="ig-metric-change neutral">
                        <i className="ig-fas fa-minus"></i> No change
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '45%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Story Replies <i className="ig-fas fa-info-circle tooltip" title="Replies you get on your stories"></i></h4>
                      <div className="ig-metric-value">620</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 18% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '55%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Video Metrics */}
                <div className="ig-engagement-card">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Video Views <i className="ig-fas fa-info-circle tooltip" title="Number of times your videos were watched (usually over 3s)"></i></h4>
                      <div className="ig-metric-value">56,780</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 32% from last period
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '78%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Engagement Rate Card */}
                <div className="ig-engagement-card highlight">
                  <div className="ig-engagement-metric">
                    <div className="ig-metric-info">
                      <h4>Engagement Rate <i className="ig-fas fa-info-circle tooltip" title="(Likes + Comments + Shares + Saves) / Reach"></i></h4>
                      <div className="ig-metric-value">8.4%</div>
                      <div className="ig-metric-change positive">
                        <i className="ig-fas fa-arrow-up"></i> 1.2% improvement
                      </div>
                    </div>
                    <div className="ig-metric-chart">
                      <div className="ig-chart-placeholder" style={{height: '84%'}}></div>
                    </div>
                  </div>
                  <div className="ig-benchmark-indicator">
                    <i className="ig-fas fa-bullseye"></i> Industry benchmark: 6.2%
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Content Tab: Show Top Performing Content */}
        {activeTab === 'content' && (
          <section className="ig-analytics-section">
            <div className="ig-section-header">
              <h2><i className="ig-fas fa-image"></i> Top Performing Content</h2>
              <button className="ig-view-all-btn">View All Content</button>
            </div>

            <div className="ig-content-grid">
              <div className="ig-content-card">
                <div className="ig-content-preview" style={{backgroundColor: '#f5f5f5'}}>
                  <div className="ig-content-stats">
                    <span><i className="ig-fas fa-heart"></i> 1.2k</span>
                    <span><i className="ig-fas fa-comment"></i> 230</span>
                  </div>
                </div>
                <div className="ig-content-info">
                  <h4>Post #1 - Product Launch</h4>
                  <p>Posted 3 days ago</p>
                  <div className="ig-engagement-rate">
                    <div className="ig-rate-bar" style={{width: '85%'}}></div>
                    <span>8.5% engagement</span>
                  </div>
                </div>
              </div>

              <div className="ig-content-card">
                <div className="ig-content-preview" style={{backgroundColor: '#e9e9e9'}}>
                  <div className="ig-content-stats">
                    <span><i className="ig-fas fa-heart"></i> 980</span>
                    <span><i className="ig-fas fa-comment"></i> 190</span>
                  </div>
                </div>
                <div className="ig-content-info">
                  <h4>Post #2 - Behind the Scenes</h4>
                  <p>Posted 1 week ago</p>
                  <div className="ig-engagement-rate">
                    <div className="ig-rate-bar" style={{width: '72%'}}></div>
                    <span>7.2% engagement</span>
                  </div>
                </div>
              </div>

              <div className="ig-content-card">
                <div className="ig-content-preview" style={{backgroundColor: '#dedede'}}>
                  <div className="ig-content-stats">
                    <span><i className="ig-fas fa-heart"></i> 870</span>
                    <span><i className="ig-fas fa-comment"></i> 120</span>
                  </div>
                </div>
                <div className="ig-content-info">
                  <h4>Post #3 - Customer Story</h4>
                  <p>Posted 2 weeks ago</p>
                  <div className="ig-engagement-rate">
                    <div className="ig-rate-bar" style={{width: '68%'}}></div>
                    <span>6.8% engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Audience Tab: Show Audience Insights */}
        {activeTab === 'audience' && (
          <section className="ig-analytics-section">
            <div className="ig-section-header">
              <h2><i className="ig-fas fa-users"></i> Audience Insights</h2>
              <div className="ig-segment-selector">
                <select value={audienceSegment} onChange={(e) => setAudienceSegment(e.target.value)}>
                  <option>All Followers</option>
                  <option>Engaged Audience</option>
                  <option>New Followers</option>
                </select>
              </div>
            </div>

            <div className="ig-audience-grid">
              <div className="ig-audience-card">
                <h4><i className="ig-fas fa-venus-mars"></i> Gender Distribution</h4>
                <div className="ig-gender-chart">
                  <div className="ig-male-segment" style={{width: '60%'}}>
                    <span>👨 60% Male</span>
                  </div>
                  <div className="ig-female-segment" style={{width: '40%'}}>
                    <span>👩 40% Female</span>
                  </div>
                </div>
              </div>

              <div className="ig-audience-card">
                <h4><i className="ig-fas fa-globe"></i> Top Locations</h4>
                <ul className="ig-location-list">
                  <li>
                    <span className="ig-country-flag">🇮🇳</span>
                    <span className="ig-country-name">India</span>
                    <span className="ig-country-percent">50%</span>
                    <div className="ig-location-bar" style={{width: '50%'}}></div>
                  </li>
                  <li>
                    <span className="ig-country-flag">🇺🇸</span>
                    <span className="ig-country-name">USA</span>
                    <span className="ig-country-percent">20%</span>
                    <div className="ig-location-bar" style={{width: '20%'}}></div>
                  </li>
                  <li>
                    <span className="ig-country-flag">🇬🇧</span>
                    <span className="ig-country-name">UK</span>
                    <span className="ig-country-percent">10%</span>
                    <div className="ig-location-bar" style={{width: '10%'}}></div>
                  </li>
                </ul>
              </div>

              <div className="ig-audience-card">
                <h4><i className="ig-fas fa-clock"></i> Active Times</h4>
                <div className="ig-time-distribution">
                  <div className="ig-time-block peak">
                    <span>6PM - 10PM</span>
                    <span>Peak Activity</span>
                  </div>
                  <div className="ig-time-block moderate">
                    <span>12PM - 6PM</span>
                    <span>Moderate</span>
                  </div>
                  <div className="ig-time-block low">
                    <span>10PM - 8AM</span>
                    <span>Low Activity</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Instagram;