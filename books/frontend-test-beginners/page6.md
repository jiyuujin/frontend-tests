---
title: 'Redux 併用のテストを書く'
---

## Redux 併用のテストを書く

今回は初心者を対象に執筆しているので、これより後の内容については参考程度に読んでいただければ幸いです。

詳細については [ブログ](https://webneko.dev/) で書ければと考えています。

この応用編におけるアウトラインは下記の通りです。

- Redux を使用している場合

### Redux と Jest を使用する

モーダルの中でユーザー名を入力できるようにした際、そのステートを Redux で管理することを目指します。

- モーダルを閉じた時にユーザー名を保存する

```tsx
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useModal = () => {
  const dispatch = useDispatch()

  const globalClose = useCallback(() => {
    dispatch(closeUserModal('userName'))
  }, [dispatch])

  return {
    dummy: useSelector((state: State) => state.modal),
    globalClose,
  }
}
```

::: details 解答例。
Redux を使用している場合には、モックが必要となります。

```tsx
const mockDispatch = jest.fn()
const mockSelector = jest.fn().mockImplementation(() => ({
  status: '',
  result: '',
}))

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector(),
}))
```

`useModal` の結合テストについて、簡単に解説させていただきます。

@testing-library/react-hooks の `renderHook` を利用することで Hooks 単体で結合テストを書けるようになります。

```tsx
describe('useModal', () => {
  let result = renderHook(() => useModal()).result

  beforeEach(() => {
    result = renderHook(() => useModal()).result
  })
})
```

```tsx
describe('useModal', () => {
  it('should false (default)', () => {
    expect(result.current.dummy).toEqual({
      status: '',
      result: '',
    })
  })

  it('should call a dispatch function at once', () => {
    act(() => {
      result.current.globalClose()
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })

  it('should call a valid action', () => {
    act(() => {
      result.current.globalClose()
    })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CLOSE_MODAL',
      payload: { userName: 'userName' },
    })
  })

  it('should get updated the one', () => {
    mockSelector.mockImplementationOnce(() => ({
      status: 'loading',
      result: '',
    }))

    result = renderHook(() => useModal()).result

    expect(result.current.dummy).toEqual({
      status: 'loading',
      result: '',
    })
  })
})
```
:::
