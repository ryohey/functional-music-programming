import { PitchValue, Scale, Pitch, Note, ScaleIndex } from "./types"

// circular modulo
const cmod = (i, N) => i < 0 ? i = N + (i % N) : i = i % N

export const createScale = (intervals: number[], root: PitchValue): Scale => {
  let prev = root
  const scale = intervals.map(i => {
    const pitch = prev + i
    prev = pitch
    return { pitch }
  })

  // Scale の範囲を超えたらオクターブ上を返す
  return index => ({ 
    pitch: scale[cmod(index, scale.length)].pitch + Math.floor(index / scale.length) * 12 
  })
}

export const majorScale = (root: PitchValue): Scale =>
  createScale([0, 2, 2, 1, 2, 2, 2], root)

export const naturalMinorScale = (root: PitchValue): Scale =>
  createScale([0, 2, 1, 2, 2, 1, 2], root)

export const harmonicMinorScale = (root: PitchValue): Scale =>
  createScale([0, 2, 1, 2, 2, 1, 3], root)

export const majorPentatonic = (root: PitchValue): Scale =>
  createScale([0, 2, 2, 3, 2], root)

export const naturalMinor = (root: PitchValue): Scale =>
  createScale([0, 2, 1, 2, 2, 1, 2], root)

export const minorPentatonic = (root: PitchValue): Scale =>
  createScale([0, 3, 2, 2, 3], root)

export const melodicMinor = (root: PitchValue): Scale =>
  createScale([0, 2, 1, 2, 2, 2, 2], root)

export const dorianMode = (root: PitchValue): Scale =>
  createScale([0, 2, 1, 2, 2, 2, 1], root)

export const mixolydianModel = (root: PitchValue): Scale =>
  createScale([0, 2, 2, 1, 2, 2, 1], root)

export const minorPentatonicBlues = (root: PitchValue): Scale =>
  createScale([0, 3, 2, 1, 1, 3], root)

export const majorPentatonicBlues = (root: PitchValue): Scale =>
  createScale([0, 2, 1, 1, 3, 2], root)
  
export const triad = (index: ScaleIndex) => (scale: Scale): Pitch[] =>
  [
    scale(index + 0),
    scale(index + 2),
    scale(index + 4),
  ]

export const pitchToNote = (pitch: Pitch): Note => Object.assign({}, pitch, ({
  time: 0,
  duration: 0
}))
