import { Transformer, Period } from "../types"

export type PeriodTransformer = Transformer<Period>

export const legato = (): PeriodTransformer => notes =>
  notes.map((n, i) => {
    const next = notes[i + 1]
    const duration = next !== undefined ? next.time - n.time : n.duration
    return Object.assign({}, n, {
      duration
    })
  })
