import { writable } from 'svelte/store'

export const stories = writable([])
export const selectedThemes = writable([])
export const walk = writable([])

export const play = writable(false)
export const progress = writable(0)
export const audioIndex = writable(0)
