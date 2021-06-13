import { writable } from 'svelte/store'

// Data
export const stories = writable([])
export const selectedThemes = writable([])
export const walk = writable([])

// Audio player
export const play = writable(true)
export const progress = writable(0)
export const audioIndex = writable(0)

// Server side collection
export const treeCollection = writable(null)
