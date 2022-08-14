---
title: 'Vitest を導入する'
---

:::message

現時点で Vitest は 1.0 正式版ではない点に注意してください。

:::

# Vitest を導入する

[Pokemon アプリ (Vite)](https://github.com/jiyuujin/pokemon-vite) のユニットテストを書いていくことを目指します。

https://github.com/jiyuujin/pokemon-vite

それに向けてまずは Vitest 単体でその挙動を確認しつつ、下記のように段階を踏んで進めることとします。

- Vitest 単体でその挙動を確認する
- React に Vitest を組み込んでその挙動を確認する

事前に [Jest](https://jestjs.io/) を使っていれば、すんなりと [Vitest](https://vitest.dev/) にも慣れると考えています。

## そもそも Vite とは

Vue の作者である Evan You 氏が中心となって開発されているビルドツールで、なお Vite を「ヴィート」と読んでください。

https://vitejs.dev/

Vite 上で React の Web アプリを製作するハンズオンを先日、行わせていただきました。

LINE Developers コミュニティ主催の下、執筆しています。

https://zenn.dev/jiyuujin/books/react-x-vite-x-liff

## Vitest 開発環境を構築する

事前に [Node.js 環境構築](https://reactjs.nekohack.me/#node-js-%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89) が終わっていることを確認します。

今回も TypeScript でユニットテストを書くため、それに必要な依存関係をインストールします。

```bash
npm install -D vitest
```

`@types/***` のような prefix が付いている場合は型定義用のプラグインは不要です。

`vite.config.js` に `test` プロパティを追加することで、最低限ユニットテストを行えるようにします。

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    //
  },
})
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

## React に Vitest を組み込む

[Pokemon アプリ (Vite)](https://github.com/jiyuujin/pokemon-vite) の製作を終えていることとする。

Vite で構築した場合は、別途 [Vitest](https://www.npmjs.com/package/vitest) をインストールする必要があります。

https://www.npmjs.com/package/vitest

```bash
# vitest
npm run test
```

しかしこれだけでは動きません。

今回 Vitest のデフォルト環境で jsdom を読み込む必要があります。

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

改めて `npm run test` を実行すると、上手くテストが動作していることを確認できます。

基本的には Jest と比較しても、事前に設定する内容は少なく済むと考えています。

## テスト課題

ユニットテスト (Vitest) の [サンプル](https://github.com/jiyuujin/frontend-tests) と、React で製作した Web アプリ [Pokemon アプリ (Vite)](https://github.com/jiyuujin/pokemon-vite) にアプローチします。

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

[Pokemon アプリ (Vite)](https://github.com/jiyuujin/pokemon-vite) でとり上げた [Pokemon API](https://pokeapi.co) における非同期通信の処理メソッドと、それに伴うテストを作成してください。

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

it('Result when input HELLO', () => {
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

it('Result when input ¥100 with reduced tax', () => {
  expect(getPaymentTotal(['100'], true)).toBe('108')
})

it('Result when input ¥100', () => {
  expect(getPaymentTotal(['100'], false)).toBe('110')
})

it('Result when input abc with reduced tax', () => {
  expect(getPaymentTotal(['abc'], true)).toBe('ERROR')
})

it('Result when input abc', () => {
  expect(getPaymentTotal(['abc'], false)).toBe('ERROR')
})
```

:::

### 非同期コードを検証する

::: details 解答例
まずはシンプルに node-fetch を利用した場合のテストを、そして [Pokemon アプリ (Vite)](https://github.com/jiyuujin/pokemon-vite) で swr を利用した場合のテストを書くことができます。

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

なお、 Vitest では Jest のような mock を設定しなくてもテストを書くことができます。

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
describe('fetch-mock test', () => {
  it('Check pokemon response', async () => {
    vi.mock('node-fetch')

    fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ count: 1154 }) }))

    const { count } = await fetchAllPokemon()

    expect(count).toBe(1154)
  })
})
```

また SWR を利用した際の処理メソッドは、下記の通りです。

```tsx
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const { data, error } = useSWR(
  `${import.meta.env.VITE_APP_POKEMON_API}/pokemon?limit=200&offset=200`,
  fetcher,
)
```

`https://pokeapi.co/api/v2/pokemon` から正しく届いているか、レスポンスを確認します。

```tsx
import { it } from 'vitest'
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

### snapshot を撮影する

::: details 解答例
snapshot を撮影します。

```tsx
import React from 'react'
import renderer from 'react-test-renderer'

import { Card } from './Card'

test('Render component', () => {
  const component = renderer.create(
    <Card
      pokemon={{
        name: 'unown',
        url: 'https://pokeapi.co/api/v2/pokemon/201/',
      }}
    />,
  )
  expect(component).toMatchSnapshot()
})
```

props から正しく値が渡されているか、文字列を確認します。

```tsx
import React from 'react'
import renderer from 'react-test-renderer'
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
