// =======================
// Chargement du JSON
// =======================
fetch("RESULTATS.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur de chargement du fichier JSON : " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log("Données récupérées :", data);
    afficherGraphiques(data);
  })
  .catch(error => {
    console.error("Problème :", error);
    const container = document.getElementById("graph-container");
    if (container) {
      container.innerHTML = "<p style='color:red;'>Impossible de charger les résultats.</p>";
    }
  });

// =======================
// Fonction d'affichage
// =======================
function afficherGraphiques(data) {
  const container = document.getElementById("graph-container");
  if (!container) {
    console.error("⚠️ Aucun élément #graph-container trouvé dans le HTML.");
    return;
  }

  // Nettoyage avant affichage
  container.innerHTML = "";

  // Exemple : si ton JSON a la forme { "labels": [...], "values": [...] }
  if (data.labels && data.values) {
    const canvas = document.createElement("canvas");
    canvas.id = "graph1";
    container.appendChild(canvas);

    new Chart(canvas, {
      type: "bar", // tu peux mettre "line", "pie", etc.
      data: {
        labels: data.labels,
        datasets: [{
          label: "Résultats",
          data: data.values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    container.innerHTML = "<p style='color:orange;'>⚠️ Le fichier RESULTATS.json n'a pas le bon format.</p>";
  }
}
