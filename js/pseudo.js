document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        let pseudo = document.getElementById("pseudo").value.trim();
        let age = parseInt(document.getElementById("age").value);
        let genre = document.getElementById("genre").value;
        let message = document.getElementById("message");

        if (!pseudo || isNaN(age) || genre === "") {
            if(message) {
                message.innerHTML = "Veuillez entrer un pseudo, un âge valide et sélectionner un genre.";
                message.style.color = "red";
            } else {
                alert("Veuillez entrer un pseudo, un âge valide et sélectionner un genre.");
            }
            return;
        }

        if (age < 10 || age > 100) {
            if(message) {
                message.innerHTML = "L'âge doit être entre 10 et 100 ans.";
                message.style.color = "red";
            } else {
                alert("L'âge doit être entre 10 et 100 ans.");
            }
            return;
        }

        // Stockage dans localStorage
        localStorage.setItem("pseudo", pseudo);
        localStorage.setItem("age", age.toString());
        localStorage.setItem("genre", genre);

        // Redirection vers la deuxième page
        window.location.href = "testcss.html";
    });
});
