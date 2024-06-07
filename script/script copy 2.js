const pokeData = []; // pokedex data

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/${i}';
const allPokemon = []; //fetch URL
const maxNumber = 20; // init amount of cards
let pokeCount = 0; // current amount of cards
let currentPokemonIndex = 0;

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
  const resp = await fetch(allPokemon);
  let dataJSON = await resp.json();
  pokeData.push(dataJSON);
  renderCard(pokeData, i);
}

function renderCard(data, i) {
  let cardContent = document.getElementById('card-content');
  cardContent.innerHTML += renderCardFront(data, i);
  pokeCount++;
}

function loadMore() {
  const btn = document.getElementById('btn-load-more');
  const content = document.getElementById('card-content');

  if (pokeCount < 980) {
    const startIndex = pokeCount + 1;
    const endIndex = Math.min(startIndex + 19, 980);

    const urls = [];
    for (let i = startIndex; i <= endIndex; i++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    fetchDataInOrder(urls);
  } else {
    content.innerHTML = '';
    pokeCount = 0;
    init();
  }
}

async function fetchDataInOrder(urls) {
  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));

    const cardContent = document.getElementById('card-content');

    data.forEach((pokemon, i) => {
      pokeData.push(pokemon);
      const index = pokeCount + i;
      const cardHTML = renderCardFront(pokeData, index);
      cardContent.innerHTML += cardHTML;
      currentPokemonIndex = index;
    });

    pokeCount += data.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// ------ OVERLAY START------ //

function overlayOn(data, i) {
  //new
  setCurrentPokemonIndex(i);
  document.getElementById('overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';

  const arrows = document.getElementById('arrow-container');
  arrows.classList.remove('d-none');
  const overlayContent = document.getElementById('main-overlay');
  overlayContent.innerHTML = renderMain(data, i);

  // render the overlay-card itself
  renderOverlay(data);
}

function renderStats(event, index) {
  //new
  setCurrentPokemonIndex(index);
  document.getElementById('main-tab').classList.remove('active');
  document.getElementById('evo-tab').classList.remove('active');
  document.getElementById('stats-tab').classList.add('active');

  const mainContent = document.getElementById('main-overlay');
  mainContent.innerHTML = '';
  const statContent = document.getElementById('stats-overlay');
  statContent.innerHTML = '';
  const evoContent = document.getElementById('evo-overlay');
  evoContent.innerHTML = '';
  statContent.innerHTML = renderStatsData(pokeData, index);
}

function renderEvo(event, currentPokemonIndex) {
  // new
  setCurrentPokemonIndex(currentPokemonIndex);
  document.getElementById('main-tab').classList.remove('active');
  document.getElementById('evo-tab').classList.add('active');
  document.getElementById('stats-tab').classList.remove('active');

  const mainContent = document.getElementById('main-overlay');
  mainContent.innerHTML = '';
  const statContent = document.getElementById('stats-overlay');
  statContent.innerHTML = '';
  const evoContent = document.getElementById('evo-overlay');
  evoContent.innerHTML = '';
  evoContent.innerHTML = renderEvoChain(pokeData, currentPokemonIndex);
}

function renderMainTab(event, currentPokemonIndex) {
  document.getElementById('stats-tab').classList.remove('active');
  document.getElementById('evo-tab').classList.remove('active');
  document.getElementById('main-tab').classList.add('active');

  const mainContent = document.getElementById('main-overlay');
  const statContent = document.getElementById('stats-overlay');
  statContent.innerHTML = '';
  const evoContent = document.getElementById('evo-overlay');
  evoContent.innerHTML = '';

  mainContent.innerHTML = renderMain(pokeData, currentPokemonIndex);
}

function setActiveTab(target) {
  document
    .querySelectorAll('#stats span')
    .forEach(span => span.classList.remove('active'));
  target.classList.add('active');
}

function overlayOff() {
  document.getElementById('overlay').style.display = 'none';
  document.body.style.overflow = 'unset';
}

document.getElementById('card-overlay').addEventListener('click', event => {
  event.stopPropagation();
});

function close(event) {
  const isClickOnArrow =
    event.target.classList.contains('arrow-btn') ||
    event.target.closest('.arrow-btn');

  if (event.target.id !== 'overlay' && !isClickOnArrow) {
    return;
  }

  overlayOff();
}

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

prevBtn.addEventListener('click', event => {
  event.stopPropagation();
  prevPokemon();
});

nextBtn.addEventListener('click', event => {
  event.stopPropagation();
  nextPokemon();
});

document.getElementById('overlay').addEventListener('click', close);

const statsButtons = document.querySelectorAll('#stats span');
statsButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
  });
});

function setCurrentPokemonIndex(index) {
  currentPokemonIndex = index;
}

function getCurrentPokemonIndex() {
  return currentPokemonIndex;
}

const pokemonCards = document.querySelectorAll('#card');
pokemonCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    currentPokemonIndex = index;
    overlayOn(pokeData[currentPokemonIndex], currentPokemonIndex);
  });
});

// ------ OVERLAY END------ //

// search pokemon's
function searchPokemon() {
  const searchInput = document
    .getElementById('search-input')
    .value.toLowerCase();
  const cardContent = document.getElementById('card-content');
  cardContent.innerHTML = '';

  for (let i = 0; i < pokeData.length; i++) {
    const pokemon = pokeData[i];
    const pokemonName = pokemon.name.toLowerCase();

    if (pokemonName.includes(searchInput)) {
      const hasSecondType = pokemon.types.length > 1;
      const secondTypeIconClass = hasSecondType
        ? 'poke-element-icon'
        : 'poke-element-icon hidden';
      const secondTypeIcon = hasSecondType
        ? `<img class="${secondTypeIconClass}" src="./img/elements/pokemon-${pokemon.types[1].type.name}-icon.png" title="${pokemon.types[1].type.name}" alt="" />`
        : '';

      const cardHTML = loadResult(pokemon, i, secondTypeIcon);

      cardContent.innerHTML += cardHTML;
    }
  }
}

// sliding through

function prevPokemon() {
  const currentIndex = getCurrentPokemonIndex();

  if (currentIndex > 0) {
    const prevIndex = currentIndex - 1;
    overlayOn(pokeData[prevIndex], prevIndex);
    setCurrentPokemonIndex(prevIndex);
  } else {
    const lastIndex = pokeData.length - 1;
    overlayOn(pokeData[lastIndex], lastIndex);
    setCurrentPokemonIndex(lastIndex);
  }
}

function nextPokemon() {
  const currentIndex = getCurrentPokemonIndex();
  const lastIndex = pokeData.length - 1;

  if (currentIndex < lastIndex) {
    const nextIndex = currentIndex + 1;
    overlayOn(pokeData[nextIndex], nextIndex);
    setCurrentPokemonIndex(nextIndex);
  } else {
    overlayOn(pokeData[0], 0);
    setCurrentPokemonIndex(0);
  }
}
