import {createContext} from 'svelte'
import {useLocalStorage} from './hooks.ts'

export const [getAuthContext, setAuthContext] = createContext<{}>()

useLocalStorage
