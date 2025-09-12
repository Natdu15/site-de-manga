let sexChartInstance = null;

// Charger les données depuis l'API
async function chargerVotes() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} : impossible de charger les résultats.`);
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('Les données JSON ne sont pas valides ou vides');
    }
    afficherStatistiques(data);
  } catch (error) {
    console.error('Erreur de chargement des votes :', error.message);
    const container = document.getElementById('statistiques-container');
    if (container) {
      container.innerHTML = `<p style="color: #FF6384;">Erreur : ${error.message}</p>`;
    }
  }
}

// Traiter et afficher les statistiques
function afficherStatistiques(data) {
  const container = document.getElementById('statistiques-container');
  if (!container) {
    console.error('Conteneur statistiques-container introuvable');
    return;
  }

  // Initialiser les compteurs
  const sexes = { Homme: 0, Femme: 0 };
  let sommeAges = 0;
  let nbAges = 0;
  const votesManga = {};
  const votesAnime = {};
  const votesPersonnage = {};

  // Traiter les données
  data.forEach(entry => {
    const d = entry.details || {};

    // Compter les sexes
    if (d.Sexe === 'Homme') sexes.Homme++;
    else if (d.Sexe === 'Femme') sexes.Femme++;

    // Calculer l'âge moyen
    const age = parseInt(d.Age, 10);
    if (!isNaN(age) && age > 0) {
      sommeAges += age;
      nbAges++;
    }

    // Compter les votes pour Manga
    if (d.Manga && d.Manga.Titre && d.Manga.Cat) {
      votesManga[d.Manga.Titre] = (votesManga[d.Manga.Titre] || 0) + 1;
    }

    // Compter les votes pour Anime
    if (d.Anime && d.Anime.Titre && d.Anime.Cat) {
      votesAnime[d.Anime.Titre] = (votesAnime[d.Anime.Titre] || 0) + 1;
    }

    // Compter les votes pour Personnage
    if (d.Personnage && d.Personnage.Nom && d.Personnage.Cat) {
      votesPersonnage[d.Personnage.Nom] = (votesPersonnage[d.Personnage.Nom] || 0) + 1;
    }
  });

  // Afficher l'âge moyen
  const ageMoyenElem = document.getElementById('ageMoyen');
  if (ageMoyenElem) {
    const ageMoyen = nbAges > 0 ? (sommeAges / nbAges).toFixed(1) : 'N/A';
    ageMoyenElem.textContent = `Âge moyen des votants : ${ageMoyen} ans`;
  }

  // Mettre à jour le graphique des sexes
  updateSexChart(sexes);

  // Afficher les podiums
  afficherPodium('podiumManga', votesManga, 'Manga');
  afficherPodium('podiumAnime', votesAnime, 'Anime');
  afficherPodium('podiumPersonnage', votesPersonnage, 'Personnage');
}

// Mettre à jour le graphique des sexes
function updateSexChart(sexes) {
  const ctx = document.getElementById('sexChart');
  if (!ctx) {
    console.error('Canvas sexChart introuvable');
    return;
  }

  if (sexChartInstance) sexChartInstance.destroy();

  sexChartInstance = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(sexes),
      datasets: [{
        label: 'Votes par sexe',
        data: Object.values(sexes),
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: '#fff',
        borderWidth: 1
      }]
    },
    options: {
      plugins: { legend: { position: 'top' } },
      responsive: true
    }
  });
}

// Afficher un podium pour un type donné
function afficherPodium(containerId, votesObj, type) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Conteneur ${containerId} introuvable`);
    return;
  }

  const top3 = Object.entries(votesObj).sort((a, b) => b[1] - a[1]).slice(0, 3);

  container.innerHTML = '';
  if (top3.length === 0) {
    container.innerHTML = `<p style="color: #FF6384;">Aucun vote enregistré pour ${type}.</p>`;
    return;
  }

  const medals = ['#FFD700', '#C0C0C0', '#CD7F32'];

  top3.forEach(([nom, nb], i) => {
    const div = document.createElement('div');
    div.classList.add('podium-place');
    div.style.borderLeft = `8px solid ${medals[i]}`;
    div.style.marginBottom = '10px';
    div.style.padding = '10px';
    div.style.backgroundColor = '#222';
    div.style.borderRadius = '8px';
    div.style.color = medals[i];
    div.style.fontWeight = 'bold';
    div.style.fontSize = i === 0 ? '1.5rem' : '1.2rem';
    div.textContent = `${i + 1} — ${nom} (${nb} vote${nb > 1 ? 's' : ''})`;
    container.appendChild(div);
  });
}

// Charger les statistiques au démarrage
window.onload = chargerVotes;
// Commenté pour éviter des requêtes excessives sur Glitch
// setInterval(chargerVotes, 5000);