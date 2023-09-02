do{
    var pokepage = Number(prompt("Qual dos 151 pokemons da primeira geração você desja visualizar?"));
}while(isNaN(pokepage) || pokepage == 0 || pokepage < 0 || pokepage > 151 || pokepage == false)

//inicio do programa

const fetchPokemonData = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    return data;
};

const updateAboutSection = async (pokemonId) => {
    const pokemonData = await fetchPokemonData(pokemonId);
    
    const main = document.querySelector("main");
    main.innerHTML = `
        <section class="main-grid">
            <div class="main-grid-header">
                <p>Height</p>
                <p>Weight</p>
                <p>Abilities</p>
            </div>
            <div class="about-data">
                <p>${pokemonData.height}</p>
                <p>${pokemonData.weight}</p>
                <p>
                    ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}
                </p>
            </div>
        </section>
    `;
};

document.getElementById("about").addEventListener("click", () => {
    updateAboutSection(pokepage); 
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateBaseStatsSection = async (pokemonId) => {
    const pokemonData = await fetchPokemonData(pokemonId);
    
    const main = document.querySelector("main");
    main.innerHTML = `
        <section class="main-grid">
            <div class="main-grid-header">
                <p>HP</p>
                <p>ATTACK</p>
                <p>DEFENSE</p>
                <p>SPEED</p>
            </div>
            <div class="progress-bar">
                <div class="bar">
                    <div class="hp progress" style="width: ${pokemonData.stats[0].base_stat}%;"></div>
                </div>
                <div class="bar">
                    <div class="attack progress" style="width: ${pokemonData.stats[1].base_stat}%;"></div>
                </div>
                <div class="bar">
                    <div class="defense progress" style="width: ${pokemonData.stats[2].base_stat}%;"></div>
                </div>
                <div class="bar">
                    <div class="speed progress" style="width: ${pokemonData.stats[5].base_stat}%;"></div>
                </div>
            </div>
        </section>
    `;
};

document.getElementById("base-stats").addEventListener("click", () => {
    updateBaseStatsSection(pokepage); 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateMovesSection = async (pokemonId) => {
    const pokemonData = await fetchPokemonData(pokemonId);

    const main = document.querySelector("main");
    main.innerHTML = `
        <section class="moves">
            ${pokemonData.moves
                .map((move) => `<span>${move.move.name}</span>`)
                .join('')}
        </section>
    `;
};

document.getElementById("moves").addEventListener("click", () => {
    updateMovesSection(pokepage);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Função para atualizar a apresentação do Pokémon
const updatePokemonPresentation = async (pokemonId) => {
    const pokemonData = await fetchPokemonData(pokemonId);

    // Acesse os dados do Pokémon e atualize os elementos HTML
    const pokemonNameElement = document.querySelector(".pokemon-name");
    const typesElement = document.querySelector(".types");
    const pokemonNumberElement = document.querySelector(".pokemon-number");
    const pokemonImageElement = document.querySelector(".pokemon-presentation img");

    // Atualize os elementos com os dados do Pokémon
    pokemonNameElement.textContent = pokemonData.name;
    typesElement.textContent = pokemonData.types[0].type.name; // Assumindo apenas um tipo
    pokemonNumberElement.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
    pokemonImageElement.src = pokemonData.sprites.other.dream_world.front_default;
    pokemonImageElement.alt = pokemonData.name;
};

updatePokemonPresentation(pokepage);

//////////////////////////////////////////////



