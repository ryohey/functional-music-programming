import _ from "lodash"
import { Song } from "./song"
import { loop, rhythm, stroke, move } from "./transformer/TimeTransformer"
import { majorScale, triad, pitchToNote, naturalMinorScale, harmonicMinorScale } from "./scale"
import { compose } from "./transformer/Transformer"
import { legato } from "./transformer/PeriodTransformer"
import { transpose } from "./transformer/PitchTransformer"
import { Note } from "./types"

const n4th = 1
const n8th = n4th / 2
const n16th = n8th / 2
const nWhole = n4th * 4
const nHalf = n4th * 2

const kick = {
  pitch: 36,
  duration: 1,
  time: 0
}

const snare = {
  pitch: 38,
  duration: 1,
  time: 0
}

const hihat_close = {
  pitch: 42,
  duration: 1,
  time: 0
}

const drums = loop(4, 8)(_.concat(
  rhythm("x _ xx_ x _x x_", n8th)([kick]), 
  rhythm("_ x __x _ x_ _x", n8th)([snare]), 
  loop(8, 1)([hihat_close])
))

const scale = naturalMinorScale(38)

const bass = compose(
  legato(),
  loop(2, 8),
  stroke(1),
)(scale.map(pitchToNote))

const piano = compose<Note>(
  loop(2, 8),
  transpose(12),
)(_.concat(
  move(0)(triad(0)(scale).map(pitchToNote)),
  move(2)(triad(1)(scale).map(pitchToNote)),
))

const song: Song = {
  tracks: [
    {
      instrument: "percussion",
      notes: drums
    },
    {
      instrument: "electric_bass_finger",
      notes: bass
    },
    {
      instrument: "electric_piano_1",
      notes: piano
    }
  ]
}

console.log(song)

export default song
