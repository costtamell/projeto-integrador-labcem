function selecionar(nome) {
    localStorage.setItem("ambiente", nome);

    if (nome === "Tablets") {
        alert("✅ DEU CERTO! Você selecionou TABLETS.");

        window.location.href = "materias.html";
    } else {
        window.location.href = "materias.html";
    }
}

    