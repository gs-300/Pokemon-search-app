const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const spriteDiv = document.getElementById("sprite-div");
const types = document.getElementById("types");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");
const outputBottom = document.getElementById("output-bottom");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchWrapper = document.getElementById("search_wrapper");
const searchInput = document.querySelector(".search-input");
const searchButton = document.getElementById("search-button");
const suggestions = document.getElementById("suggestions"); //new


let pokemonNames = []; //new

async function fetchPokemonNames() { //new

  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const data = await response.json();
    pokemonNames = data.results.map(pokemon => pokemon.name);
    console.log('Fetched Pokémon names:', pokemonNames);
  } catch (err) {

    console.error('Failed to fetch Pokémon names:', err);
    
    }
}


fetchPokemonNames(); // New

searchInput.addEventListener("input", () => { //New
  const query = searchInput.value.toLowerCase(); //New

  if (query === '') {
    suggestions.innerHTML = ""; // New (clears suggestions if input is empty.)
    return;
  }
  const matchedNames = pokemonNames.filter(name => name.startsWith(query)); //New
  showSuggestions(matchedNames); //New

});

function showSuggestions(matchedNames) { //New

  suggestions.innerHTML = ""; //New
  if (matchedNames.length > 0) { // New
    matchedNames.forEach(name => { //New
      const suggestionItem = document.createElement("div"); //New
      suggestionItem.classList.add("suggestion-item"); //New
      suggestionItem.textContent = name; //New
      suggestionItem.addEventListener("click", () => { //New
        searchInput.value = name; //New
        suggestions.innerHTML = ""; //New

      })
      suggestions.appendChild(suggestionItem); //New

    })


  }

}






    // Get data

const searchForPokemon = async () => {
  try {
    const inputNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputNameOrId}`);
    const data = await response.json();

    // Pokemon information

    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    pokemonWeight.innerHTML = `<strong>Weight:</strong> ${data.weight}`;
    pokemonHeight.innerHTML = `<strong>Height:</strong> ${data.height}`;
    spriteDiv.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite" >`;

    // Pokemon statistics
    
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set Pokemon type

    types.innerHTML = data.types.map(obj => 
      `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join("");

  } catch (err) {
    updateUserInterFace();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);

  };
};



const updateUserInterFace = () => {
  const removeSprite = document.getElementById("sprite");
  if (removeSprite) {
    removeSprite.remove();
  }

    // Reset user interface

  pokemonName.textContent = '';
  pokemonID.textContent = '';
  pokemonHeight.textContent = '';
  pokemonWeight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';


  

}

/* BUTTON EVENT LISTENER */


searchButton.addEventListener("click", () => 
  searchForPokemon());


/* Since I am going to be changing the 
container to a div element 
from a form element */

// searchForm.addEventListener("submit", e => {
//   e.preventDefault();
//     searchForPokemon();
  
// })