import React, { useState , useEffect } from 'react';
import { 
  Home, 
  Plus, 
  Search, 
  User, 
  MessageCircle, 
  CheckCircle, 
  DollarSign, 
  FileText 
} from 'lucide-react';
import './Client-Dashboard.css';
import axiosInstance from '../config/axiosConfig';

const ClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [clientData, setClientData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientEmail = localStorage.getItem('clientEmail');
        if (!clientEmail) {
          throw new Error('No client email found');
        }
        
        const response = await axiosInstance.get(`/api/auth/client?email=${clientEmail}`);
        setClientData(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  const projectStats = {
    totalProjects: 7,
    activeProjects: 3,
    completedProjects: 4,
    pendingInvoices: 2
  };

  const recentProjects = [
    {
      id: 1,
      title: 'Website Redesign',
      client: 'TechCorp Solutions',
      status: 'In Progress',
      budget: '$1,500',
      deadline: '30 Aug 2025'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'StartUp Innovations',
      status: 'Completed',
      budget: '$3,000',
      deadline: '15 Jul 2025'
    }
  ];

  const navigationItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      section: 'dashboard' 
    },
    { 
      icon: Plus, 
      label: 'Post Project', 
      section: 'post-project' 
    },
    { 
      icon: Search, 
      label: 'Find Freelancers', 
      section: 'find-freelancers' 
    },
    { 
      icon: MessageCircle, 
      label: 'Messages', 
      section: 'messages' 
    },
    { 
      icon: User, 
      label: 'Profile', 
      section: 'profile' 
    }
  ];

  // Render different sections based on activeSection
  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <>
            {/* Stats Grid */}
            <div className="stats-grid">
              {[
                { 
                  icon: FileText, 
                  title: 'Total Projects', 
                  value: projectStats.totalProjects 
                },
                { 
                  icon: CheckCircle, 
                  title: 'Completed Projects', 
                  value: projectStats.completedProjects 
                },
                { 
                  icon: DollarSign, 
                  title: 'Pending Invoices', 
                  value: projectStats.pendingInvoices 
                }
              ].map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <stat.icon size={30} color="#1a73e8" />
                  </div>
                  <div>
                    <h4>{stat.title}</h4>
                    <h3>{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Projects */}
            <div className="recent-projects">
              <h2>Recent Projects</h2>
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.title}</td>
                      <td>{project.client}</td>
                      <td>
                        <span 
                          className={`project-status ${
                            project.status === 'In Progress' 
                              ? 'status-in-progress' 
                              : 'status-completed'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td>{project.budget}</td>
                      <td>{project.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      
      case 'post-project':
        return (
          <div className="post-project-section">
            <h2>Post a New Project</h2>
            <form className="post-project-form">
              <div className="form-group">
                <label htmlFor="project-title">Project Title</label>
                <input 
                  type="text" 
                  id="project-title" 
                  placeholder="Enter project title" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="project-description">Project Description</label>
                <textarea 
                  id="project-description" 
                  placeholder="Describe your project in detail"
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget</label>
                  <input 
                    type="text" 
                    id="budget" 
                    placeholder="Enter project budget" 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input 
                    type="date" 
                    id="deadline" 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="skills">Required Skills</label>
                <input 
                  type="text" 
                  id="skills" 
                  placeholder="e.g., React, Node.js, Python" 
                />
              </div>
              
              <button type="submit" className="submit-project-btn">
                Post Project
              </button>
            </form>
          </div>
        );
      
      case 'find-freelancers':
        return (
          <div className="find-freelancers-section">
            <h2>Find Freelancers</h2>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search freelancers by skills" 
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>
            <div className="freelancers-list">
              <p>Freelancer search results will appear here.</p>
            </div>
          </div>
        );
      
      case 'messages':
        return (
          <div className="messages-section">
            <h2>Messages</h2>
            <div className="messages-container">
              <p>No messages at the moment.</p>
            </div>
          </div>
        );
      
        case 'profile':
          return (
            <div className="profile-section">
              <h2>User Profile</h2>
              <div className="profile-details">
                <img 
                  src="/api/placeholder/200/200" 
                  alt="Profile" 
                  className="profile-image" 
                />
                <div className="profile-info">
                  <h3>{clientData?.name || 'Loading...'}</h3>
                  <p>Email: {clientData?.email || 'Loading...'}</p>
                  <p>Location: {clientData?.location || 'New York, USA'}</p>
                  <p>Member Since: {clientData?.createdAt ? new Date(clientData.createdAt).toLocaleDateString() : 'January 2024'}</p>
                </div>
              </div>
            </div>
          );
      
      default:
        return null;
    }
  };

  return (
    <div className="client-dashboard">
      
      <div className="dashboard-sidebar">
        

        <div className="user-profile">
          <img 
            src="/api/placeholder/120/120" 
            alt="Profile" 
            className="user-profile-image" 
          />
          <h3>{clientData?.name || 'Loading...'}</h3>
          <p>{clientData?.email || 'Loading...'}</p>
        </div>

        <nav className="dashboard-nav">
          <ul className="nav-menu">
            {navigationItems.map((item, index) => (
              <li 
                key={index}
                className={`nav-item ${activeSection === item.section ? 'active' : ''}`}
                onClick={() => setActiveSection(item.section)}
              >
                <item.icon className="nav-item-icon" size={20} />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="dashboard-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default ClientDashboard;