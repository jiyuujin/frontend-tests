import { assert } from 'chai'

import { getPaymentTotal } from '../../../src/services/paymentService'

it('Result when input ¥100 with reduced tax', () => {
  assert.equal(getPaymentTotal(['100'], true), '108')
})

it('Result when input ¥100', () => {
  assert.equal(getPaymentTotal(['100'], false), '110')
})

it('Result when input abc with reduced tax', () => {
  assert.equal(getPaymentTotal(['abc'], true), 'ERROR')
})

it('Result when input abc', () => {
  assert.equal(getPaymentTotal(['abc'], false), 'ERROR')
})
