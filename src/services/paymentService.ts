const REDUCED_CONSUMPTION_TAX_RATE = 8
const NORMAL_CONSUMPTION_TAX_RATE = 10

/**
 * 定価を算出する
 * @param priceTexts
 * @param isReducedTax
 */
export const getPaymentTotal = (priceTexts: Array<string>, isReducedTax: boolean): string => {
  let price: number = 0
  let errorText: string = ''

  priceTexts.forEach((priceText: string) => {
    if (isNaN(formatToNumber(priceText))) {
      // 数値に変換できなかった場合
      errorText = 'ERROR'
    } else {
      price += formatToNumber(priceText)
    }
  })

  if (errorText) {
    return errorText
  }

  const taxedPrice = getReducedTax(price, isReducedTax)

  return formatToString(taxedPrice)
}

/**
 * 税率を反映する
 * @param totalPrice
 * @param isReducedTax
 */
export const getReducedTax = (totalPrice: number, isReducedTax: boolean): number => {
  if (isReducedTax) {
    return (totalPrice * (100 + REDUCED_CONSUMPTION_TAX_RATE)) / 100
  }
  return (totalPrice * (100 + NORMAL_CONSUMPTION_TAX_RATE)) / 100
}

/**
 * 数値に変換する
 * @param text
 */
export const formatToNumber = (text: string): number => {
  return parseInt(text)
}

/**
 * 文字列に変換する
 * @param value
 */
export const formatToString = (value: number): string => {
  return value.toString()
}
