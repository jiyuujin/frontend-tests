import { describe, it, vi } from 'vitest'

describe('fetch-mock test', () => {
  it('Check dummy response', async () => {
    const dummyResponse: any = Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return {
          msg: 'Success',
        }
      },
    })

    const obj = {
      fetch: () => {
        return {
          msg: 'Success',
        }
      },
    }

    const spyFetch = vi.spyOn(obj, 'fetch')
    spyFetch.mockImplementation(() => dummyResponse)

    await dummyResponse

    console.log(dummyResponse)
  })
})
