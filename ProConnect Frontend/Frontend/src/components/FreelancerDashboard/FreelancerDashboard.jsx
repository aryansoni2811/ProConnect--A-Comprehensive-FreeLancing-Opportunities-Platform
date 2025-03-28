import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  DollarSign, 
  MessageCircle, 
  Settings, 
  Star, 
  CheckCircle, 
  Clock, 
  Zap 
} from 'lucide-react';
import './FreelancerDashboard.css';

// Import the new section components
import ProjectsSection from './ProjectsSection';
import ProposalsSection from './ProposalsSection';
import EarningsSection from './EarningsSection';
import MessagesSection from './MessagesSection';
import SettingsSection from './SettingsSection';

const FreelancerDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const freelancerData = {
    name: 'Sarah Johnson',
    profession: 'Graphic Designer',
    totalEarnings: 45670,
    completedProjects: 42,
    activeProjects: 3,
    profileCompleteness: 85,
    recentProjects: [
      {
        id: 1,
        title: 'Brand Identity Design',
        client: 'TechInnovate Solutions',
        status: 'Completed',
        earnings: 1500
      },
      {
        id: 2,
        title: 'Website Redesign',
        client: 'Global Marketing Inc.',
        status: 'In Progress',
        earnings: 2300
      }
    ]
  };

  const renderOverview = () => (
    <div className="dashboard-metrics-grid">
      <div className="dashboard-metric-card earnings-card">
        <DollarSign className="metric-icon" />
        <div>
          <h3>Total Earnings</h3>
          <p>${freelancerData.totalEarnings.toLocaleString()}</p>
        </div>
      </div>
      <div className="dashboard-metric-card projects-card">
        <CheckCircle className="metric-icon" />
        <div>
          <h3>Completed Projects</h3>
          <p>{freelancerData.completedProjects}</p>
        </div>
      </div>
      <div className="dashboard-metric-card active-projects-card">
        <Clock className="metric-icon" />
        <div>
          <h3>Active Projects</h3>
          <p>{freelancerData.activeProjects}</p>
        </div>
      </div>
      <div className="dashboard-metric-card profile-card">
        <Zap className="metric-icon" />
        <div>
          <h3>Profile Completeness</h3>
          <p>{freelancerData.profileCompleteness}%</p>
        </div>
      </div>
    </div>
  );

  const renderRecentProjects = () => (
    <div className="recent-projects-container">
      <h2>Recent Projects</h2>
      {freelancerData.recentProjects.map(project => (
        <div key={project.id} className="project-item">
          <div className="project-details">
            <h3>{project.title}</h3>
            <p>{project.client}</p>
          </div>
          <div className="project-status">
            <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
              {project.status}
            </span>
            <span className="project-earnings">
              ${project.earnings.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSidebar = () => (
    <div className="sidebar-container">
      <div className="profile-section">
        <img 
          src="/api/placeholder/120/120" 
          alt="Profile" 
          className="profile-image"
        />
        <h2>{freelancerData.name}</h2>
        <p>{freelancerData.profession}</p>
      </div>
      <nav className="sidebar-navigation">
        {[
          { icon: Home, label: 'Overview', section: 'overview' },
          { icon: Briefcase, label: 'Projects', section: 'projects' },
          { icon: FileText, label: 'Proposals', section: 'proposals' },
          { icon: DollarSign, label: 'Earnings', section: 'earnings' },
          { icon: MessageCircle, label: 'Messages', section: 'messages' },
          { icon: Settings, label: 'Settings', section: 'settings' }
        ].map(({ icon: Icon, label, section }) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`nav-item ${activeSection === section ? 'active' : ''}`}
          >
            <Icon className="nav-icon" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderMainContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <>
            {renderOverview()}
            {renderRecentProjects()}
          </>
        );
      case 'projects':
        return <ProjectsSection />;
      case 'proposals':
        return <ProposalsSection />;
      case 'earnings':
        return <EarningsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="freelancer-dashboard">
      <div className="dashboard-layout">
        <div className="sidebar-wrapper">
          {renderSidebar()}
        </div>
        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;