function pushJsonInArray(
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
) {
  let info = {
    name: getNames,
    id: getId,
    image: getImage,
    characteristicFirst: characteristicFirst,
    weight: getWeight,
    height: getHeight,
    experience: getExperience,
    abilities: abilities,
    hp: hp,
    attack: atk,
    defense: def,
    'special-attack': getAtk1,
    v1: evo1,
    v2: evo2,
    v3: evo3,
  };

  pokemon_all.push(info);

  renderX20();
}
