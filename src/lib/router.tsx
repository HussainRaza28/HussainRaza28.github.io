import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { RouterContext, useRouter, type Location } from './router-context'

/*
  A small router on the History API. Pages are real paths (/work/skypane),
  so links can be opened in new tabs and shared. Native scrolling is kept;
  the router only decides where a page starts:

  - Going forward: top of the page, or the #section in the link.
  - Going back or forward through history: the exact scroll position the
    visitor left, saved on their history entry before they navigated.
  - Reloading: the position from before the reload.
*/

const normalize = (path: string) => path.replace(/\/+$/, '') || '/'

const read = (via: Location['via'], key: number): Location => ({
  path: normalize(window.location.pathname),
  hash: window.location.hash,
  key,
  via,
})

const saveScroll = () => {
  window.history.replaceState({ ...(window.history.state ?? {}), scrollY: window.scrollY }, '')
}

const scrollToHash = (hash: string) => {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (!target) return false
  target.scrollIntoView()
  return true
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(() => read('initial', 0))

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const onPop = () => setLocation((prev) => read('pop', prev.key + 1))
    // Keep the current entry's position up to date, so the browser's own
    // Back and Forward buttons land where the visitor left off too.
    let timer = 0
    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(saveScroll, 150)
    }
    window.addEventListener('popstate', onPop)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', saveScroll)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', saveScroll)
    }
  }, [])

  useLayoutEffect(() => {
    const saved = window.history.state?.scrollY
    if (location.via !== 'push' && typeof saved === 'number') {
      window.scrollTo(0, saved)
    } else if (!scrollToHash(location.hash) && location.via !== 'initial') {
      window.scrollTo(0, 0)
    }
  }, [location])

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.href)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)
      return
    }
    const from = normalize(window.location.pathname)
    saveScroll()
    window.history.pushState({ from }, '', url.pathname + url.search + url.hash)
    if (normalize(url.pathname) === from && url.hash) {
      scrollToHash(url.hash)
      return
    }
    setLocation((prev) => read('push', prev.key + 1))
  }, [])

  const cameFromHome = useCallback(() => window.history.state?.from === '/', [])

  const value = useMemo(() => ({ location, navigate, cameFromHome }), [location, navigate, cameFromHome])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** An in-site link: a real <a> that navigates without a full page load. */
export function Link({ href, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter()
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target
    ) {
      return
    }
    event.preventDefault()
    navigate(href)
  }
  return <a href={href} onClick={handle} {...rest} />
}
