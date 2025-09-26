import React, { useState, useEffect } from 'react';
import './Investor.css';

const Investor = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [likedProjects, setLikedProjects] = useState([]);
  const projects = [
    { id: 1, name: 'Proje 1', details: 'Bu proje bir e-ticaret platformudur. Daha fazla bilgi: Bu platform, kullanıcıların ürün alıp satmasına olanak tanır ve güvenli ödeme sistemleri sunar.' },
    { id: 2, name: 'Proje 2', details: 'Bu proje bir sosyal medya uygulamasıdır. Daha fazla bilgi: Kullanıcılar fotoğraf paylaşabilir, arkadaş ekleyebilir ve mesajlaşabilir.' },
    { id: 3, name: 'Proje 3', details: 'Bu proje bir yapay zeka destekli araçtır. Daha fazla bilgi: Bu araç, kullanıcıların verilerini analiz ederek akıllı öneriler sunar.' },
  ];

  useEffect(() => {
    const storedLikedProjects = JSON.parse(localStorage.getItem('likedProjects')) || [];
    setLikedProjects(storedLikedProjects);
  }, []);

  const handleLike = () => {
    const likedProject = projects[currentProject];
    if (likedProjects.some((project) => project.id === likedProject.id)) {
      nextProject();
      return;
    }
    const updatedLikedProjects = [...likedProjects, likedProject];
    setLikedProjects(updatedLikedProjects);
    localStorage.setItem('likedProjects', JSON.stringify(updatedLikedProjects));
    nextProject();
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const clearLikedProjects = () => {
    setLikedProjects([]);
    localStorage.removeItem('likedProjects');
  };

  return (
    <div className="investor-container">
      <div className="liked-projects">
        <h3>Beğenilen Projeler</h3>
        <button onClick={clearLikedProjects}>Beğenilenleri Temizle</button>
        <ul>
          {likedProjects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <div className="project-card">
          <div className="project-card-right">
            <h2>{projects[currentProject].name}</h2>
            <div className="project-details">
              <p>{projects[currentProject].details}</p>
            </div>
          </div>

          <div className="buttons">
            <button className="action-button skip-button" onClick={nextProject}>Geç</button>
            <button className="action-button like-button" onClick={handleLike}>Beğen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investor;