import { writable } from 'svelte/store'

export const useLocalStorage = <T>(key: string, init: T) => {
  const store = writable<T>(init, (set) => {
    try {
      set(JSON.parse(localStorage.getItem(key) ?? 'null'))
    } catch (e) {
      console.error(e)
    }
  })

  store.subscribe((val) => {
    try {
      if (val === null) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {
      console.error(e)
    }
  })

  return store
}

export const useSessionStorage = <T>(key: string, init: T) => {
  const store = writable<T>(init, (set) => {
    try {
      set(JSON.parse(sessionStorage.getItem(key) ?? 'null'))
    } catch (e) {
      console.error(e)
    }
  })

  store.subscribe((val) => {
    try {
      if (val === null) sessionStorage.removeItem(key)
      else sessionStorage.setItem(key, JSON.stringify(val))
    } catch (e) {
      console.error(e)
    }
  })

  return store
}
