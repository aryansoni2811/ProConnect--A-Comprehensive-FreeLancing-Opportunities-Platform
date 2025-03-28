import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, Lock } from 'lucide-react';
import './SettingsSection.css';

const SettingsSection = () => {
  const [profileSettings, setProfileSettings] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    profession: 'Graphic Designer',
    notifications: {
      email: true,
      sms: false,
      pushNotifications: true
    },
    privacy: {
      profileVisibility: 'public',
      contactPreference: 'all'
    }
  });

  const handleToggleNotification = (type) => {
    setProfileSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  return (
    <div className="settings-section">
      <div className="settings-container">
        <div className="section-header">
          <Settings className="settings-icon" />
          <h2>Account Settings</h2>
        </div>

        <div className="settings-grid">
          <div className="settings-card profile-settings">
            <div className="card-header">
              <User className="card-icon" />
              <h3>Profile Information</h3>
            </div>
            <div className="profile-details">
              <div className="profile-image-container">
                <img 
                  src="/api/placeholder/120/120" 
                  alt="Profile" 
                  className="profile-image"
                />
                <button className="change-image-btn">Change Photo</button>
              </div>
              <div className="profile-info">
                <div className="info-row">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={profileSettings.name} 
                    readOnly 
                  />
                </div>
                <div className="info-row">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={profileSettings.email} 
                    readOnly 
                  />
                </div>
                <div className="info-row">
                  <label>Profession</label>
                  <input 
                    type="text" 
                    value={profileSettings.profession} 
                    readOnly 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card notification-settings">
            <div className="card-header">
              <Bell className="card-icon" />
              <h3>Notification Preferences</h3>
            </div>
            <div className="notification-options">
              <div className="toggle-row">
                <span>Email Notifications</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={profileSettings.notifications.email}
                    onChange={() => handleToggleNotification('email')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-row">
                <span>SMS Notifications</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={profileSettings.notifications.sms}
                    onChange={() => handleToggleNotification('sms')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-row">
                <span>Push Notifications</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={profileSettings.notifications.pushNotifications}
                    onChange={() => handleToggleNotification('pushNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-card privacy-settings">
            <div className="card-header">
              <Shield className="card-icon" />
              <h3>Privacy & Security</h3>
            </div>
            <div className="privacy-options">
              <div className="select-row">
                <label>Profile Visibility</label>
                <select 
                  value={profileSettings.privacy.profileVisibility}
                  onChange={(e) => setProfileSettings(prev => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      profileVisibility: e.target.value
                    }
                  }))}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="select-row">
                <label>Contact Preferences</label>
                <select 
                  value={profileSettings.privacy.contactPreference}
                  onChange={(e) => setProfileSettings(prev => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      contactPreference: e.target.value
                    }
                  }))}
                >
                  <option value="all">Allow All</option>
                  <option value="clients">Clients Only</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-card security-settings">
            <div className="card-header">
              <Lock className="card-icon" />
              <h3>Account Security</h3>
            </div>
            <div className="security-options">
              <button className="security-btn">Change Password</button>
              <button className="security-btn">Two-Factor Authentication</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;