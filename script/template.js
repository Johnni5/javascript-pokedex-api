function renderMain(data) {
  return `
  <div id="overlay-main">
    <p>
      Height:
      <span class="overlay-main-stats" id="overlay-height"
        >0.6</span
      >m
    </p>
    <p>
      Weight:
      <span class="overlay-main-stats" id="overlay-weight"
        >8.5</span
      >kg
    </p>
    <p>
      Base Exp:
      <span class="overlay-main-stats" id="overlay-base-exp"
        >62</span
      >
    </p>
    <p>
      Abilities:
      <span id="overlay-abilities">blaze, solar-power</span>
    </p>
  </div>`;
}

function renderStats() {
  return `<div id="overlay-stats">
  <p>hp <span class="overlay-stats-bar" id="overlay-hp"  style="margin-left: 75px;">39</span></p>
  <p>attack <span class="overlay-stats-bar" id="overlay-attack" style="margin-left: 45px;">52</span></p>
  <p>defense <span class="overlay-stats-bar" id="overlay-defense" style="margin-left: 31px;">43</span></p>
  <p>speed <span class="overlay-stats-bar" id="overlay-speed" style="margin-left: 47px;">65</span></p>
  <p>special atk <span class="overlay-stats-bar" id="overlay-special-atk" style="margin-left: 9px;">60</span></p>
  <p>special def<span class="overlay-stats-bar" id="overlay-special-def" style="margin-left: 14px;">50</span></p>
  </p>
</div>`;
}

function renderEvoChain() {
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
// data['name'];

function renderCardFront(pokeData, i) {
  const hasFlyingType = pokeData[i]['types'].some(
    type => type.type.name === 'flying'
  );
  const flyingIconClass = hasFlyingType
    ? 'poke-element-icon'
    : 'poke-element-icon hidden';

  return `
  <div id="card" onclick="overlayOn()">
    <section class="title">
      <p>
        #
        <span id="title-num">${pokeData[i]['id']}</span>
      </p>
      <span id="title">${pokeData[i]['name']}</span>
    </section>
    <section id="card-bg" class="bg-${pokeData[i]['types'][0]['type']['name']}">
      <img class="poke-img" src="${pokeData[i]['sprites']['other']['official-artwork']['front_default']}" alt="" />
    </section>
    <section>
      <div id="card-footer">
        <img
          class="poke-element-icon"
          src="./img/elements/pokemon-${pokeData[i]['types'][0]['type']['name']}-icon.png"
          title="${pokeData[i]['types'][0]['type']['name']}"
          alt=""
        />
        <img
          class="${flyingIconClass} poke-element-icon"
          src="./img/elements/pokemon-flying-icon.png"
          alt=""
          title="${pokeData[i]['types'][1]['type']['name']}"
        />
      </div>
    </section>
  </div>`;
}
