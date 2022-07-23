import { expect, it } from 'vitest'

import { findVowels } from '../../../src/services/vowelService'

it('Result when input HELLO', () => {
  expect(findVowels('HELLO')).toBe(2)
})

it('Result when input hello', () => {
  expect(findVowels('hello')).toBe(2)
})
