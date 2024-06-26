let pokeData = []; // pokedex data

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/${i}';
const allPokemon = []; //fetch URL
const maxNumber = 20; // init amount of cards
let pokeCount = 0; // current amount of cards
let currentPokemonIndex = 0;
let currentIndex = 0;

let displayedPokemon = [];

// async function init() {
//   const urls = [];
//   for (let i = 1; i <= maxNumber; i++) {
//     urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
//   }

//   try {
//     const responses = await Promise.all(urls.map(url => fetch(url)));
//     const data = await Promise.all(responses.map(response => response.json()));

//     data.forEach((pokemon, i) => {
//       pokeData.push(pokemon);
//       renderCard(pokeData, i);
//     });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

async function init() {
  displayedPokemon = [];
  pokeData = [];

  const urls = [];
  for (let i = 1; i <= maxNumber; i++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
  }

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));

    data.forEach((pokemon, i) => {
      pokeData.push(pokemon);
      displayedPokemon.push(pokemon);
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
  // displayedPokemon.push(data[i]);
}

// function loadMore() {
//   const btn = document.getElementById('btn-load-more');
//   const content = document.getElementById('card-content');

//   if (pokeCount < 980) {
//     const startIndex = pokeCount + 1;
//     const endIndex = Math.min(startIndex + 19, 980);

//     const urls = [];
//     for (let i = startIndex; i <= endIndex; i++) {
//       urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
//     }

//     fetchDataInOrder(urls);
//   } else {
//     content.innerHTML = '';
//     pokeCount = 0;
//     init();
//   }
// }

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
    displayedPokemon = []; // Reset the displayedPokemon array
    init();
  }
}
// async function fetchDataInOrder(urls) {
//   try {
//     const responses = await Promise.all(urls.map(url => fetch(url)));
//     const data = await Promise.all(responses.map(response => response.json()));

//     const cardContent = document.getElementById('card-content');

//     data.forEach((pokemon, i) => {
//       pokeData.push(pokemon);
//       const index = pokeCount + i;
//       const cardHTML = renderCardFront(pokeData, index);
//       cardContent.innerHTML += cardHTML;
//       currentPokemonIndex = index;
//     });

//     pokeCount += data.length;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// ------ OVERLAY START------ //

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
      displayedPokemon.push(pokemon); // Add the new Pokemon to the displayedPokemon array
      currentPokemonIndex = index;
    });

    pokeCount += data.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function overlayOn(data, i) {
  setCurrentPokemonIndex(i);
  document.getElementById('overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';

  const arrows = document.getElementById('arrow-container');
  arrows.classList.remove('d-none');
  const overlayContent = document.getElementById('main-overlay');
  overlayContent.innerHTML = renderMain(data, i);
  currentIndex = i;
  // render the overlay-card itself
  renderOverlay(data);
}

function renderStats(event, index) {
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

// needed to be able to click inside overlay without closing it
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

/* -------------------------------------------------------- */
/* --- EVENT LISTENER -START --- */

// const prevBtn = document.getElementById('prev-btn');
// const nextBtn = document.getElementById('next-btn');

// prevBtn.addEventListener('click', event => {
//   event.stopPropagation();
//   prevPokemon();
// });

// nextBtn.addEventListener('click', event => {
//   event.stopPropagation();
//   nextPokemon();
// });

// document.getElementById('overlay').addEventListener('click', close);

// const statsButtons = document.querySelectorAll('#stats span');
// const statsDiv = document.querySelector('#stats');

// statsButtons.forEach(button => {
//   button.addEventListener('click', event => {
//     event.stopPropagation();
//   });
// });

// statsDiv.addEventListener('click', event => {
//   event.stopPropagation();
// });

function close(event) {
  const isClickOnArrow =
    event.target.classList.contains('arrow-btn') ||
    event.target.closest('.arrow-btn');

  if (event.target.id !== 'overlay' && !isClickOnArrow) {
    return;
  }

  overlayOff();
}

function handlePrevClick(event) {
  event.stopPropagation();
  console.log('Prev button clicked');
  prevPokemon();
}

function handleNextClick(event) {
  event.stopPropagation();
  console.log('Next button clicked');
  nextPokemon();
}

function stopEventPropagation(event) {
  event.stopPropagation();
}

document.getElementById('prev-btn').addEventListener('click', handlePrevClick);
document.getElementById('next-btn').addEventListener('click', handleNextClick);
document.getElementById('overlay').addEventListener('click', close);

const statsButtons = document.querySelectorAll('#stats span');
statsButtons.forEach(button => {
  button.addEventListener('click', stopEventPropagation);
});

// Removed statsDiv event listener as it's redundant

/* --- EVENT LISTENER -END --- */
/* -------------------------------------------------------- */

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

  if (displayedPokemon && displayedPokemon.length > 0) {
    for (let i = 0; i < displayedPokemon.length; i++) {
      const pokemon = displayedPokemon[i];
      const pokemonName = pokemon.name.toLowerCase();

      if (pokemonName.startsWith(searchInput)) {
        const hasSecondType = pokemon.types.length > 1;
        const secondTypeIconClass = hasSecondType
          ? 'poke-element-icon'
          : 'poke-element-icon hidden';
        const secondTypeIcon = hasSecondType
          ? `<img class="${secondTypeIconClass}" src="./img/elements/pokemon-${pokemon.types[1].type.name}-icon.png" title="${pokemon.types[1].type.name}" alt="" />`
          : '';

        const cardHTML = loadResult(displayedPokemon, i, secondTypeIcon);

        cardContent.innerHTML += cardHTML;
      }
    }
  }
}

// sliding through

// function prevPokemon() {
//   currentIndex = getCurrentPokemonIndex();
//   console.log('currentIndec: ', currentIndex);
//   if (currentIndex > 0) {
//     console.log('if loop started');
//     let prevIndex = currentIndex - 1;
//     overlayOn(pokeData[prevIndex], prevIndex);
//     console.log('overlayOn-zugabe IF: ', pokeData[prevIndex]);
//     console.log('index from IF - ', prevIndex);
//     setCurrentPokemonIndex(prevIndex);
//   } else {
//     console.log('else loop started');
//     const lastIndex = displayedPokemon.length - 1;
//     overlayOn(pokeData[lastIndex], lastIndex);
//     console.log('overlayOn-zugabe ELSE: ', pokeData[lastIndex]);
//     console.log('index from ELSE - ', lastIndex);
//     setCurrentPokemonIndex(lastIndex);
//   }
// }

function prevPokemon() {
  const currentIndex = getCurrentPokemonIndex();
  console.log(`Current Index: ${currentIndex}`);

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : pokeData.length - 1;
  console.log(`Moving to Previous Index: ${prevIndex}`);
  overlayOn(pokeData[prevIndex], prevIndex);
  setCurrentPokemonIndex(prevIndex);
}

function nextPokemon() {
  let currentIndex = getCurrentPokemonIndex();
  const lastIndex = pokeData.length - 1;

  if (currentIndex < lastIndex) {
    currentIndex++;
    overlayOn(pokeData[currentIndex], currentIndex);
  } else {
    currentIndex = 0;
    overlayOn(pokeData[currentIndex], currentIndex);
  }
}

/* ----------------------------- */

function createSvgBar(value) {
  return `
    <div class="bar-container">
      <div class="bar-value" style="width: ${value}%;">
        <span class="bar-text">${value}</span>
      </div>
    </div>
  `;
}
