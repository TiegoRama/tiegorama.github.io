document.addEventListener('DOMContentLoaded', function() {
  // Variable globale pour suivre l'état des articles
  let showingCustomArticles = true; // Modifié à true pour afficher les articles personnalisés par défaut
  
  // Fonction pour charger les articles RSS - rendue globale au scope
  function loadRssFeeds() {
    const feedContainer = document.getElementById('rss-feed-container');
    
    // URL des flux RSS à suivre
    const feedUrls = [
      'https://developer.nvidia.com/blog/tag/dlss/rss',
      'https://community.amd.com/sdtpp67534/rss/board?board.id=gaming-blogs'
    ];
    
    // Utilisation d'un proxy CORS pour pouvoir accéder aux flux RSS
    const corsProxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    // Limiter le nombre d'articles à afficher
    const maxArticles = 6;
    let articlesLoaded = 0;
    
    // Afficher un message de chargement
    feedContainer.innerHTML = '<div class="loading-msg">Chargement des articles...</div>';
    
    // Pour chaque flux RSS
    feedUrls.forEach(url => {
      fetch(corsProxy + encodeURIComponent(url))
        .then(response => response.json())
        .then(data => {
          // Supprimer le message de chargement
          const loadingMsg = document.querySelector('.loading-msg');
          if (loadingMsg) loadingMsg.remove();
          
          // Si le flux a été correctement chargé
          if (data.status === 'ok') {
            // Pour chaque article dans le flux
            data.items.slice(0, 2).forEach(item => {
              if (articlesLoaded < maxArticles) {
                // Créer un élément pour l'article
                const articleElement = document.createElement('div');
                articleElement.className = 'rss-article';
                
                // Formater la date
                const pubDate = new Date(item.pubDate);
                const formattedDate = pubDate.toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
                
                // Limiter la description à 150 caractères
                let description = item.description
                  .replace(/<[^>]*>/g, '') // Supprimer les balises HTML
                  .substring(0, 150); // Limiter à 150 caractères
                
                if (description.length === 150) {
                  description += '...';
                }
                
                // Remplir l'élément avec les informations de l'article
                articleElement.innerHTML = `
                  <h4>${item.title}</h4>
                  <p class="rss-date">${formattedDate} - ${data.feed.title}</p>
                  <p class="rss-description">${description}</p>
                  <a href="${item.link}" target="_blank" class="rss-link">Lire l'article <i class="fas fa-external-link-alt"></i></a>
                `;
                
                // Ajouter l'élément au conteneur
                feedContainer.appendChild(articleElement);
                articlesLoaded++;
              }
            });
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement du flux RSS:', error);
          
          // Afficher un message d'erreur si aucun flux n'a pu être chargé
          if (feedContainer.children.length === 0 || feedContainer.children[0].className === 'loading-msg') {
            feedContainer.innerHTML = '<p>Impossible de charger les articles. Veuillez réessayer plus tard.</p>';
          }
        });
    });
  }
  
  // Articles personnalisés
  const articlesPersonnalises = [
    {
      title: "NVIDIA DLSS 4 introduit la génération multi-images et des améliorations pour toutes les technologies DLSS",
      date: "6 Janvier, 2025",
      source: "NVIDIA",
      description: "​NVIDIA a récemment annoncé DLSS 4, une avancée majeure de sa technologie Deep Learning Super Sampling, introduisant la génération multi-images (Multi Frame Generation) pour les GPU GeForce RTX série 50.",
      link: "https://www.nvidia.com/en-us/geforce/news/dlss4-multi-frame-generation-ai-innovations/" // ou créez une page dédiée pour cet article
    },
    {
      title: "AMD détaille son FSR 4 : une mise à niveau au bon goût d'IA !",
      date: "1 Mars, 2025",
      source: "Hardwareand",
      description: "AMD a récemment annoncé des mises à jour majeures de ses technologies graphiques, notamment l'introduction de FidelityFX Super Resolution 4 (FSR 4) et Fluid Motion Frames 2 (AFMF 2).",
      link: "https://hardwareand.co/actualites/longues/amd-detaille-son-fsr-4-une-mise-a-niveau-au-bon-gout-d-ia"
    },
    {
      title: "Intel déploie le XeSS 2 pour les développeurs",
      date: "24 mars 2025",
      source: "IGN",
      description: "Intel a récemment publié le SDK de sa technologie XeSS 2, un ensemble d'outils désormais disponible pour les développeurs afin de faciliter son intégration dans les jeux PC. Cette nouvelle version regroupe trois briques essentielles : XeSS Super Resolution, XeSS Frame Generation, et Xe Low Latency, toutes boostées par l'intelligence artificielle.",
      link: "https://fr.ign.com/intel-xess-2/74993/news/intel-deploie-le-xess-2-pour-les-developpeurs"
    },
    {
      title: "Microsoft va intégrer l'upscaling par IA directement dans DirectX",
      date: "1 mars 2024",
      source: "Usine digitale",
      description: "Microsoft a développé une nouvelle interface, intitulée DirectSR, pour intégrer l'upscaling par intelligence artificielle dans les prochains jeux vidéo sur PC. Avec cette technologie d'upscaling en Super Resolution, la définition et la qualité visuelle des jeux seront augmentées. L'objectif de cette nouvelle API : venir en soutien des développeurs pour l'intégration des différentes technologies de Nvidia, AMD et Intel.",
      link: "https://www.usine-digitale.fr/article/microsoft-devoile-une-api-pour-aider-les-developpeurs-a-ameliorer-la-qualite-visuelle-des-jeux-video.N2209230"
    },
    {
      title: "Temporal Super Resolution",
      date: "~ 2022",
      source: "Epic Games",
      description: "Temporal Super Resolution (TSR) est un upscaler temporel indépendant de la plateforme qui permet à Unreal Engine de restituer de magnifiques images 4K. Le coût des images est bien inférieur grâce à l'amortissement d'une partie des calculs de rendu coûteux sur plusieurs images. TSR y parvient en affichant une résolution interne inférieure à celle du suréchantillonnage anti-aliasing temporel (TAAU) d'Unreal Engine 4.",
      link: "https://dev.epicgames.com/documentation/fr-fr/unreal-engine/temporal-super-resolution-in-unreal-engine"
    },
    {
      title: "Augmentation de la résolution dans URP avec post-traitement spatio-temporel",
      date: "~ 2024",
      source: "Unity",
      description: "Ressources sur l'utilisation du post-traitement spatio-temporel (STP) dans le pipeline de rendu universel (URP) pour améliorer la résolution.",
      link: "https://docs.unity3d.com/Manual/urp/change-resolution-scale-urp.html" 
    },
    {
      title: "Qu'est-ce que la génération de trames multiples DLSS ?",
      date: "1 Janvier, 2025",
      source: "Corsair",
      description: "DLSS Multi Frame Generation est la killer app des GPU Nvidia RTX de la série 50, car elle a le potentiel d'augmenter considérablement les performances dans les jeux pris en charge et est exclusive à la série RTX 50. Il s'agit de la deuxième génération de la technologie de génération de trame de la société, lancée initialement avec la série RTX 40 en 2022. Cette technologie, appelée DLSS Frame Generation, a été améliorée pour les nouveaux GPU de Nvidia, et la nouvelle version s'appelle DLSS Multi Frame Generation.",
      link: "https://www.corsair.com/us/fr/explorer/gamer/gaming-pcs/what-is-dlss-multi-frame-generation/" 
    },
    {
      title: "Game-Changing Updates: FSR 4, AFMF 2.1, AI-Powered Features & More!",
      date: "6 Mars, 2025",
      source: "AMD",
      description: "AMD Fluid Motion Frames1, ou AFMF, est une technologie de génération d'images conçue pour accélérer le rafraîchissement d'images et la fluidité afin d'obtenir des performances de gaming exceptionnelles. AFMF intègre une technologie de génération d'images de pointe directement à l'application AMD Software: Adrenalin Edition™. Mieux encore, AFMF est inclus dans AMD HYPR-RX2. Il suffit donc aux joueurs d'activer HYPR-RX pour obtenir automatiquement des fonctionnalités axées sur les performances, qui permettront d'améliorer les FPS et la réactivité.",
      link: "https://community.amd.com/t5/gaming/game-changing-updates-fsr-4-afmf-2-1-ai-powered-features-amp/ba-p/748504"
    }
  ];

  // Fonction pour ajouter des articles personnalisés
  function afficherArticlesPersonnalises() {
    const feedContainer = document.getElementById('rss-feed-container');
    
    // On vide le conteneur existant
    feedContainer.innerHTML = '';
    
    // Ajout des articles personnalisés
    articlesPersonnalises.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.className = 'rss-article';
      
      articleElement.innerHTML = `
        <h4>${article.title}</h4>
        <p class="rss-date">${article.date} - ${article.source}</p>
        <p class="rss-description">${article.description}</p>
        <a href="${article.link}" target="_blank" class="rss-link">Lire l'article <i class="fas fa-external-link-alt"></i></a>
      `;
      
      feedContainer.appendChild(articleElement);
    });
  }
  
  // Afficher les articles personnalisés par défaut au chargement de la page
  afficherArticlesPersonnalises();
  
  // Ajouter un bouton pour rafraîchir les flux
  const refreshButton = document.getElementById('refresh-rss');
  if (refreshButton) {
    refreshButton.addEventListener('click', function() {
      if (!showingCustomArticles) {
        // Ne rafraîchir que si on affiche les articles RSS
        const feedContainer = document.getElementById('rss-feed-container');
        feedContainer.innerHTML = ''; // Vider le conteneur
        loadRssFeeds(); // Recharger les flux
      }
    });
  }
  
  // Ajouter un bouton pour basculer entre les articles RSS et les articles personnalisés
  const rssHeader = document.querySelector('.rss-header');
  if (rssHeader) {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-btn';
    toggleButton.innerHTML = '<i class="fas fa-exchange-alt"></i> Voir les articles RSS';  // Texte modifié
    
    rssHeader.appendChild(toggleButton);
    
    // Gestionnaire d'événement pour le bouton de bascule
    toggleButton.addEventListener('click', function() {
      if (showingCustomArticles) {
        // Si on affiche déjà les articles personnalisés, on passe aux articles RSS
        loadRssFeeds();
        this.innerHTML = '<i class="fas fa-exchange-alt"></i> Voir mes articles';
      } else {
        // Sinon, on affiche les articles personnalisés
        afficherArticlesPersonnalises();
        this.innerHTML = '<i class="fas fa-exchange-alt"></i> Voir les articles RSS';
      }
      
      // Inverser l'état
      showingCustomArticles = !showingCustomArticles;
    });
  }
});

