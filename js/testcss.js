document.addEventListener("DOMContentLoaded", function() {
    let pseudo = localStorage.getItem("pseudo");

    if (!pseudo) {
        window.location.href = "pseudo.html"; // Redirige si aucun pseudo
    }

    document.getElementById("afficherPseudo").textContent = pseudo;
});
