// Consumindo API IBGE
// Seletor de estados
function popUfs() {
  const ufSelect = document.querySelector( "select[name=estado]" );

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( estados => {
    for (const estado of estados) {
      ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
    }
  })
}

popUfs();

function popCidade(event) {
  const citySelect = document.querySelector("select[name=cidade]");

  const hiddenInput = document.querySelector("input[name=estadoh]");
  const ufValue = event.target.value
  const estadoSelecionado = event.target.selectedIndex
  hiddenInput.value = event.target.options[estadoSelecionado].text

  citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
  citySelect.disabled = true

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  fetch(url)
    .then( res => res.json() )
    .then ( cities => {
        for ( const city of cities ){
            citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome}</option>`
        }
        citySelect.disabled = false
    })

}
document
.querySelector("select[name=estado]") 
.addEventListener("change", popCidade)



// função para selecionar os itens dados da compra
const itemsBuy = document.querySelectorAll(".itens-grid li");

for (const item of itemsBuy) {
  item.addEventListener("click", selectionItem)
}

const collectedItems =  document.querySelector("input[name=itens]")

//array do alredySelected
let selectedItems = []

function selectionItem(event) {
  const itemLi = event.target
  itemLi.classList.toggle("selected")
  const itemId = event.target.dataset.id

  // encontra o item, compara com o id e retorna verdadeiro ou falso
  const alredySelected = selectedItems.findIndex( item => item == itemId)
  // remove o item do array
  if(alredySelected >= 0){
    const filtereditems = selectedItems.filter( item => {
      const itemDiferent = item != itemId
      return itemDiferent
    })

    selectedItems = filtereditems
// Add item 
  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}


