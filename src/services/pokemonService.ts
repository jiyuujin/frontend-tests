const fetch = require('node-fetch')

const POKEMON_API = 'https://pokeapi.co/api/v2'

/**
 * 全てのポケモンを取得する
 */
export const fetchAllPokemon = async (): Promise<any> => {
  const res = await fetch(`${POKEMON_API}/pokemon?limit=100&offset=200`)
  const data = await res.json()
  return data
}
