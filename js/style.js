// Fonction pour masquer / afficher le sommaire
document.getElementById("toggle-btn").addEventListener("click", function() {
    const menu = document.querySelector(".sommaire2");
    if (menu.style.display === "none") {
        menu.style.display = "block";
        this.textContent = "masquer";
    } else {
        menu.style.display = "none";
        this.textContent = "afficher";
    }
});

function validerInfos() {
    let pseudo = document.getElementById("pseudo").value.trim();
    let age = document.getElementById("age").value.trim();
    let sexe = document.getElementById("sexe").value;

    if (pseudo === "" || age === "" || sexe === "") {
        alert("Veuillez remplir tous les champs !");
    } else {
        localStorage.setItem("pseudo", pseudo);
        localStorage.setItem("age", age);
        localStorage.setItem("sexe", sexe);
        alert("Informations enregistrées ! Cliquez sur 'Jouer maintenant'.");
    }
}

function remplirInfos() {
    if (localStorage.getItem("pseudo")) {
        document.getElementById("pseudo").value = localStorage.getItem("pseudo");
    }
    if (localStorage.getItem("age")) {
        document.getElementById("age").value = localStorage.getItem("age");
    }
    if (localStorage.getItem("sexe")) {
        document.getElementById("sexe").value = localStorage.getItem("sexe");
    }
}



