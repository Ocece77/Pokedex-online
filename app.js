/* Backend */

const pokeListDiv = document.getElementById("main-content-pokelist");
const searchBar = document.getElementById("search-bar");
const cardDetails =  document.getElementById("main-content-details");

let defaultPokeList = []
let currPokeList = []

const typeColors = {
  "grass" : "#f0fceb",
  "fire" : "#fceceb",
  "water" : "#ebfafc",
  "electric": "#fcfaeb",
  "psychic":"#fcebf5",
  "fairy" : "#fcebfb",
  "poison" : "#f4ebfc",
  "rock" : "#d6c9bf",
  "ghost" : "#f8ebfc",
  "normal" : "#f5f5f5",
  "fighting" : "#fcf4eb",
  "ground" : "#fcf1eb",
  "bug" : "#e8faef"
};

const idColors = {
  "grass" : "#d0ffbd",
  "fire" : "#ffa9a3",
  "water" : "#a7f0fa",
  "electric": "#fff6b0",
  "psychic":"#f7abd8",
  "fairy" : "#fca4e6",
  "poison" : "#d7affa",
  "rock" : "#d4bfb0",
  "ghost" : "#e9b1fa",
  "normal" : "#d6d6d6",
  "fighting" : "#ffdab0",
  "ground" : "#faae84",
  "bug" : "#b9fad2"
};


const fetchPokemon = async () =>{
  for (let i = 1 ; i < 100 ; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`
    try {
      const res = await fetch(url)
      .then((data)=> data.json())
      .then((data) => defaultPokeList.push(
        {"id" : data.id,
          "name" : data.name,
          "image" : data.sprites.other.showdown["front_default"],
          "type" : data.types[0].type.name
        }
      ))
      pokeListDiv.innerHTML = `<div class="loader">
           <img src="pokeloading.gif" class="pokeball"  alt="loader"> 
           <h1>Loading</h1>
      </div>`
    } catch (e){
      console.error(e.message);
    }
  }   
  pokeListDiv.innerHTML = ""
  createPokemon(defaultPokeList)
}

const createPokemon = (arr) =>{
   pokeListDiv.innerHTML = ""
  for (const pokemon of arr){
    pokeListDiv.innerHTML += `
             <div onclick="showCardDetails(this.id)" id="${pokemon.id}" style="background-color:${typeColors[pokemon.type]}" class="main-content-card" >

           <!--Id of the pokémon-->
           <div class="main-content-card_id">
             <p class="main-content-card_id_content" style="background-color:${idColors[pokemon.type]}">0${pokemon.id}</p>
           </div>


           <!--Type of the pokémon-->
           <div class="main-content-card_type">
             <p class="main-content-card_type_content" style="background-color:${idColors[pokemon.type]}">${pokemon.type}</p>
           </div>

            <!--image of the pokémon-->
              <div>
                <img  class="main-content-card_image" src=${pokemon.image} alt="${pokemon.name} gif" >
              </div>

            <!--Name of the pokémon-->
            <div>
              <h4 class="main-content-card_name">
                ${pokemon.name}
              </h4>  
            </div>

          </div>
    `
  };
  
} 

const handleFiltered = () =>{
  searchBar.addEventListener("keyup" , (e)=>{
    let currVal = e.target.value;
    currPokeList = []

    // Checks if currVal is a number
    if (!isNaN(currVal)) {
    // Filter list by Pokémon number
      currPokeList = defaultPokeList.filter((item) => item["id"].toString().includes(currVal));
    } else {
    // Filters list by name if currVal is not a number
      currPokeList = defaultPokeList.filter((item) => item["name"].includes(currVal));
    }

    createPokemon(currPokeList);
  });
  
};

const showCardDetails = async (itemId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${itemId}/`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    cardDetails.innerHTML = `
      <div class="main-content-details_id">
        <p>N°${data.id}</p>
      </div>

      <div class="main-content-details_img">
        <img src="${data.sprites.other.showdown["front_default"]}" alt="${data.name}">
      </div>

      <div class="main-content-details_title">
        <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
      </div>

      <div class="main-content-details_type">
        <p>${data.types.map(type => type.type.name).join(', ')}</p>
      </div>

    <div class="main-content-details_info">

      <div class="main-content-details_weight">
        <p>Weight<br>${data.weight / 10} kg</p>
      </div>

      <div class="main-content-details_height">
        <p>Height<br>${data.height / 10} m</p>
      </div>

      <div class="main-content-details_ability">
        <p>Ability<br>${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
      </div>

    </div>
    `;
  } catch (e) {
    console.error(e.message);
  }
}


window.addEventListener("DOMContentLoaded" ,()=>{
  fetchPokemon()
  handleFiltered()
})

