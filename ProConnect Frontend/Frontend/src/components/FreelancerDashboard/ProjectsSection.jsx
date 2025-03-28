import React, { useState } from 'react';
import { Briefcase, CheckCircle, Clock, MoreVertical } from 'lucide-react';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Website Redesign',
      client: 'Global Retail Solutions',
      status: 'In Progress',
      deadline: '2024-06-15',
      budget: 3500,
      progress: 65
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      client: 'TechStart Innovations',
      status: 'Completed',
      deadline: '2024-03-20',
      budget: 2800,
      progress: 100
    },
    {
      id: 3,
      title: 'Marketing Brochure Design',
      client: 'Creative Marketing Agency',
      status: 'Pending',
      deadline: '2024-05-10',
      budget: 1200,
      progress: 30
    }
  ]);

  return (
    <div className="projects-section">
      <div className="section-header">
        <h2>My Projects</h2>
        <button className="add-project-btn">+ New Project</button>
      </div>
      
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-title">
                <Briefcase className="project-icon" />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.client}</p>
                </div>
              </div>
              <button className="project-actions">
                <MoreVertical />
              </button>
            </div>
            <div className="project-details">
              <div className="project-status">
                <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
                <span className="project-deadline">
                  Deadline: {project.deadline}
                </span>
              </div>
              <div className="project-progress">
                <div className="progress-info">
                  <span>Project Budget</span>
                  <span>${project.budget}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{width: `${project.progress}%`}}
                  ></div>
                </div>
                <span className="progress-percentage">{project.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;