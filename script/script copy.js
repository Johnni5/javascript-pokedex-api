const allPokemon = [];
const pokemon_all = {};
const pokemonCount = 0;
const maxNumber = 980;

function safeData(categorie) {
  let getWeight = categorie['weight'];
  let getHeight = categorie['height'];
  let getExperience = categorie['base_experience'];
  let getAbilities = categorie['abilities'][0]['ability']['name'];

  let getId = categorie['id'];
  let getNames = categorie['name'];
  let characteristicFirst = categorie['types'][0]['type']['name'];
  let getImage =
    categorie['sprites']['other']['official-artwork']['front_default'];

  let getHp = categorie['stats'][0]['base_stat'];
  let getAtk = categorie['stats'][1]['base_stat'];
  let getDef = categorie['stats'][2]['base_stat'];
  let getAtk1 = categorie['stats'][3]['base_stat'];

  let evo1 =
    categorie['sprites']['versions']['generation-i']['red-blue'][
      'back_transparent'
    ];
  let evo2 =
    categorie['sprites']['versions']['generation-ii']['crystal'][
      'back_transparent'
    ];
  let evo3 =
    categorie['sprites']['versions']['generation-iii']['firered-leafgreen'][
      'back_default'
    ];

  pushJsonInArray(
    getNames,
    getId,
    getImage,
    characteristicFirst,
    getWeight,
    getHeight,
    getExperience,
    getAbilities,
    getHp,
    getAtk,
    getDef,
    getAtk1,
    evo1,
    evo2,
    evo3
  );
}

function init() {
  for (i = 0; i <= maxNumber; i++) {
    allPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }
  for (i = 1; i <= allPokemon.length; i++) {
    fetchData(allPokemon[i]);
  }
}

async function fetchData() {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const dataJSON = await resp.json();
  safeData(dataJSON);
}

function renderCard() {
  const cardContent = document.getElementById('card-content');
  cardContent.innerHTML += renderHtml();
  pokemonCount++;
}

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
