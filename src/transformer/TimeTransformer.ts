import { Transformer, Time, TimeValue } from "../types"
import _ from "lodash"
import { duplicate } from "./Transformer"

export type TimeTransformer = Transformer<Time>

export const move = (time: TimeValue): TimeTransformer => notes =>
  notes.map(n => Object.assign({}, n, {
    time: n.time + time
  }))

export const repeat = (time: TimeValue): TimeTransformer => 
  duplicate(move(time))

export const loop = (count: number, time: TimeValue = 4) =>
  template(_.range(count).map(i => time * i))

// 指定した時間に配置する
export const template = (pattern: TimeValue[]): TimeTransformer => notes =>
  _.flatten(pattern.map(t => move(t)(notes)))

export const stroke = (offset: TimeValue): TimeTransformer => notes =>
  notes.map((n, i) => Object.assign({}, n, {
    time: i * offset
  }))

// x 以外の文字を休符として配置する
// x _ xx_ x _x x_
export const rhythm = (pattern: string, unitTime: number = 1, noteChar: string = "x"): TimeTransformer =>
  template(pattern
    .split("")
    .map((c, i) => c === noteChar ? i * unitTime : -1)
    .filter(t => t >= 0))
