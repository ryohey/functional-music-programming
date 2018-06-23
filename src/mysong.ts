import { loop, rhythm } from "./music"
import _ from "lodash"

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

export default loop(4, 8)(_.concat(
  rhythm("x _ xx_ x _x x_", n8th)([kick]), 
  rhythm("_ x __x _ x_ _x", n8th)([snare]), 
  loop(8, 1)([hihat_close])
))
