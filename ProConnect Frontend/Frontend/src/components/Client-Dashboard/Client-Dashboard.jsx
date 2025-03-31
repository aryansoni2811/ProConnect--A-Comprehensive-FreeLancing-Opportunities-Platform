import React, { useState, useEffect } from 'react';
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
  const [recentProjects, setRecentProjects] = useState([]);
  const [projectStats, setProjectStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingInvoices: 0
  });

  // Form state for posting a project
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    requiredSkills: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Get client data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem('token');
        const clientEmail = localStorage.getItem('clientEmail');
        
        if (!token || !clientEmail) {
          throw new Error('Authentication required');
        }
        
        const response = await axiosInstance.get(`/api/auth/client?email=${clientEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClientData(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Redirect to login if unauthorized
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchClientData();
  }, []);

  // Get client projects
  useEffect(() => {
    const fetchClientProjects = async () => {
      try {
        const clientEmail = localStorage.getItem('clientEmail');
        if (!clientEmail) {
          return;
        }
        
        const response = await axiosInstance.get(`/api/projects/client?email=${clientEmail}`);
        setRecentProjects(response.data.slice(0, 5)); // Get only 5 most recent projects
        
        // Calculate stats
        const stats = {
          totalProjects: response.data.length,
          activeProjects: response.data.filter(p => p.status === 'Open' || p.status === 'In Progress').length,
          completedProjects: response.data.filter(p => p.status === 'Completed').length,
          pendingInvoices: response.data.filter(p => p.status === 'Completed' && !p.isPaid).length || 0
        };
        
        setProjectStats(stats);
      } catch (error) {
        console.error('Error fetching client projects:', error);
      }
    };

    fetchClientProjects();
  }, []);

  // Handle project form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProjectForm({
      ...projectForm,
      [id]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: ''
      });
    }
  };

  // Validate project form
  const validateForm = () => {
    const errors = {};
    
    if (!projectForm.title.trim()) {
      errors.title = 'Project title is required';
    }
    
    if (!projectForm.description.trim()) {
      errors.description = 'Project description is required';
    }
    
    if (!projectForm.budget.trim()) {
      errors.budget = 'Budget is required';
    } else if (isNaN(parseFloat(projectForm.budget)) || parseFloat(projectForm.budget) <= 0) {
      errors.budget = 'Budget must be a positive number';
    }
    
    if (!projectForm.deadline) {
      errors.deadline = 'Deadline is required';
    } else {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const selectedDate = new Date(projectForm.deadline);
      
      if (selectedDate < currentDate) {
        errors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    if (!projectForm.requiredSkills.trim()) {
      errors.requiredSkills = 'Required skills are required';
    }
    
    return errors;
  };

  // Handle project form submission
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    
    // Reset states
    setSubmitSuccess(false);
    setSubmitError('');
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const clientEmail = localStorage.getItem('clientEmail');
      if (!clientEmail) {
        throw new Error('No client email found');
      }
      
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        budget: parseFloat(projectForm.budget),
        deadline: projectForm.deadline,
        requiredSkills: projectForm.requiredSkills,
        clientEmail: clientEmail
      };
      
      await axiosInstance.post('/api/projects', projectData);
      
      // Reset form
      setProjectForm({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        requiredSkills: ''
      });
      
      setSubmitSuccess(true);
      
      // Refresh projects after successful submission
      const response = await axiosInstance.get(`/api/projects/client?email=${clientEmail}`);
      setRecentProjects(response.data.slice(0, 5));
      
      // Update stats
      const stats = {
        totalProjects: response.data.length,
        activeProjects: response.data.filter(p => p.status === 'Open' || p.status === 'In Progress').length,
        completedProjects: response.data.filter(p => p.status === 'Completed').length,
        pendingInvoices: response.data.filter(p => p.status === 'Completed' && !p.isPaid).length || 0
      };
      
      setProjectStats(stats);
      
    } catch (error) {
      console.error('Error posting project:', error);
      setSubmitError('Failed to post project. Please try again.');
    }
  };

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

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

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
              {recentProjects.length > 0 ? (
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Status</th>
                      <th>Budget</th>
                      <th>Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>
                          <span 
                            className={`project-status ${
                              project.status === 'Open' 
                                ? 'status-open' 
                                : project.status === 'In Progress'
                                ? 'status-in-progress'
                                : 'status-completed'
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td>${project.budget.toFixed(2)}</td>
                        <td>{formatDate(project.deadline)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No projects found. Start by posting your first project!</p>
              )}
            </div>
          </>
        );
      
      case 'post-project':
        return (
          <div className="post-project-section">
            <h2>Post a New Project</h2>
            
            {submitSuccess && (
              <div className="success-message">
                Project posted successfully! Freelancers can now view and bid on your project.
              </div>
            )}
            
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}
            
            <form className="post-project-form" onSubmit={handleSubmitProject}>
              <div className="form-group">
                <label htmlFor="title">Project Title</label>
                <input 
                  type="text" 
                  id="title" 
                  placeholder="Enter project title" 
                  value={projectForm.title}
                  onChange={handleInputChange}
                  className={formErrors.title ? 'error' : ''}
                />
                {formErrors.title && <span className="error-text">{formErrors.title}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Project Description</label>
                <textarea 
                  id="description" 
                  placeholder="Describe your project in detail"
                  rows="4"
                  value={projectForm.description}
                  onChange={handleInputChange}
                  className={formErrors.description ? 'error' : ''}
                ></textarea>
                {formErrors.description && <span className="error-text">{formErrors.description}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget ($)</label>
                  <input 
                    type="text" 
                    id="budget" 
                    placeholder="Enter project budget" 
                    value={projectForm.budget}
                    onChange={handleInputChange}
                    className={formErrors.budget ? 'error' : ''}
                  />
                  {formErrors.budget && <span className="error-text">{formErrors.budget}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input 
                    type="date" 
                    id="deadline"
                    value={projectForm.deadline}
                    onChange={handleInputChange}
                    className={formErrors.deadline ? 'error' : ''}
                  />
                  {formErrors.deadline && <span className="error-text">{formErrors.deadline}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="requiredSkills">Required Skills</label>
                <input 
                  type="text" 
                  id="requiredSkills" 
                  placeholder="e.g., React, Node.js, Python" 
                  value={projectForm.requiredSkills}
                  onChange={handleInputChange}
                  className={formErrors.requiredSkills ? 'error' : ''}
                />
                {formErrors.requiredSkills && <span className="error-text">{formErrors.requiredSkills}</span>}
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