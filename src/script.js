const cardsElement = document.querySelector("#acomodacoes");
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';
var data = [];

const getJSON = async url => {
        
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            data = JSON.parse(xhttp.responseText);
            renderCards(data);  
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

function renderCards(cards) {
    cardsElement.innerHTML = "";
    cards.map(renderCard);
}
  
function renderCard(acomodacao) {
    let classTipoPropriedade; 

    switch (acomodacao.property_type) {
        case 'Apartamento':
            classTipoPropriedade = 'badge-primary';
            break;
        case 'Casa':
            classTipoPropriedade = 'badge-warning';
            break;
        case 'Estúdio':
            classTipoPropriedade = 'badge-success';
            break;
        case 'Chácara':
            classTipoPropriedade = 'badge-info';
            break;
        case 'Loft':
            classTipoPropriedade = 'badge-danger';
            break;
        case 'Quarto':
            classTipoPropriedade = 'badge-secondary';
            break;
        default:
            classTipoPropriedade = 'badge-primary';
    }
    
    
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
    <div class="card mb-4 shadow-sm">
        <img class="bd-placeholder-img" width="100%" 
            src="${acomodacao.photo}">
        <div class="card-body">
            <span class="badge ${classTipoPropriedade}">${acomodacao.property_type}</span>
            <p class="card-text">${acomodacao.name}</p>
            <div class="text-right">
                <small class="text-muted"><strong>R$ ${acomodacao.price}</strong>/Dia</small>
            </div>
        </div>
    </div>
  `;
    cardsElement.appendChild(div);
}
 
getJSON(url);  
  
