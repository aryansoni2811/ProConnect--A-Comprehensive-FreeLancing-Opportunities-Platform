import React, { useState, useEffect } from 'react';
import { Search, Clock, DollarSign, Calendar, Zap } from 'lucide-react';
import axiosInstance from '../config/axiosConfig';
import './BrowseProjectsSection.css';

const BrowseProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    // Filter by search term
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.requiredSkills.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    const matchesTab = activeTab === 'all' || project.status.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesTab;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading-container">Loading projects...</div>;
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Browse Projects</h1>
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search projects by title, description or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="projects-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Projects
        </button>
        <button 
          className={`tab ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open
        </button>
        <button 
          className={`tab ${activeTab === 'in progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in progress')}
        >
          In Progress
        </button>
        <button 
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-client">Posted by: {project.clientEmail}</p>
              
              <p className="project-description">
                {project.description.length > 150 
                  ? `${project.description.substring(0, 150)}...` 
                  : project.description}
              </p>
              
              <div className="project-skills">
                {project.requiredSkills.split(',').map((skill, index) => (
                  <span key={index} className="skill-tag">{skill.trim()}</span>
                ))}
              </div>
              
              <div className="project-details">
                <div className="detail-item">
                  <DollarSign size={16} />
                  <span>${project.budget.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{formatDate(project.deadline)}</span>
                </div>
              </div>
              
              <button className="btn-apply">
                <Zap size={16} />
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProjectsSection;