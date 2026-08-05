async function carregarMaterias(){

    const resposta=await fetch(
    
    "http://localhost:3000/materias"
    
    );
    
    const materias=await resposta.json();
    
    const lista=document.getElementById("listaMaterias");
    
    materias.forEach(m=>{
    
    lista.innerHTML+=`
    
    <div class="card"
    
    onclick="escolher('${m.nome}')">
    
    <h3>${m.nome}</h3>
    
    </div>
    
    <br>
    
    `;
    
    });
    
    }
    
    function escolher(nome){
    
    localStorage.setItem(
    
    "materia",
    
    nome
    
    );
    
    window.location="calendario.html";
    
    }
    
    carregarMaterias();