const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const NUMBER = 100;

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const getPokemonInfo = (num) => {
  const promise = fetch(`${BASE_URL}/${num}`).then((res) => res.json());
  return promise;
};

const addPokemonToPage = (pokemon) => {
  const pokedex = document.getElementById("pokedex");
  const pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon";
  pokemonDiv.innerHTML = `<h2 class="pokemon-name">${capitalize(
    pokemon.name
  )}</h2>
<div>
  <img
    src=${pokemon.sprites.front_default}
    alt=${pokemon.name}
  />
</div>
<div class="pokemon-info">Type${
    pokemon.types.length > 1 ? "s" : ""
  }: ${pokemon.types.map((type) => type.type.name).join(", ")}</div>`;
  pokedex.appendChild(pokemonDiv);
};

const main = async () => {
  const promises = [];
  for (let i = 1; i <= NUMBER; i++) {
    promises.push(getPokemonInfo(i));
  }
  const allPokemon = await Promise.all(promises);
  for (let i = 0; i < NUMBER; i++) {
    addPokemonToPage(allPokemon[i]);
  }
};

main();
