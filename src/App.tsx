import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Card } from './components/Pokemon/Card';
import { capitalize } from './utils/text';
import {POKEMON_TYPES} from './mocks/POKEMON_TYPES'
interface PokemonDAO {
  name: string;
  url: string;
}

interface PokemonDetailDAO{
  types: [{
    name: string
  }],
  image: string,
  name: string,
  id: string,
}

interface PokemonState {
  pokemons: PokemonDetailDAO[]
  next: string;
}

async function getPokemonDetails(url: string){
  const response = await fetch(url)
  const details = await response.json()
  
  const pokemon : PokemonDetailDAO = {
    types: details.types.map((type: any) => {
      return type.type.name
    }),
    image: details.sprites.front_default,
    name: capitalize(details.name),
    id: String(details.id).padStart(3, '0'),
  }
  return pokemon
}





function App() {




  const [pokemons, setPokemons] = useState<PokemonState>({
    pokemons: [],
    next: ""
  })

  async function setData(pokemons: any){
    const pokemonDetails =  pokemons.results.map(async (pokemon: PokemonDAO) => {
      return getPokemonDetails(pokemon.url)
      
    })
    const temporaryVariable : PokemonDetailDAO[] = await Promise.all(pokemonDetails)
    setPokemons((prevState) => {
      return {
        pokemons: [...prevState.pokemons, ...temporaryVariable],
        next: pokemons.next
      }
    })


  }

  async function loadPokemons(nextUrl: any){
    const response = await fetch(nextUrl)
    const pokemons = await response.json()

    setData(pokemons)
  }

  useEffect(() => {
    let isApiSubscribed = true;

    setPokemons({
      next: "",
      pokemons: []
    })
    const getPokemons = async() => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon")
      const pokemons = await response.json()
      if(isApiSubscribed){
        setData(pokemons)

      }

    }
    
    getPokemons()
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    }
   }, [])


   console.log("Chamando app")
  return (
    <React.Fragment>
      <Header></Header>
      
      <div className='pokemons-wrapper'>
        
        <div className="pokemons-filter">
          {POKEMON_TYPES.map((type) => {
            return <span className={`pill inactive pokemon_${type.name}`}>{capitalize(type.name)}</span>
          })}
        </div>
        <div className="pokemons-cards">
          {pokemons.pokemons.map((pokemon: PokemonDetailDAO) => {
             return <Card key={pokemon.id} id={pokemon.id} name={capitalize(pokemon.name)} image={pokemon.image} types={pokemon.types}></Card>
          })}
    
        </div>

      <div className='actions'>
        <button onClick={() => loadPokemons(pokemons.next)}>Carregar mais Pokemons</button>
      </div>
      </div>

    </React.Fragment>
  );
}

export default App;