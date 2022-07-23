import { getPaymentTotal } from '../../../src/services/paymentService'

test('Result when input ¥100 with reduced tax', () => {
  expect(getPaymentTotal(['100'], true)).toBe('108')
})

test('Result when input ¥100', () => {
  expect(getPaymentTotal(['100'], false)).toBe('110')
})

test('Result when input abc with reduced tax', () => {
  expect(getPaymentTotal(['abc'], true)).toBe('ERROR')
})

test('Result when input abc', () => {
  expect(getPaymentTotal(['abc'], false)).toBe('ERROR')
})
