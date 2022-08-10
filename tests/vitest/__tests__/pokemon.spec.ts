import { describe, expect, it, vi } from 'vitest'
import { default as fetchOriginal } from 'node-fetch'

import { fetchAllPokemon } from '../../../src/services/pokemonService'

const fetch = fetchOriginal as unknown as jest.Mock

describe('fetch-mock test', () => {
  it('Check pokemon response', async () => {
    vi.mock('node-fetch')

    fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ count: 1154 }) }))

    const { count } = await fetchAllPokemon()

    expect(count).toBe(1154)
  })
})
