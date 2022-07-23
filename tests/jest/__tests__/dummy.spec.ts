import fetch from 'node-fetch'

jest.mock('node-fetch', () => {
  return jest.fn()
})

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

    const spyFetch = fetch as jest.MockedFunction<typeof fetch>
    spyFetch.mockImplementation(() => dummyResponse)

    await dummyResponse

    console.log(dummyResponse)
  })
})
