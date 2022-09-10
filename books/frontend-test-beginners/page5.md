---
title: 'Jest で Testing Library を利用する'
---

# Jest で Testing Library を利用する

これまで Jest や Vitest を導入する方法について学習しましたが、この章では [@testing-library/react-hook](https://www.npmjs.com/package/@testing-library/react-hooks) と [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) を使用します。

https://www.npmjs.com/package/@testing-library/react-hooks

https://www.npmjs.com/package/@testing-library/user-event

こちらはいずれも、ユニットテストを簡潔に書けるようにしたライブラリで、最低限 Jest と Vitest の動作する環境が整っていれば容易に使用できます。

今回は特に、下記のポイントを中心にチェックしてみたいと考えています。

- カスタムフックの処理についてテストを書く
- ユーザーの振る舞いについてテストを書く

開発を進めていくと単調なロジックを書くだけでとどまりません。ユニットテストを書けたら、次は結合テストを書きたいと考えさせられます。

## カスタムフックの処理についてテストを書く

[@testing-library/react-hook](https://www.npmjs.com/package/@testing-library/react-hooks) を使うことで React Hook に対するテストも書けるようになります。

```bash
npm i -D @testing-library/react-hook

yarn add -D @testing-library/react-hook
```

https://www.npmjs.com/package/@testing-library/react-hooks

では、実際にテストを書くため、適当な Hook を作成してみましょう。

### モーダル処理のテスト

モーダルの処理を React Hooks で書き、そのテストを Jest で書きます。

まずは、モーダルの処理を整理します。

- モーダルを開く
- モーダルを閉じる
- 何らかの処理を行う

それを踏まえつつ、データの持ち方を考えます。

Hooks 内でモーダルが開いているかというステートが必要です。

```tsx
import { useCallback, useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const toggle = useCallback(() => {
    setIsOpen(!modal)
  }, [isOpen, setIsOpen])

  return { isOpen, open, close, toggle }
}
```

::: details 解答例
`useModal` のテストについて、簡単に解説させていただきます。実際に @testing-library/react-hooks の `renderHook` を利用することで、各 Hooks を読み込むことができます。

`describe` というグループの中で `it` ごとに書かれたテストが実行される度に `beforeEach` も合わせて実行されるという仕様で、それぞれ Hooks を読み込みます。

```tsx
import { renderHook, act } from '@testing-library/react-hooks'

describe('useModal', () => {
  let result = renderHook(() => useModal()).result

  beforeEach(() => {
    result = renderHook(() => useModal()).result
  })
})
```

また @testing-library/react-hooks の `act` を利用することで、関数を実行させられる結合テストを書けるようになります。

```tsx
import { renderHook, act } from '@testing-library/react-hooks'

describe('useModal', () => {
  let result = renderHook(() => useModal()).result

  beforeEach(() => {
    result = renderHook(() => useModal()).result
  })

  afterEach(() => {
    mockDispatch.mockClear()
  })

  it('should modal is false by default', () => {
    expect(result.current.modal).toEqual(false)
  })
})
```

:::

## ユーザーの振る舞いについてテストを書く

[@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) を利用してユーザーの振る舞いについてテストを書きます。

```bash
npm i -D @testing-library/user-event

yarn add -D @testing-library/user-event
```

https://www.npmjs.com/package/@testing-library/user-event

では、実際にテストを書くため、適当な Hook を作成してみましょう。

### ボタンにおける発火処理のテスト

ボタンにおける発火処理を Components で書き、そのテストを Jest で書きます。

```tsx
export const Button = ({ children, onClick }) => {
  const handleClick = (e: any) => {
    onClick()
  }

  return (
    <button role="button" onClick={handleClick}>{children}</button>
  )
}
```

ボタン発火用に作成したメソッド `onClick` のテストについて書いてみましょう。

::: details 解答例
Button における `onClick` のテストについて、簡単に解説させていただきます。実際に @testing-library/user-event の `userEvent` を利用することで、各 Hooks を読み込むことができます。

@testing-library/react-hooks の `render` を利用することで、関数を実行させられるテストを書けるようになります。

`jest.fn()` という **モック** を作成することで、テスト実行時にボタンを発火させることができます。

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

describe('Button', () => {
  it('should call onClick', async () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>{'Test Label'}</Button>)
  })
})
```

@testing-library/user-event の `userEvent` を利用することで、テスト実行時にユーザーがボタンをクリックした時の挙動を再現させられるテストを書けるようになります。

`screen.getByRole()` に role の名前を入力してテストを実行することで、モック作成によってボタンを発火させることができます。

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

describe('Button', () => {
  it('should call onClick', async () => {
    const onClickMock = jest.fn()

    await userEvent.click(screen.getByRole('button'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
```
:::