// Code pour gérer le popup de veille technologique
document.addEventListener('DOMContentLoaded', function() {
// Sélection des éléments
const voirPlusDLSS = document.getElementById('voir-plus-dlss');
const veillePopup = document.getElementById('veille-popup');
const closePopup = document.querySelector('.close-popup');

// Afficher le popup quand on clique sur "Voir la synthèse"
if (voirPlusDLSS) {
  voirPlusDLSS.addEventListener('click', function(e) {
    e.preventDefault();
    veillePopup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
  });
}

// Fermer le popup quand on clique sur la croix
if (closePopup) {
  closePopup.addEventListener('click', function() {
    veillePopup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Rétablir le défilement
  });
}

// Fermer le popup quand on clique en dehors du contenu
window.addEventListener('click', function(e) {
  if (e.target === veillePopup) {
    veillePopup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Bouton de retour en haut de page
const scrollTopBtn = document.getElementById('scroll-top-btn');

if (scrollTopBtn) {
  // Afficher le bouton quand on descend la page
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // Remonter en haut de page quand on clique sur le bouton
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
});

// Code pour gérer les popups des stages
document.addEventListener('DOMContentLoaded', function() {
// Fonction pour déterminer l'icône en fonction du type de document
function getDocumentIcon(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  
  switch(extension) {
    case 'docx':
    case 'doc':
      return 'fa-file-word';
    case 'pdf':
      return 'fa-file-pdf';
    case 'xlsx':
    case 'xls':
      return 'fa-file-excel';
    case 'pptx':
    case 'ppt':
      return 'fa-file-powerpoint';
    case 'txt':
      return 'fa-file-alt';
    default:
      return 'fa-file';
  }
}
// Sélection des éléments pour chaque stage
const stageCards = document.querySelectorAll('.stage-card');
const stagePopup = document.getElementById('stage-popup');
const stagePopupContent = document.querySelector('.stage-popup-content');
const closeStagePopup = document.querySelector('.close-stage-popup');

// Contenu détaillé de chaque stage
const stagesDetails = {
  "casden": {
    title: "Stage chez Casden",
    periode: "Mai 2024 - Juin 2024",
    description: "Stage de première année effectué au sein de la banque coopérative Casden, spécialisée dans les services aux fonctionnaires et agents du secteur public",
    missions: [
     " Création de protocole", 
     "Déploiement d'application", 
     "Test de ligne téléphonique et de détecteur de chute",
     "Création et modification de script en python."
    ],
    competences: [,
      "Documentation technique",
      "Tests fonctionnels"
    ],
    images: [
      {
        path: "images/casden-screenshot1.jpg",
        title: "Script Python optimisé pour envoie de mails automatiques"
      },
      {
        path: "images/serveur ping dns.jpg",
        title: "Script pour tester le ping de serveurs dns en lisant un fichier CSV"
      },

      {path: "images/Serveur Ping.jpg",
        title: "Script pour tester le ping de serveurs en lisant un fichier CSV"

      }
    ],
    documents: [
      {
        name: "Boite genesys - Procédure création.docx",
        path: "documents/Boite genesys - Procédure création.docx",
        description: "Procédure de création de boîtes Genesys pour les utilisateurs internes."
      }
    ],
    conclusion: "Ce stage m'a permis de découvrir l'environnement bancaire et ses contraintes spécifiques en matière de sécurité informatique."
  },
  "weeklytech": {
    title: "Stage chez WeeklyTech",
    periode: "Janvier 2025 - Février 2025",
    description: "Stage de deuxième année réalisé chez WeeklyTech, une startup spécialisée dans le développement d'applications de suivi et de gestion de projets.",
    missions: [
      "Développement d'une application en Java/JavaFX pour la gestion de projets",
    ],
    competences: [
      "Java/JavaFX"
    ],
    images: [
      {
        path: "images/launcher.jpg",
        title: "Launcher minecraft"
      },
      {
        path: "images/weeklytech-screenshot2.jpg",
        title: "Écran de gestion des tâches"
      }
    ],
    conclusion: "Ce stage m'a permis d'approfondir mes compétences en développement Java et de découvrir le framework JavaFX."
  }
};

// Ajouter un gestionnaire d'événements à chaque carte de stage
stageCards.forEach(card => {
  const stageName = card.querySelector('h3').textContent.toLowerCase();
  
  // Créer un bouton "Voir détails" dans chaque carte
  const detailsButton = document.createElement('a');
  detailsButton.href = "#";
  detailsButton.className = "btn-projet voir-stage-details";
  detailsButton.innerHTML = '<i class="fas fa-info-circle"></i> Voir détails';
  card.appendChild(detailsButton);
  
  // Ajouter un gestionnaire d'événements au bouton
  detailsButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Récupérer les détails du stage
    const details = stagesDetails[stageName] || stagesDetails["casden"]; // Fallback au cas où
    
    // Construire le contenu de la popup
    let popupHTML = `
      <h2>${details.title}</h2>
      <p class="stage-periode">${details.periode}</p>
      <div class="stage-description">${details.description}</div>
      
      <div class="stage-section">
        <h3>Missions</h3>
        <ul class="stage-list">
          ${details.missions.map(mission => `<li>${mission}</li>`).join('')}
        </ul>
      </div>
      
      <div class="stage-section">
        <h3>Compétences développées</h3>
        <div class="stage-competences">
          ${details.competences.map(comp => `<span class="competence-tag">${comp}</span>`).join('')}
        </div>
      </div>
    `;
    
    // Ajouter les captures d'écran si disponibles
    if (details.images && details.images.length > 0) {
      popupHTML += `
        <div class="stage-section">
          <h3>Captures d'écran</h3>
          <div class="stage-gallery">
            ${details.images.map(img => 
              `<div class="stage-image">
                <div class="image-title">${img.title || 'Capture d\'écran'}</div>
                <img src="${img.path || img}" alt="${img.title || 'Capture d\'écran du stage'}" onerror="this.src='/api/placeholder/500/300'; this.classList.add('placeholder-img');">
              </div>`
            ).join('')}
          </div>
        </div>
      `;
    }
    
    // Ajouter les documents téléchargeables si disponibles
    if (details.documents && details.documents.length > 0) {
      popupHTML += `
        <div class="stage-section">
          <h3>Documents</h3>
          <div class="stage-documents">
            ${details.documents.map(doc => 
              `<div class="document-item">
                <i class="fas ${getDocumentIcon(doc.name)}"></i>
                <span class="document-name">${doc.name}</span>
                <span class="document-description">${doc.description}</span>
                <a href="${doc.path}" download class="btn-projet document-download">
                  <i class="fas fa-download"></i> Télécharger
                </a>
              </div>`
            ).join('')}
          </div>
        </div>
      `;
    }
    
    // Ajouter la conclusion
    if (details.conclusion) {
      popupHTML += `
        <div class="stage-section">
          <h3>Bilan du stage</h3>
          <p class="stage-conclusion">${details.conclusion}</p>
        </div>
      `;
    }
    
    // Mettre à jour le contenu de la popup
    stagePopupContent.innerHTML = popupHTML;
    
    // Ajouter le bouton de fermeture au contenu
    const closeButton = document.createElement('span');
    closeButton.className = "close-stage-popup";
    closeButton.innerHTML = "&times;";
    stagePopupContent.insertBefore(closeButton, stagePopupContent.firstChild);
    
    // Ajouter le gestionnaire d'événements au bouton de fermeture
    closeButton.addEventListener('click', function() {
      stagePopup.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Afficher la popup
    stagePopup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
  });
});

// Fermer la popup quand on clique en dehors du contenu
window.addEventListener('click', function(e) {
  if (e.target === stagePopup) {
    stagePopup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
});