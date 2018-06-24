import _ from "lodash"

type Pitch = number // note number
type Time = number // beat

export interface Note {
  pitch: Pitch
  duration: Time
  time: Time
}

type Transformer = (notes: Note[]) => Note[]
type Scale = Pitch[]
type ScaleTransformer = (scale: Scale) => Scale

export const compose = (...transformers: Transformer[]): Transformer =>
  _.flowRight(transformers)

export const transpose = (pitch: Pitch): Transformer => notes =>
  notes.map(n => ({ 
    ...n, 
    pitch: n.pitch + pitch
  }))

export const duplicate = (transform: Transformer): Transformer => notes => 
  [...notes, ...transform(notes)]

export const move = (time: Time): Transformer => notes =>
  notes.map(n => ({
    ...n,
    time: n.time + time
  }))

export const repeat = (time: Time) => duplicate(move(time))

export const loop = (count: number, time: Time = 4): Transformer =>
  template(_.range(count).map(i => time * i))

// 指定した時間に配置する
export const template = (pattern: Time[]): Transformer => notes =>
  _.flatten(pattern.map(t => move(t)(notes)))

// x 以外の文字を休符として配置する
// x _ xx_ x _x x_
export const rhythm = (pattern: string, unitTime: number = 1, noteChar: string = "x"): Transformer =>
  template(pattern
    .split("")
    .map((c, i) => c === noteChar ? i * unitTime : -1)
    .filter(t => t >= 0))

export const stroke = (offset: Time): Transformer => notes =>
  notes.map((n, i) => ({
    ...n,
    time: i * offset
  }))

export const legato = (): Transformer => notes =>
notes.map((n, i) => {
  const next = notes[i + 1]
  const duration = next !== undefined ? next.time - n.time : n.duration
  return {
    ...n,
    duration
  }
})

/* scale */

export const createScale = (intervals: number[], root: Pitch): Scale => {
  let prev = root
  return intervals.map(i => {
    const p = prev + i
    prev = p
    return p
  })
}

export const majorScale = (root: Pitch): Scale =>
  createScale([0, 2, 2, 1, 2, 2, 2], root)

// Scale の範囲を超えたらオクターブ上を返す
export const scaleNote = (scale:Scale, index: number): Pitch => 
  scale[index % scale.length] + Math.floor(index / scale.length) * 12

export const triad = (index: number): ScaleTransformer => scale =>
  [
    scaleNote(scale, index + 0),
    scaleNote(scale, index + 2),
    scaleNote(scale, index + 4),
  ]

export const pitchToNote = (pitch: Pitch): Note => ({
  pitch,
  duration: 0,
  time: 0
})

/*
const data = compose(
  loop(30, 4),
  repeat(1/2),
  duplicate(transpose(5))
)([noteC])
*/
