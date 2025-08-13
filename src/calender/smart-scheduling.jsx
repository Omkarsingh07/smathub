import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Hash, Image, Video, FileText, Bell, Download, Trash2, Plus, Filter, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import './smart-scheduling.css';
import { useNavigate } from 'react-router-dom';

const SmartScheduling = () => {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingReminders, setPendingReminders] = useState([]);
  const navigate = useNavigate()

  // Form state
  const [newTodo, setNewTodo] = useState({
    platform: '',
    contentType: 'post',
    postDate: '',
    caption: '',
    keywords: '',
    completed: false
  });

  useEffect(() => {
    // Check for pending reminders every minute
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [todos]);

  const checkReminders = () => {
    const now = new Date();
    const pending = todos.filter(todo => {
      if (todo.completed) return false;
      const todoDate = new Date(todo.postDate);
      const timeDiff = todoDate.getTime() - now.getTime();
      // Show reminder if post date is within 24 hours
      return timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000;
    });
    setPendingReminders(pending);
  };

  const addTodo = () => {
    if (!newTodo.platform || !newTodo.postDate || !newTodo.caption) {
      alert('Please fill in all required fields');
      return;
    }

    const todo = {
      id: Date.now(),
      ...newTodo,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, todo]);
    setNewTodo({
      platform: '',
      contentType: 'post',
      postDate: '',
      caption: '',
      keywords: '',
      completed: false
    });
    setShowAddForm(false);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smart-scheduling-todos.json';
    link.click();
  };

  const filteredTodos = todos.filter(todo => {
    const todoDate = new Date(todo.postDate);
    const matchesDate = !selectedDate || todo.postDate === selectedDate;
    const matchesMonth = !selectedMonth ||
      todoDate.getMonth() === parseInt(selectedMonth) - 1;
    const matchesSearch = !searchTerm ||
      todo.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.keywords.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDate && matchesMonth && matchesSearch;
  });

  const pendingTodos = filteredTodos.filter(todo => !todo.completed);
  const completedTodos = filteredTodos.filter(todo => todo.completed);

  const sendReminder = (todo) => {
    // Simulate sending email and mobile notification
    alert(`📧 Email Reminder Sent!\n📱 Mobile Notification Sent!\n\nUpcoming post: "${todo.caption}" scheduled for ${new Date(todo.postDate).toLocaleDateString()}`);
  };

  return (
    <div className="ss-app-container">
      {/* Header */}
      <header className="ss-header">
        <div className="ss-header-content">

          {/* LEFT SIDE */}
          <div className="ss-header-left">
            <div className="ss-logo">
              <Calendar className="ss-logo-icon" />
            </div>

            <div className="ss-brand-info">
              <h1 className="ss-brand-title">Smart Scheduling</h1>
              <p className="ss-brand-subtitle">Content Management Platform</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="ss-header-right">
            <button className="ss-home-button" onClick={() => navigate('/dashboard')}>
              <i className="ss-fas fa-home"></i>
              <span>Home</span>
            </button>

            {pendingReminders.length > 0 && (
              <div className="ss-notification-bell">
                <Bell className="ss-bell-icon" />
                <span className="ss-notification-count">
                  {pendingReminders.length}
                </span>
              </div>
            )}

            <button onClick={exportData} className="ss-export-btn">
              <Download className="ss-btn-icon" />
              <span>Export</span>
            </button>
          </div>

        </div>
      </header>

      {/* Reminder Notifications */}
      {pendingReminders.length > 0 && (
        <div className="ss-reminder-notification">
          <div className="ss-reminder-content">
            <AlertCircle className="ss-reminder-icon" />
            <div className="ss-reminder-details">
              <h3 className="ss-reminder-title">Pending Reminders</h3>
              <div className="ss-reminder-list">
                {pendingReminders.map(todo => (
                  <div key={todo.id} className="ss-reminder-item">
                    <span className="ss-reminder-text">
                      <strong>{todo.platform}</strong> - {todo.caption.substring(0, 50)}...
                      <span className="ss-reminder-date">({new Date(todo.postDate).toLocaleDateString()})</span>
                    </span>
                    <button
                      onClick={() => sendReminder(todo)}
                      className="ss-send-reminder-btn"
                    >
                      Send Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="ss-main-content">
        {/* Filters Section */}
        <div className="ss-filters-section">
          <div className="ss-filters-content">
            <div className="ss-filter-header">
              <Filter className="ss-filter-icon" />
              <span className="ss-filter-label">Filters:</span>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ss-filter-input date-input"
            />

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="ss-filter-input select-input"
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleDateString('en', { month: 'long' })}
                </option>
              ))}
            </select>

            <div className="ss-search-container">
              <Search className="ss-search-icon" />
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ss-search-input"
              />
            </div>

            <button
              onClick={() => {
                setSelectedDate('');
                setSelectedMonth('');
                setSearchTerm('');
              }}
              className="ss-clear-filters-btn"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Add Todo Button */}
        <div className="ss-add-todo-section">
          <button
            onClick={() => setShowAddForm(true)}
            className="ss-add-todo-btn"
          >
            <Plus className="ss-btn-icon" />
            <span>Add New Todo</span>
          </button>
        </div>

        {/* Add Todo Form */}
        {showAddForm && (
          <div className="ss-add-form">
            <h3 className="ss-form-title">Create New Content Todo</h3>

            <div className="ss-form-row">
              <div className="ss-form-group">
                <label className="ss-form-label">Platform *</label>
                <input
                  type="text"
                  value={newTodo.platform}
                  onChange={(e) => setNewTodo({ ...newTodo, platform: e.target.value })}
                  placeholder="Instagram, YouTube, TikTok, LinkedIn..."
                  className="ss-form-input"
                />
              </div>

              <div className="ss-form-group">
                <label className="ss-form-label">Content Type</label>
                <select
                  value={newTodo.contentType}
                  onChange={(e) => setNewTodo({ ...newTodo, contentType: e.target.value })}
                  className="ss-form-input"
                >
                  <option value="post">📝 Post</option>
                  <option value="video">🎥 Video</option>
                  <option value="reel">🎬 Reel</option>
                  <option value="story">📱 Story</option>
                </select>
              </div>
            </div>

            <div className="ss-form-group">
              <label className="ss-form-label">Post Date *</label>
              <input
                type="datetime-local"
                value={newTodo.postDate}
                onChange={(e) => setNewTodo({ ...newTodo, postDate: e.target.value })}
                className="ss-form-input"
              />
            </div>

            <div className="ss-form-group">
              <label className="ss-form-label">Caption/Description *</label>
              <textarea
                value={newTodo.caption}
                onChange={(e) => setNewTodo({ ...newTodo, caption: e.target.value })}
                placeholder="Write your caption or content description..."
                rows="3"
                className="ss-form-textarea"
              />
            </div>

            <div className="ss-form-group">
              <label className="ss-form-label">Keywords/Hashtags</label>
              <input
                type="text"
                value={newTodo.keywords}
                onChange={(e) => setNewTodo({ ...newTodo, keywords: e.target.value })}
                placeholder="#marketing #socialmedia #content #viral"
                className="ss-form-input"
              />
            </div>

            <div className="ss-form-actions">
              <button onClick={addTodo} className="ss-submit-btn">
                Add Todo
              </button>
              <button onClick={() => setShowAddForm(false)} className="ss-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="ss-stats-container">
          <div className="ss-stat-card">
            <div className="ss-stat-icon pending-icon">
              <Clock className="ss-icon" />
            </div>
            <div className="ss-stat-content">
              <h3 className="ss-stat-number">{pendingTodos.length}</h3>
              <p className="ss-stat-label">Pending Tasks</p>
            </div>
          </div>

          <div className="ss-stat-card">
            <div className="ss-stat-icon completed-icon">
              <CheckCircle2 className="ss-icon" />
            </div>
            <div className="ss-stat-content">
              <h3 className="ss-stat-number">{completedTodos.length}</h3>
              <p className="ss-stat-label">Completed</p>
            </div>
          </div>

          <div className="ss-stat-card">
            <div className="ss-stat-icon total-icon">
              <FileText className="ss-icon" />
            </div>
            <div className="ss-stat-content">
              <h3 className="ss-stat-number">{todos.length}</h3>
              <p className="ss-stat-label">Total Tasks</p>
            </div>
          </div>
        </div>

        {/* Pending Todos */}
        <div className="ss-todos-section">
          <h2 className="ss-section-title pending-title">
            <Clock className="ss-section-icon" />
            Pending Tasks ({pendingTodos.length})
          </h2>

          <div className="ss-todos-list">
            {pendingTodos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
            {pendingTodos.length === 0 && (
              <div className="ss-empty-state">
                <Clock className="ss-empty-icon" />
                <p>No pending tasks found</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Todos */}
        <div className="ss-todos-section">
          <h2 className="ss-section-title completed-title">
            <CheckCircle2 className="ss-section-icon" />
            Completed Tasks ({completedTodos.length})
          </h2>

          <div className="ss-todos-list">
            {completedTodos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
            {completedTodos.length === 0 && (
              <div className="ss-empty-state">
                <CheckCircle2 className="ss-empty-icon" />
                <p>No completed tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TodoCard = ({ todo, onToggle, onDelete }) => {
  const getContentIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="ss-content-icon" />;
      case 'reel': return <Video className="ss-content-icon" />;
      case 'story': return <Image className="ss-content-icon" />;
      default: return <FileText className="ss-content-icon" />;
    }
  };

  const isOverdue = new Date(todo.postDate) < new Date() && !todo.completed;
  const isDueSoon = !todo.completed &&
    new Date(todo.postDate).getTime() - new Date().getTime() <= 24 * 60 * 60 * 1000;

  const getCardClass = () => {
    if (todo.completed) return 'todo-card completed';
    if (isOverdue) return 'todo-card overdue';
    if (isDueSoon) return 'todo-card due-soon';
    return 'todo-card';
  };

  return (
    <div className={getCardClass()}>
      <div className="ss-todo-content">
        <div className="ss-todo-main">
          <div className="ss-todo-header">
            <button
              onClick={() => onToggle(todo.id)}
              className={`ss-checkbox ${todo.completed ? 'checked' : ''}`}
            >
              {todo.completed && <CheckCircle2 className="ss-check-icon" />}
            </button>

            <div className="ss-todo-meta">
              <span className="ss-platform-name">{todo.platform}</span>
              <div className="ss-content-type">
                {getContentIcon(todo.contentType)}
              </div>
              <span className="ss-content-type-text">{todo.contentType}</span>
            </div>

            {isOverdue && (
              <span className="ss-status-badge overdue-badge">
                Overdue
              </span>
            )}
            {isDueSoon && !isOverdue && (
              <span className="ss-status-badge due-soon-badge">
                Due Soon
              </span>
            )}
          </div>

          <p className={`ss-todo-caption ${todo.completed ? 'completed-text' : ''}`}>
            {todo.caption}
          </p>

          <div className="ss-todo-details">
            <div className="ss-detail-item">
              <Calendar className="ss-detail-icon" />
              <span>{new Date(todo.postDate).toLocaleDateString()}</span>
            </div>
            <div className="ss-detail-item">
              <Clock className="ss-detail-icon" />
              <span>{new Date(todo.postDate).toLocaleTimeString()}</span>
            </div>
          </div>

          {todo.keywords && (
            <div className="ss-todo-keywords">
              <Hash className="ss-hash-icon" />
              <span className="ss-keywords-text">{todo.keywords}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="ss-delete-btn"
        >
          <Trash2 className="ss-delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default SmartScheduling;