const dias = document.getElementById("dias");

for(let i=1;i<=31;i++){

const div=document.createElement("div");

div.className="dia";

if(i===6 || i===13 || i===20 || i===27){

div.classList.add("ocupado");

}else{

div.classList.add("disponivel");

div.onclick=()=>{

localStorage.setItem("data","2026-07-"+String(i).padStart(2,"0"));

window.location="horarios.html";

};

}

div.innerHTML=i;

dias.appendChild(div);

}