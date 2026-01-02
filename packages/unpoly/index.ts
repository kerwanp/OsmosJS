export type * from './src/types.js'

import './src/extension.js'
import { Fragment, Slot } from './src/components/fragment.jsx'
export { UnpolyContext, UnpolyProvider } from './src/components/provider.jsx'

export const Up = {
  Fragment,
  Slot,
}
