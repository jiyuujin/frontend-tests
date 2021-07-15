import { findVowels } from '../../../src/main'

it('Result when input HELLO', () => {
    expect(findVowels('HELLO')).toBe(2)
})

it('Result when input hello', () => {
    expect(findVowels('hello')).toBe(2)
})
