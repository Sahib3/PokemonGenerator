const container = document.querySelector("#content");
const btn = document.querySelector("#generate");
const allPokemon = []; // variable to store all pokemon
const rand = Math.floor(Math.random() * 150) + 1;




// fetch random pokemon (made with the help of https://www.youtube.com/watch?v=T-VQUKeSU1w&t=2101s, James Q Quick)
const fetchPokemon = () => {
  try {
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      allPokemon.push(fetch(url).then((res) => res.json()));
    }
    // wait for all pokemon to be added
    Promise.all(allPokemon).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites["front_default"],
        id: result.id,
        type: result.types.map((type) => type.type.name).join(" "),
      }));

      //  select a random pokemon and then pass it to the create function to create the image 
      const randomPokemon = pokemon[rand];
      createPokemon(randomPokemon);
   
    });
  } catch (error) {
    console.log(error);
  }
};



// creates pokemon image
const createPokemon = (randomPokemon) => {
  // create a Pokemon card using template literals that displays the info of the pokemon 
  const card = ` 
    <div id = "pokemon">
        <img id="poke-image" src="${randomPokemon.image}">
        <div id= "poke-id"> #${randomPokemon.id} </div>
        <div id= "name">${randomPokemon.name} </div>
        <div id= "type" style="background-color:">${randomPokemon.type} </div>
    </div>
   `;
   // add the Pokemon card to the content div in the html file 
  container.innerHTML += card;
};

fetchPokemon();
