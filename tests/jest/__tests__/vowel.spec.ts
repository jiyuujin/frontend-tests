import { findVowels } from '../../../src/services/vowelService'

test('Result when input HELLO', () => {
  expect(findVowels('HELLO')).toBe(2)
})

test('Result when input hello', () => {
  expect(findVowels('hello')).toBe(2)
})
