const allPokemon = []; //fetch URL
const pokeData = []; // pokedex data
const maxNumber = 20; // init amount of cards
let pokeCount = 0; // current amount of cards

function init() {
  for (i = 1; i <= maxNumber; i++) {
    allPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
  }
  for (i = 0; i < allPokemon.length; i++) {
    fetchData(allPokemon[i], i);
  }
}

async function fetchData(allPokemon, i) {
  console.log('Fetching URL:', allPokemon);
  const resp = await fetch(allPokemon);
  let dataJSON = await resp.json();
  pokeData.push(dataJSON);
  renderCard(pokeData, i);
  console.log(dataJSON);
  console.log(pokeData);
  // console.log(
  //   dataJSON[i]['sprites']['other']['official-artwork']['front_default']
  // );
}

function renderCard(pokeData, i) {
  let cardContent = document.getElementById('card-content');
  cardContent.innerHTML += renderCardFront(pokeData, i);
  pokeCount++;
  console.log('pokeCount: ', pokeCount);
}

function loadMore() {}

// ------ OVERLAY ------ //
function overlayOn() {
  document.getElementById('overlay').style.display = 'block';
}

function overlayOff() {
  document.getElementById('overlay').style.display = 'none';
}

function close(event) {
  event.stopPropagation();
}
// ------ OVERLAY ------ //
