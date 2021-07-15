import { findVowels } from '../../../src/main'

test('Result when input HELLO', () => {
    expect(findVowels('HELLO')).toBe(2)
})

test('Result when input hello', () => {
    expect(findVowels('hello')).toBe(2)
})
