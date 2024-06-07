function renderMain(data, i) {
  const height = data.height / 10 || pokeData[i].height / 10;
  const weight = data.weight / 10 || pokeData[i].weight / 10;
  const baseExp = data.base_experience || pokeData[i].base_experience;

  const abilities1 =
    data.abilities && data.abilities[0]
      ? data.abilities[0]['ability']['name']
      : '' || pokeData[i].abilities[0]['ability']['name'];
  const abilities2 =
    data.abilities && data.abilities.length > 1
      ? data.abilities[1]['ability']['name']
      : '';
  return `
      <div id="overlay-main">
        <p class="distance-txt">
          Height:
          <span class="overlay-main-stats" id="overlay-height">${height}</span>m
        </p>
        <p class="distance-txt">
          Weight:
          <span class="overlay-main-stats" id="overlay-weight">${weight}</span>kg
        </p>
        <p class="distance-txt">
          Base Exp:
          <span class="overlay-main-stats" id="overlay-base-exp">${baseExp}</span>
        </p>
        <p class="distance-txt">
          Abilities:
          <span id="overlay-abilities">${abilities1}</span>
          <span id="overlay-abilities">${abilities2}</span>
        </p>
      </div>
    `;
}

// ORIG
// function renderStatsData(data, i) {
//   if (data[i]) {
//     const hp = data[i].stats[0].base_stat;
//     const attack = data[i].stats[1].base_stat;
//     const defense = data[i].stats[2].base_stat;
//     const speed = data[i].stats[5].base_stat;
//     const specialAtk = data[i].stats[3].base_stat;
//     const specialDef = data[i].stats[4].base_stat;

//     return `
//     <div id="overlay-stats">
//       <p>hp <span class="overlay-stats-bar" id="overlay-hp"  style="margin-left: 75px;">${hp}</span></p>
//       <p>attack <span class="overlay-stats-bar" id="overlay-attack" style="margin-left: 45px;">${attack}</span></p>
//       <p>defense <span class="overlay-stats-bar" id="overlay-defense" style="margin-left: 31px;">${defense}</span></p>
//       <p>speed <span class="overlay-stats-bar" id="overlay-speed" style="margin-left: 47px;">${speed}</span></p>
//       <p>special atk <span class="overlay-stats-bar" id="overlay-special-atk" style="margin-left: 9px;">${specialAtk}</span></p>
//       <p>special def<span class="overlay-stats-bar" id="overlay-special-def" style="margin-left: 14px;">${specialDef}</span></p>
//       </p>
//     </div>`;
//   } else {
//     return '<div id="overlay-stats">No data available</div>';
//   }
// }

// incl svg-start
function renderStatsData(data, i) {
  if (data[i]) {
    const hp = data[i].stats[0].base_stat;
    const attack = data[i].stats[1].base_stat;
    const defense = data[i].stats[2].base_stat;
    const speed = data[i].stats[5].base_stat;
    const specialAtk = data[i].stats[3].base_stat;
    const specialDef = data[i].stats[4].base_stat;
    //  <div id="overlay-stats">
    return `
     
        <div class="row">
          <p>hp <span class="overlay-dist-bar overlay-stats-bar1" id="overlay-hp">${createSvgBar(
            hp
          )}</span></p>
        </div
        <div class="row">
          <p>attack <span class="overlay-dist-bar overlay-stats-bar1" id="overlay-attack">${createSvgBar(
            attack
          )}</span></p>
        </div>
        <div class="row">
          <p>defense <span class="overlay-dist-bar overlay-stats-bar1" id="overlay-defense">${createSvgBar(
            defense
          )}</span></p>
        </div>
        <div class="row">
          <p>speed <span class="overlay-dist-bar overlay-stats-bar1" id="overlay-speed">${createSvgBar(
            speed
          )}</span></p>
        </div>
        <div class="row">
          <p>special atk <span class="overlay-dist-bar overlay-stats-bar1" id="overlay-special-atk">${createSvgBar(
            specialAtk
          )}</span></p>
        </div>
        <div class="row">
          <p>special def <span class="overlay-dist-bar overlay-stats-bar1" id="overlay-special-def">${createSvgBar(
            specialDef
          )}</span></p>
        </div>
     
    `;
  } else {
    return '<div id="overlay-stats">No data available</div>';
  }
}

