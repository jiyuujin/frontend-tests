import { findVowels } from './services/vowelService'
import { getPaymentTotal } from './services/paymentService'
import { fetchAllPokemon } from './services/pokemonService'

const vowelCount = findVowels('HELLO')
console.log(vowelCount)

const priceA = getPaymentTotal(['210', '430', '760'], true)
const priceB = getPaymentTotal(['800', '250'], false)
const priceC = getPaymentTotal(['abc'], true)
const priceD = getPaymentTotal(['abc'], false)
console.log(priceA)
console.log(priceB)
console.log(priceC)
console.log(priceD)
;(async () => {
  const allData = await fetchAllPokemon()
  console.log(allData)
})()
