import { assert } from 'chai'

import { findVowels } from '../../../src/main'

it('Result when input HELLO', () => {
    assert.equal(findVowels('HELLO'), 2)
})

it('Result when input hello', () => {
    assert.equal(findVowels('hello'), 2)
})
