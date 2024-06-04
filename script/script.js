const pokeData = []; // pokedex data

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/${i}';
const allPokemon = []; //fetch URL
const maxNumber = 20; // init amount of cards
let pokeCount = 0; // current amount of cards

// function init() {
//   for (i = 1; i <= maxNumber; i++) {
//     allPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
//   }
//   for (i = 0; i < allPokemon.length; i++) {
//     fetchData(allPokemon[i], i);
//   }
// }

async function init() {
  const urls = [];
  for (let i = 1; i <= maxNumber; i++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
  }

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));

    data.forEach((pokemon, i) => {
      pokeData.push(pokemon);
      renderCard(pokeData, i);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchData(allPokemon, i) {
  //console.log('Fetching URL:', allPokemon);
  const resp = await fetch(allPokemon);
  let dataJSON = await resp.json();
  pokeData.push(dataJSON);
  renderCard(pokeData, i);
}

function renderCard(data, i) {
  let cardContent = document.getElementById('card-content');
  cardContent.innerHTML += renderCardFront(data, i);
  pokeCount++;
  //console.log('pokeCount: ', pokeCount);
}

// load n more pokemon
function loadMore() {}

// ------ OVERLAY ------ //
function overlayOn(data, i) {
  document.getElementById('overlay').style.display = 'block';
  const overlayContent = document.getElementById('main-overlay');
  overlayContent.innerHTML = renderMain(data, i);

  // render the overlay-card itself
  renderOverlay(data);
}

function renderOverlay(data) {
  const idOverlay = document.getElementById('title-num-big');
  idOverlay.innerHTML = `${data['id']}`;

  const nameOverlay = document.querySelector('.title-big');
  nameOverlay.innerHTML = `${data['name']}`;

  const imgOverlay = document.getElementById('overlay-img-big');
  imgOverlay.src = `${data['sprites']['other']['official-artwork']['front_default']}`;
  console.log(
    `${data['sprites']['other']['official-artwork']['front_default']}`
  );

  const cardBg = document.getElementById('card-overlay-bg');
  cardBg.className = `bg-${data['types'][0]['type']['name']}`;

  const icon = document.getElementById('overlay-element-icon');
  icon.src = `./img/elements/pokemon-${data['types'][0]['type']['name']}-icon.png`;
}

function renderStats(pokeData, i) {
  const statContainer = document.getElementById('stat-overlay');
  statContainer.innerHTML = renderStatsData(pokeData, i, event);
}

function overlayOff() {
  document.getElementById('overlay').style.display = 'none';
}

function close(event) {
  event.stopPropagation();
}

// ------ OVERLAY ------ //
