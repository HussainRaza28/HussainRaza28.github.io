import { createContext, useContext } from 'react'

export type Location = { path: string; hash: string; key: number; via: 'initial' | 'push' | 'pop' }

export type Router = {
  location: Location
  navigate: (to: string) => void
  /** True when the page before this one in history is the homepage. */
  cameFromHome: () => boolean
}

export const RouterContext = createContext<Router | null>(null)

export function useRouter() {
  const router = useContext(RouterContext)
  if (!router) throw new Error('useRouter must be used inside RouterProvider')
  return router
}
