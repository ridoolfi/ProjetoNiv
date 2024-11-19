const form = document.querySelector('.form');
const nameOrNumber = document.querySelector('#nameOrNumber');
const numero = document.querySelector('.numero');
const nome = document.querySelector('.nome');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const pokemonGif = document.querySelector('.pokemonGif');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    nome.innerHTML = 'LOADING :)'
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIresponse.status == 200){
        const data = await APIresponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    if(data){
                pokemonGif.style.display = 'block';
                nome.innerHTML = data.name.toUpperCase();
                numero.innerHTML = '#' + data.id;
                pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']
                ['animated']['front_default'];
                nameOrNumber.value = '';
                searchPokemon = data.id;
            } else {
                nome.innerHTML = 'Not Found ;('
                numero.innerHTML = '404'
                pokemonGif.style.display = 'none'
            }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(nameOrNumber.value.toLowerCase()); 
})
btnPrev.addEventListener('click', (event) => {
    event.preventDefault(); 
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})
btnNext.addEventListener('click', (event) => {
    event.preventDefault();
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);




