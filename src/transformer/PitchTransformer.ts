import { Transformer, Pitch, PitchValue } from "../types"

export type PitchTransformer = Transformer<Pitch>

export const transpose = (pitch: PitchValue): PitchTransformer => notes =>
  notes.map(n => Object.assign({}, n, { 
    pitch: n.pitch + pitch
  }))
