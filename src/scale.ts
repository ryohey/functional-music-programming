import { PitchValue, Scale, Pitch, Note } from "./types"

export const createScale = (intervals: number[], root: PitchValue): Scale => {
  let prev = root
  return intervals.map(i => {
    const pitch = prev + i
    prev = pitch
    return { pitch }
  })
}

export const majorScale = (root: PitchValue): Scale =>
  createScale([0, 2, 2, 1, 2, 2, 2], root)

// Scale の範囲を超えたらオクターブ上を返す
export const scaleNote = (scale: Scale, index: number): Pitch => 
  ({ pitch: scale[index % scale.length].pitch + Math.floor(index / scale.length) * 12 })

export const triad = (index: number) => (scale: Scale): Pitch[] =>
  [
    scaleNote(scale, index + 0),
    scaleNote(scale, index + 2),
    scaleNote(scale, index + 4),
  ]

export const pitchToNote = (pitch: Pitch): Note => Object.assign({}, pitch, ({
  time: 0,
  duration: 0
}))