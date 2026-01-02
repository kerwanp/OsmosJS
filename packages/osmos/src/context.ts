import { AsyncLocalStorage } from 'node:async_hooks'
import { type PropsWithChildren } from './types/jsx.js'
import { VNODE_CONTEXT_SYMBOL, VNODE_SYMBOL } from './symbols.js'

export function createContext<T>() {
  const storage = new AsyncLocalStorage<T>()

  const Provider = (props: PropsWithChildren<{ value: T }>): JSX.Element => {
    return {
      $$typeof: VNODE_SYMBOL,
      type: VNODE_CONTEXT_SYMBOL,
      props: {
        [VNODE_CONTEXT_SYMBOL]: storage,
        ...props,
      },
    }
  }

  const get = () => {
    return storage.getStore()
  }

  const getOrFail = () => {
    const store = storage.getStore()
    if (!store) {
      throw new Error(`Could not retrieve Context. Did you forget "<Context.Provider />"?`)
    }

    return store
  }

  return { Provider, storage, get, getOrFail }
}
