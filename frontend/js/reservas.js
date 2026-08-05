async function carregar(){

    const resposta = await fetch(
    
    "http://localhost:3000/reservas"
    
    );
    
    const reservas = await resposta.json();
    
    const lista = document.getElementById("lista");
    
    lista.innerHTML="";
    
    reservas.forEach(r=>{
    
    lista.innerHTML +=`
    
    <div class="card">
    
    <h3>${r.professor}</h3>
    
    <p><b>Ambiente:</b> ${r.ambiente}</p>
    
    <p><b>Matéria:</b> ${r.materia}</p>
    
    <p><b>Data:</b> ${r.data}</p>
    
    <p><b>Horário:</b> ${r.hora}</p>
    
    <br>
    
    <button onclick="cancelar(${r.id})">
    
    Cancelar
    
    </button>
    
    </div>
    
    <br>
    
    `;
    
    });
    
    }
    
    async function cancelar(id){
    
    if(!confirm("Deseja cancelar a reserva?")){
    
    return;
    
    }
    
    await fetch(
    
    `http://localhost:3000/reservas/${id}`,
    
    {
    
    method:"DELETE"
    
    }
    
    );
    
    carregar();
    
    }
    
    carregar();