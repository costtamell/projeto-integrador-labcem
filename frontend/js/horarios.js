const horarios=[

    "07:15",
    
    "08:05",
    
    "08:55",
    
    "10:00",
    
    "10:50",
    
    "11:35"
    
    ];
    
    const lista=document.getElementById("listaHorarios");
    
    horarios.forEach(h=>{
    
    lista.innerHTML+=`
    
    <div class="horario"
    
    onclick="reservar('${h}')">
    
    ${h}
    
    </div>
    
    `;
    
    });
    
    async function reservar(hora){
    
    const usuario=JSON.parse(
    
    localStorage.getItem("usuario")
    
    );
    
    const ambiente=localStorage.getItem("ambiente");
    
    const materia=localStorage.getItem("materia");
    
    const data=localStorage.getItem("data");
    
    const resposta=await fetch(
    
    "http://localhost:3000/reservas",
    
    {
    
    method:"POST",
    
    headers:{
    
    "Content-Type":"application/json"
    
    },
    
    body:JSON.stringify({
    
    professor:usuario.nome,
    
    ambiente,
    
    materia,
    
    data,
    
    hora
    
    })
    
    }
    
    );
    
    const dados=await resposta.json();
    
    if(resposta.ok){
    
    window.location="confirmacao.html";
    
    }else{
    
    alert(dados.mensagem);
    
    }
    
    }