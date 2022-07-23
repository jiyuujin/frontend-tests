import fetch from 'node-fetch'

import { fetchAllPokemon } from '../../../src/services/pokemonService'

jest.mock('node-fetch', () => {
  return jest.fn()
})

describe('fetch-mock test', () => {
  it('Check pokemon response', async () => {
    const dummyResponse: any = Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return {
          msg: 'Success',
        }
      },
    })

    const spyFetch = fetch as jest.MockedFunction<typeof fetch>
    spyFetch.mockImplementation(() => dummyResponse)

    await dummyResponse

    console.log(dummyResponse)

    fetchAllPokemon()
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err.message)
      })
  })
})
