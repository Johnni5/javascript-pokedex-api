function renderMain(data, i) {
  event.stopPropagation();

  console.log('pokeData inside renderMain -START -> ', data);
  console.log('Index i:', i);

  const height = data.height / 10;
  const weight = data.weight / 10;
  const baseExp = data.base_experience;
  const abilities1 = data.abilities[0]['ability']['name'];
  const abilities2 =
    data.abilities.length > 1 ? data.abilities[1]['ability']['name'] : '';

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
  // } else {
  //   return '<div id="overlay-main">No data available</div>';
  // }
}

function renderStatsData(data, i, event) {
  event.stopPropagation();
  console.log('arg from renderStatsData()', data);
  const hp = data.stats[0][base_stat];
  return `<div id="overlay-stats">
    <p>hp <span class="overlay-stats-bar" id="overlay-hp"  style="margin-left: 75px;">${hp}</span></p>
    <p>attack <span class="overlay-stats-bar" id="overlay-attack" style="margin-left: 45px;">52</span></p>
    <p>defense <span class="overlay-stats-bar" id="overlay-defense" style="margin-left: 31px;">43</span></p>
    <p>speed <span class="overlay-stats-bar" id="overlay-speed" style="margin-left: 47px;">65</span></p>
    <p>special atk <span class="overlay-stats-bar" id="overlay-special-atk" style="margin-left: 9px;">60</span></p>
    <p>special def<span class="overlay-stats-bar" id="overlay-special-def" style="margin-left: 14px;">50</span></p>
    </p>
  </div>`;
}

function renderEvoChain(event) {
  event.stopPropagation();

  return ` <div id="overlay-img-container">
  <img
    class="poke-img"
    src="./img/pokemon_charmander.png"
    alt=""
  />
  <img
    class="poke-img"
    src="./img/pokemon-charmander-charmeleon.png"
    alt=""
  />
  <img
    class="poke-img"
    src="./img/pokemon-charmander-charizard.png"
    alt=""
  />
</div>`;
}

// WORKING - but 2 small

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
