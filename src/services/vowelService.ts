/**
 * 母音の数を抽出する
 * @param messageText
 */
export const findVowels = (messageText: string): number => {
  const vowelList: string[] | null = messageText.match(/A|I|U|E|O|a|i|u|e|o/g)
  return vowelList?.length !== undefined ? vowelList?.length : 0
}