function renderEvoChain(data, currentPokemonIndex) {
  const currentPokemon = data[currentPokemonIndex];

  document.getElementById('stats-tab').classList.remove('active');
  document.getElementById('evo-tab').classList.add('active');

  const evo1 =
    currentPokemon['sprites']['versions'][`generation-i`]['red-blue'][
      'front_transparent'
    ];
  const evo2 =
    currentPokemon['sprites']['versions'][`generation-ii`]['crystal'][
      'front_transparent'
    ];
  const evo3 =
    currentPokemon['sprites']['versions'][`generation-iii`][
      'firered-leafgreen'
    ]['front_default'];

  return ` <div id="overlay-img-container">
  <img
    class="poke-img"
    src="${evo1}"
    alt=""
  />
  <img
    class="poke-img"
    src="${evo2}"
    alt=""
  />
  <img
    class="poke-img"
    src="${evo3}"
    alt=""
  />
</div>`;
}

function renderCardFront(data, i) {
  const hasSecondType = pokeData[i]['types'].length > 1;
  const secondTypeIconClass = hasSecondType
    ? 'poke-element-icon'
    : 'poke-element-icon hidden';
  const secondTypeIcon = hasSecondType
    ? `<img class="${secondTypeIconClass}" src="./img/elements/pokemon-${data[i]['types'][1]['type']['name']}-icon.png" title="${data[i]['types'][1]['type']['name']}" alt="" />`
    : '';

  return `
    <div id="card" onclick="overlayOn(pokeData[${i}], ${i})">
      <section class="title">
        <p>
          #
          <span id="title-num">${data[i]['id']}</span>
        </p>
        <span id="title">${data[i]['name']}</span>
      </section>
      <section id="card-bg" class="bg-${data[i]['types'][0]['type']['name']}">
        <img class="poke-img" src="${data[i]['sprites']['other']['official-artwork']['front_default']}" alt="" />
      </section>
      <section>
        <div id="card-footer">
          <img
            class="poke-element-icon"
            src="./img/elements/pokemon-${data[i]['types'][0]['type']['name']}-icon.png"
            title="${data[i]['types'][0]['type']['name']}"
            alt=""
          />
          ${secondTypeIcon}
        </div>
      </section>
    </div>`;
}

function loadResult(pokemon, i, secondTypeIcon) {
  return `
  <div id="card" onclick="overlayOn(pokeData[${i}], ${i})">
    <section class="title">
      <p>#<span id="title-num">${pokemon.id}</span></p>
      <span id="title">${pokemon.name}</span>
    </section>
    <section id="card-bg" class="bg-${pokemon.types[0].type.name}">
      <img class="poke-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="" />
    </section>
    <section>
      <div id="card-footer">
        <img class="poke-element-icon" src="./img/elements/pokemon-${pokemon.types[0].type.name}-icon.png" title="${pokemon.types[0].type.name}" alt="" />
        ${secondTypeIcon}
      </div>
    </section>
  </div>
`;
}

function renderOverlay(data) {
  const statContent = document.getElementById('stats-overlay');
  statContent.innerHTML = '';
  const evoContent = document.getElementById('evo-overlay');
  evoContent.innerHTML = '';

  const idOverlay = document.getElementById('title-num-big');
  idOverlay.innerHTML = `${data['id']}`;

  const nameOverlay = document.querySelector('.title-big');
  nameOverlay.innerHTML = `${data['name']}`;

  const imgOverlay = document.getElementById('overlay-img-big');
  imgOverlay.src = `${data['sprites']['other']['official-artwork']['front_default']}`;

  const cardBg = document.getElementById('card-overlay-bg');
  cardBg.className = `bg-${data['types'][0]['type']['name']}`;

  const icon = document.getElementById('overlay-element-icon');
  icon.src = `./img/elements/pokemon-${data['types'][0]['type']['name']}-icon.png`;
}
