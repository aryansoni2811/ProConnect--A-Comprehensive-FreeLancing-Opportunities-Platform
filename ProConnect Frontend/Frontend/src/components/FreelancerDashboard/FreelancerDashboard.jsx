import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  DollarSign, 
  MessageCircle, 
  Settings,
  User,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import './FreelancerDashboard.css';
import axiosInstance from '../config/axiosConfig';
import ProjectsSection from './ProjectsSection';
import ProposalsSection from './ProposalsSection';
import EarningsSection from './EarningsSection';
import MessagesSection from './MessagesSection';
import SettingsSection from './SettingsSection';
import BrowseProjectsSection from './BrowseProjectsSection';

const FreelancerDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [freelancerData, setFreelancerData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  // Hardcoded data
  const hardcodedData = {
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

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const email = localStorage.getItem('freelancerEmail');
        if (!email) {
          throw new Error('No freelancer email found in localStorage');
        }
        
        const response = await axiosInstance.get(`/api/auth/freelancer/freelancer?email=${email}`);
        setFreelancerData({
          name: response.data.name || 'Not provided',
          email: response.data.email || 'Not provided'
        });
      } catch (error) {
        console.error('Error fetching freelancer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, []);

  const renderOverview = () => (
    <div className="dashboard-metrics-grid">
      <div className="dashboard-metric-card earnings-card">
        <DollarSign className="metric-icon" />
        <div>
          <h3>Total Earnings</h3>
          <p>${hardcodedData.totalEarnings.toLocaleString()}</p>
        </div>
      </div>
      <div className="dashboard-metric-card projects-card">
        <CheckCircle className="metric-icon" />
        <div>
          <h3>Completed Projects</h3>
          <p>{hardcodedData.completedProjects}</p>
        </div>
      </div>
      <div className="dashboard-metric-card active-projects-card">
        <Clock className="metric-icon" />
        <div>
          <h3>Active Projects</h3>
          <p>{hardcodedData.activeProjects}</p>
        </div>
      </div>
      <div className="dashboard-metric-card profile-card">
        <Zap className="metric-icon" />
        <div>
          <h3>Profile Completeness</h3>
          <p>{hardcodedData.profileCompleteness}%</p>
        </div>
      </div>
    </div>
  );

  const renderRecentProjects = () => (
    <div className="recent-projects-container">
      <h2>Recent Projects</h2>
      {hardcodedData.recentProjects.map(project => (
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
        <User className="profile-image" size={64} />
        <h2>{freelancerData.name}</h2>
        <p>{hardcodedData.profession}</p>
        <p className="profile-email">{freelancerData.email}</p>
      </div>
      <nav className="sidebar-navigation">
        {[
          { icon: Home, label: 'Overview', section: 'overview' },
          { icon: Briefcase, label: 'Projects', section: 'projects' },
          { icon: FileText, label: 'Browse Projects', section: 'browse-projects' },
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
    if (loading) {
      return <div className="loading-container">Loading profile data...</div>;
    }

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
        case 'browse-projects':
          return <BrowseProjectsSection />;
      case 'earnings':
        return <EarningsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'settings':
        return <SettingsSection freelancerData={freelancerData} />;
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