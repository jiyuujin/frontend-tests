---
title: 'Jest を導入する'
---

# Jest を導入する

[Pokemon アプリ (CRA)](https://github.com/jiyuujin/pokemon) のユニットテストを書いていくことを目指します。

https://github.com/jiyuujin/pokemon

それに向けてまずは Jest 単体でその挙動を確認しつつ、下記のように段階を踏んで進めることとします。

- Jest 単体でその挙動を確認する
- React に Jest を組み込んでその挙動を確認する

[CRA](https://www.npmjs.com/package/create-react-app) (create-react-app) や、目下流行っているとされる [Next.js](https://www.npmjs.com/package/next) の下でユニットテストを書く際に、ほぼ間違い無く Jest でユニットテストを書いていることでしょう。

また最近ぽっと出てきた [Vitest](https://vitest.dev/) でユニットテストを書く際も、事前に Jest でユニットテストを書いておけるようになっておくことをおすすめします。

そうした背景があってこそ、互いに Jest と Vitest は相通ずる部分が多いからです。

## Jest 開発環境を構築する

事前に [Node.js 環境構築](https://reactjs.nekohack.me/#node-js-%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89) が終わっていることを確認します。

今回も TypeScript でユニットテストを書くため、それに必要な依存関係をインストールします。

```bash
npm install -D @types/jest jest ts-jest
```

`@types/***` のような prefix が付いている場合は型定義用のプラグインを表しています。

今回こうしたプラグインをインストールしているので `tsconfig.json` の `types` に型定義を追加します。

```json
{
  "compilerOptions": {
    "types": ["@types/jest"]
  }
}
```

`package.json` に `jest` プロパティを追加することで、最低限ユニットテストを行えるようにします。

```json
{
  "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$"
  }
}
```

### ディレクトリ構成

ディレクトリ構成はざっくり下記の通りです。

```
+
| -- __tests__
| -- src
| -- package.json
| -- tsconfig.json
```

実行メソッドとそれに付随するユニットテスト、それぞれのディレクトリに分ける方が良い。

- 実行メソッドを `src` 配下に置く
- テストメソッドを `__tests__` に置く

## React に Jest を組み込む

[Pokemon アプリ (CRA)](https://github.com/jiyuujin/pokemon) の製作を終えていることとします。

CRA (create-react-app) で構築した場合は、既にデフォルトで Jest が入っています。

```bash
# react-scripts test
npm run test
```

:::details CRA 内包の Jest を使用する際に注意すること。

- CRA に内包されている Jest では testEnvironment に `jsdom` が既に設定されている

:::

しかしこれだけでは動きません。

今回 TypeScript で書いており package.json で ts-jest を読み込む必要があります。

```json
{
  "jest": {
    "transform": {
      ".(ts|tsx)": "ts-jest"
    }
  }
}
```

コンポーネントに CSS を使っており、事前に identity-obj-proxy を読み込む必要があります。

モックのテストではしばしば identity-obj-proxy が使用されています。

```json
{
  "jest": {
    "moduleNameMapper": {
      ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy"
    }
  }
}
```

またアセット (画像) を使っている場合も、事前にモックを使用する必要があります。

```js
module.exports = 'test-file-stub'
```

```json
{
  "jest": {
    "moduleNameMapper": {
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js"
    }
  }
}
```

改めて `npm run test` を実行すると、上手くテストが動作していることを確認できます。

## テスト課題

ユニットテスト (Jest) の [サンプル](https://github.com/jiyuujin/frontend-tests) を書きながら、実際に React で製作した Web アプリ [Pokemon アプリ (CRA)](https://github.com/jiyuujin/pokemon) のユニットテストも書くことにトライしてみましょう。

- 特定の DOM に対し props から値が渡されているか、文字列を確認しましょう
- 非同期コード (SWR) のテストを書きましょう
- snapshot を撮影しましょう

### 母音を抽出する

母音を抽出しその個数を返すメソッド `findVowels()` と、それに付随するテストを作成してください。

ただし、母音は `a|i|u|e|o` を表し、大文字・小文字を区別します。

また `findVowels()` は文字列 `string` 型で受け取って、数値 `number` 型で返します。

### 税込価格を算出する

税込価格を算出するメソッド `getPaymentTotal()` と、それに付随するテストを作成してください。

ただし軽減税率有の場合は `8%` の税率を、軽減税率無の場合は `10%` の税率を付加します。

また `getPaymentTotal()` は文字列 `string` 型しか受け取ることができず、文字列 `string` 型しか返すことができません。

### 非同期コードを検証する

[Pokemon アプリ (CRA)](https://github.com/jiyuujin/pokemon) でとり上げた [Pokemon API](https://pokeapi.co) における非同期通信の処理メソッドと、それに伴うテストを作成してください。

ただし非同期通信の処理メソッドは [node-fetch](https://www.npmjs.com/package/node-fetch) を利用します。ここで TypeScript で書く場合は専用の型定義用プラグイン [@types/node-fetch](https://www.npmjs.com/package/@types/node-fetch) を、上記に伴うテストは [fetch-mock](https://www.npmjs.com/package/fetch-mock) も合わせてインストールしながら非同期通信に使う API のモックを使って書きます。

### snapshot を撮影する

初期設定のまま進めていただくと snapshot の成果物は `src/__snapshots__` に吐き出されます。

## テスト課題の解答例

### 母音を抽出する

::: details 解答例
実行メソッド `findVowels()` は下記の通りです。

```ts
export const findVowels = (messageText: string): number => {
  const vowelList: string[] | null = messageText.match(/A|I|U|E|O|a|i|u|e|o/g)
  return vowelList?.length !== undefined ? vowelList?.length : 0
}

const result = findVowels('HELLO')
console.log(result)
```

実行メソッド `findVowels()` に付随するユニットテストは下記の通りです。

```ts
import { findVowels } from '../src/main'

test('Result when input HELLO', () => {
  expect(findVowels('HELLO')).toBe(2)
})
```

:::

### 税込価格を算出する

::: details 解答例
実行メソッド `getPaymentTotal()` は下記の通りです。

```ts
export const getPaymentTotal = (priceTexts: Array<string>, isReducedTax: boolean): string => {
  let price: number = 0
  let errorText: string = ''

  priceTexts.forEach((priceText: string) => {
    if (isNaN(parseInt(priceText))) {
      // 数値に変換できなかった場合
      errorText = 'ERROR'
    } else {
      price += parseInt(priceText)
    }
  })

  if (errorText) {
    return errorText
  }

  const taxedPrice = getReducedTax(price, isReducedTax)

  return taxedPrice.toString()
}

export const getReducedTax = (totalPrice: number, isReducedTax: boolean): number => {
  if (isReducedTax) {
    return (totalPrice * (100 + 8)) / 100
  }
  return (totalPrice * (100 + 10)) / 100
}

const priceA = getPaymentTotal(['210', '430', '760'], true)
const priceB = getPaymentTotal(['800', '250'], false)
const priceC = getPaymentTotal(['abc'], true)
const priceD = getPaymentTotal(['abc'], false)
console.log(priceA)
console.log(priceB)
console.log(priceC)
console.log(priceD)
```

実行メソッド `getPaymentTotal()` に付随するユニットテストは下記の通りです。

```ts
import { getPaymentTotal } from '../src/main'

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
```

:::

### 非同期コードを検証する

::: details 解答例
[Pokemon アプリ (CRA)](https://github.com/jiyuujin/pokemon) では swr を利用したが、その代わりに node-fetch を用いることができます。

```bash
npm i @types/node-fetch node-fetch fetch-mock
```

非同期通信に使う API の mock を読み込みます。

```json
{
  "jest": {
    "testEnvironment": "node",
    "setupFiles": ["./setup-files.js"]
  }
}
```

Jest でも node-fetch が使えるように mock を設定します。

```js
jest.mock('node-fetch', () => global.fetch)
```

`__mocks__/node-fetch.js` を作成します。

```js
const nodeFetch = jest.requireActual('node-fetch')
const fetchMock = require('fetch-mock').sandbox()

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
})

module.exports = fetchMock
```

実際の処理メソッドは下記の通りです。

```tsx
const fetch = require('node-fetch')

export const fetchAllPokemon = async (): Promise<any> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=200`)
  const data = await res.json()
  return data
}
```

`https://pokeapi.co/api/v2/pokemon` から正しく届いているか、レスポンスを確認します。

```tsx
import fetch from 'node-fetch'

import { fetchAllPokemon } from '../../../src/services/pokemonService'

jest.mock('node-fetch', () => {
  return jest.fn()
})

describe('fetch-mock test', () => {
  it('Check pokemon response', async () => {
    jest.mock('node-fetch')

    fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ count: 1154 }) }))

    const { count } = await fetchAllPokemon()

    expect(count).toBe(1154)
  })
})
```

:::

### snapshot を撮影する

::: details 解答例
snapshot の撮影も [@testing-library/react](https://www.npmjs.com/package/@testing-library/react) を利用します。

https://testing-library.com/

```bash
npm install -D @testing-library/react
```

ここで React Testing Library 自体にも明確な担当領域を持つため Jest の代わりとして使うことはありません。

@testing-library/react の基本は `render` 関数です。

```tsx
import { render } from '@testing-library/react'

import { Card } from './Card'

test('Render component', () => {
  const { component } = render(
    <Card
      pokemon={{
        name: 'unown',
        url: 'https://pokeapi.co/api/v2/pokemon/201/',
      }}
    />,
  )
})
```

`render` の戻り値を使って `expect` を記述します。

```tsx
import { render } from '@testing-library/react'

import { Card } from './Card'

test('Render component', () => {
  const { component } = render(
    <Card
      pokemon={{
        name: 'unown',
        url: 'https://pokeapi.co/api/v2/pokemon/201/',
      }}
    />,
  )
  expect(component()).toMatchSnapshot()
})
```

なお [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) を利用しても screenshot を撮影できる一方、既に @testing-library/react へ置き換えられているというのが実際の現状でもあります。

続いて props から正しく値が渡されているか、文字列を確認します。

`render` の戻り値を使って `expect` を記述します。

```tsx
import { render } from '@testing-library/react'

import { Card } from './Card'

test('Confirm text', () => {
  const component = render(
    <Card
      pokemon={{
        name: 'unown',
        url: 'https://pokeapi.co/api/v2/pokemon/201/',
      }}
    />,
  )
  expect(component.getAllByText('Unown')).toHaveLength(1)
})
```

非同期コード (SWR) のテストを書きます。

```tsx
import { SWRConfig } from 'swr'
import { render } from '@testing-library/react'

import App from './App'

it('Check response', async () => {
  render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <App />
    </SWRConfig>,
  )
})
```

非同期コード (SWR) をテストする際、カスタマイズして書くこともできます。

```tsx
import React from 'react'
import { SWRConfig } from 'swr'
import { render } from '@testing-library/react'

import App from './App'

it('Check custom response', async () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
  }

  const customRender = (ui: React.ReactElement, options?: any) =>
    render(ui, { wrapper, ...options })

  console.log(customRender)
})
```

:::
