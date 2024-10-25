let numeroPokemonGlobal =0;
let contadorAciertos=0;

async function buscarPokemon(){

    
    try{
        
        const $imagenPokemon = document.querySelector('#imagenPokemon');
        const $ability = document.getElementById('ability');
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await response.json();

            const numeroAleatorio = Math.floor(Math.random() * data.results.length) ; 
            const responde2 = await fetch(data.results[numeroAleatorio].url)
            const data2 = await responde2.json()
           // const nombrePokemon = data.results[numeroAleatorio].name;
           numeroPokemonGlobal= numeroAleatorio
            
            const urlImage = data2.sprites.front_default
            const urlAbility = data2.abilities[0].ability.name
            
            
            $ability.textContent = ("...")
            $imagenPokemon.src = urlImage;

            document.getElementById('imagenPokemon').style.filter='invert(0) brightness(0)';
            document.getElementById('aciertos').textContent = (`Aciertos: ${contadorAciertos}`)


    } catch(error){
        console.log(error)
    }
    }
    
    buscarPokemon() //esto se queda con el numero de pokedex

    async function comprobar(){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await response.json();

            const nombrePokemon = data.results[numeroPokemonGlobal].name.split('-')[0];
            const nombre = document.getElementById('pokemonUsuario').value;


            const $ability = document.getElementById('ability');

        if (nombre==nombrePokemon){
            console.log("acertaste")
            $ability.textContent = ("Acertaste! ")
            document.getElementById('imagenPokemon').style.filter='invert(0) brightness(1)';
            contadorAciertos++;
            document.getElementById('aciertos').textContent = (`Aciertos: ${contadorAciertos}`)
           
            setTimeout(() => {
                buscarPokemon();
                
                
            }, 1500);  
                    


        } else {
            console.log("te equivocaste")
            console.log(nombre)
            console.log(nombrePokemon)
            $ability.textContent = ("Te equivocaste, el Pokémon es " + nombrePokemon)
            contadorAciertos=0;
            document.getElementById('aciertos').textContent = (``)

            setTimeout(() => {
                buscarPokemon();
                
                
            }, 1500);  
        }

    }


    document.getElementById("botonAdivinar").addEventListener("click", comprobar);

   
    

  
