document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });

  const toggle = document.getElementById('theme-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    toggle.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌙';
    } else {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '☀️';
    }
  });

  // Modal functionality for technology tags
  const modal = document.getElementById('tech-modal');
  const modalTitle = document.getElementById('tech-modal-title');
  const modalDescription = document.getElementById('tech-modal-description');
  const modalDoc = document.getElementById('tech-modal-doc');
  const modalSite = document.getElementById('tech-modal-site');
  const closeModal = document.querySelector('.tech-modal-close');

  // Technology definitions and links
  const techData = {
    neo4j: {
      title: 'Neo4J',
      description: 'Neo4j est une base de données orientée graphe NoSQL qui utilise des nœuds, des relations et des propriétés pour représenter et stocker les données. Elle est particulièrement efficace pour les données hautement connectées et les requêtes complexes de traversée de graphe.',
      doc: 'https://neo4j.com/docs/',
      site: 'https://neo4j.com/'
    },
    nodejs: {
      title: 'Node.js',
      description: 'Node.js est un environnement d\'exécution JavaScript côté serveur construit sur le moteur V8 de Chrome. Il permet de développer des applications web scalables et performantes en utilisant JavaScript pour le backend.',
      doc: 'https://nodejs.org/docs/',
      site: 'https://nodejs.org/'
    },
    apirest: {
      title: 'API REST',
      description: 'REST (Representational State Transfer) est un style d\'architecture pour les services web qui utilise les méthodes HTTP standard (GET, POST, PUT, DELETE) pour créer des APIs simples, scalables et sans état.',
      doc: 'https://restfulapi.net/',
      site: 'https://developer.mozilla.org/fr/docs/Glossary/REST'
    },
    d3js: {
      title: 'D3.js',
      description: 'D3.js (Data-Driven Documents) est une bibliothèque JavaScript pour créer des visualisations de données dynamiques et interactives dans les navigateurs web en utilisant SVG, HTML et CSS.',
      doc: 'https://d3js.org/getting-started',
      site: 'https://d3js.org/'
    },
    postman: {
      title: 'Postman',
      description: 'Postman est une plateforme de collaboration pour le développement d\'API qui simplifie chaque étape de la création d\'une API et rationalise la collaboration pour créer de meilleures APIs plus rapidement.',
      doc: 'https://learning.postman.com/docs/',
      site: 'https://www.postman.com/'
    },
    html: {
      title: 'HTML',
      description: 'HTML (HyperText Markup Language) est le langage de balisage standard pour créer des pages web. Il décrit la structure d\'une page web en utilisant des éléments et des balises.',
      doc: 'https://developer.mozilla.org/fr/docs/Web/HTML',
      site: 'https://html.spec.whatwg.org/'
    },
    css: {
      title: 'CSS',
      description: 'CSS (Cascading Style Sheets) est un langage de feuille de style utilisé pour décrire la présentation d\'un document écrit en HTML ou XML, incluant les couleurs, la mise en page et les polices.',
      doc: 'https://developer.mozilla.org/fr/docs/Web/CSS',
      site: 'https://www.w3.org/Style/CSS/'
    },
    javascript: {
      title: 'JavaScript',
      description: 'JavaScript est un langage de programmation de haut niveau, interprété et orienté objet. Il est principalement utilisé pour créer des pages web interactives et des applications web dynamiques.',
      doc: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
      site: 'https://www.ecma-international.org/publications-and-standards/standards/ecma-262/'
    },
    responsive: {
      title: 'Responsive Design',
      description: 'Le Responsive Design est une approche de conception web qui permet aux pages web de s\'adapter automatiquement à différentes tailles d\'écran et orientations d\'appareils.',
      doc: 'https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Responsive_Design',
      site: 'https://web.dev/responsive-web-design-basics/'
    },
    uxui: {
      title: 'UX/UI Design',
      description: 'UX (User Experience) et UI (User Interface) Design se concentrent sur la création d\'interfaces utilisateur intuitives, accessibles et esthétiquement plaisantes pour améliorer l\'expérience utilisateur.',
      doc: 'https://www.interaction-design.org/',
      site: 'https://uxdesign.cc/'
    },
    python: {
      title: 'Python',
      description: 'Python est un langage de programmation de haut niveau, interprété et polyvalent. Il est largement utilisé en science des données, intelligence artificielle, développement web et automatisation.',
      doc: 'https://docs.python.org/',
      site: 'https://www.python.org/'
    },
    sklearn: {
      title: 'scikit-learn',
      description: 'Scikit-learn est une bibliothèque Python gratuite pour l\'apprentissage automatique. Elle propose des outils simples et efficaces pour l\'analyse de données et l\'exploration de données.',
      doc: 'https://scikit-learn.org/stable/user_guide.html',
      site: 'https://scikit-learn.org/'
    },
    pandas: {
      title: 'pandas',
      description: 'Pandas est une bibliothèque Python qui fournit des structures de données et des outils d\'analyse de données hautes performances et faciles à utiliser.',
      doc: 'https://pandas.pydata.org/docs/',
      site: 'https://pandas.pydata.org/'
    },
    matplotlib: {
      title: 'matplotlib',
      description: 'Matplotlib est une bibliothèque Python pour créer des visualisations statiques, animées et interactives. Elle est largement utilisée pour la création de graphiques en science des données.',
      doc: 'https://matplotlib.org/stable/users/index.html',
      site: 'https://matplotlib.org/'
    },
    ml: {
      title: 'Machine Learning',
      description: 'Le Machine Learning est une branche de l\'intelligence artificielle qui permet aux ordinateurs d\'apprendre et de prendre des décisions à partir de données sans être explicitement programmés.',
      doc: 'https://scikit-learn.org/stable/tutorial/index.html',
      site: 'https://www.coursera.org/learn/machine-learning'
    },
    java: {
      title: 'Java',
      description: 'Java est un langage de programmation orienté objet, portable et robuste. Il est largement utilisé pour le développement d\'applications d\'entreprise, d\'applications mobiles Android et de systèmes distribués.',
      doc: 'https://docs.oracle.com/en/java/',
      site: 'https://www.oracle.com/java/'
    },
    spring: {
      title: 'Spring Boot',
      description: 'Spring Boot est un framework Java qui simplifie le développement d\'applications Spring en fournissant une configuration automatique et des conventions par défaut.',
      doc: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/',
      site: 'https://spring.io/projects/spring-boot'
    },
    postgresql: {
      title: 'PostgreSQL',
      description: 'PostgreSQL est un système de gestion de base de données relationnelle-objet open source, réputé pour sa fiabilité, sa robustesse et ses performances.',
      doc: 'https://www.postgresql.org/docs/',
      site: 'https://www.postgresql.org/'
    }
  };

  // Add click event listeners to all skill tags and tech links
  document.querySelectorAll('.skill-tag, .tech-link').forEach(element => {
    element.addEventListener('click', (e) => {
      const techKey = e.target.getAttribute('data-tech');
      const tech = techData[techKey];
      
      if (tech) {
        modalTitle.textContent = tech.title;
        modalDescription.textContent = tech.description;
        modalDoc.href = tech.doc;
        modalSite.href = tech.site;
        modal.style.display = 'block';
      }
    });
  });

  // Close modal events
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });

  // Contact form functionality
  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Show loading state
    btnText.textContent = 'Envoi en cours...';
    btnIcon.textContent = '⏳';
    submitBtn.disabled = true;
    
    // Create email content
    const emailSubject = `Portfolio Contact: ${subject}`;
    const emailBody = `Bonjour Carol,

Vous avez reçu un nouveau message depuis votre portfolio :

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis votre portfolio.`;
    
    // Create mailto link
    const mailtoLink = `mailto:carol.v.gallegos@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Simulate sending delay for better UX
    setTimeout(() => {
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success state
      btnText.textContent = 'Message envoyé! 🎉';
      btnIcon.textContent = '✅';
      
      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        btnText.textContent = 'Envoyer le message';
        btnIcon.textContent = '🚀';
        submitBtn.disabled = false;
        
        // Show thank you message
        showNotification('Merci pour votre message! Votre client email va s\'ouvrir.', 'success');
      }, 2000);
    }, 1000);
  });

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
      <span class="notification-text">${message}</span>
      <button class="notification-close">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
  }

  // Add floating animation to form inputs
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });

  // Code copy functionality
  document.querySelectorAll('.code-copy').forEach(copyBtn => {
    copyBtn.addEventListener('click', () => {
      const codeContent = copyBtn.closest('.code-block').querySelector('.code-content');
      const codeText = codeContent.textContent || codeContent.innerText;
      
      // Clean up the code text (remove extra spaces and format properly)
      const cleanCode = codeText
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/;\s*/g, ';\n  ')
        .replace(/}\s*/g, '\n}\n')
        .replace(/\n\s*\n/g, '\n')
        .trim();
      
      navigator.clipboard.writeText(cleanCode).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copié!';
        copyBtn.style.color = '#4caf50';
        
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = '#81c784';
        }, 2000);
        
        showNotification('Code copié dans le presse-papiers!', 'success');
      }).catch(() => {
        showNotification('Erreur lors de la copie du code', 'error');
      });
    });
  });

  // Funcionalidad CV
  const viewCvBtn = document.getElementById('view-cv-btn');
  const downloadCvBtn = document.getElementById('download-cv-btn');

  if (viewCvBtn) {
    viewCvBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Abrir el CV en una nueva pestaña
      window.open('img/Minimalist Modern Professional CV Resume (1).pdf', '_blank');
      showNotification('📄 CV ouvert dans un nouvel onglet!', 'success');
    });
  }

  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Crear un enlace temporal para descargar
      const link = document.createElement('a');
      link.href = 'img/Minimalist Modern Professional CV Resume (1).pdf';
      link.download = 'CV_Carol_Gallegos_Professional.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification('📥 CV téléchargé avec succès!', 'success');
    });
  }

  // Corazoncito que cambia entre corazón y estrellita
  const bouncingHeart = document.querySelector('.bouncing-heart');
  if (bouncingHeart) {
    const emojis = ['💖', '✨', '💕', '🌸'];
    let currentEmoji = 0;
    
    setInterval(() => {
      currentEmoji = (currentEmoji + 1) % emojis.length;
      bouncingHeart.textContent = emojis[currentEmoji];
      bouncingHeart.style.transform = 'scale(1.2)';
      setTimeout(() => {
        bouncingHeart.style.transform = 'scale(1)';
      }, 300);
    }, 6000);
  }
}); 