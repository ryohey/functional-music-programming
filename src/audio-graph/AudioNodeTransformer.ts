import _ from "lodash"
import { composite } from "./composite"
import roomIR from "./medium-room1"
import base64ToArrayBuffer from "../helpers/base64ToArrayBuffer"

export type AudioNodeTransformer = (node: AudioNode) => AudioNode

export const compose = <T>(...transformers: AudioNodeTransformer[]): AudioNodeTransformer =>
  _.flowRight(transformers)

export const gain = (gainValue: number): AudioNodeTransformer => node => {
  const { context } = node
  const gainNode = context.createGain()
  gainNode.gain.setValueAtTime(gainValue, context.currentTime)
  return composite(node, gainNode)
}

export const delay = (delayTime: number, mix: number = 0.3, feedbackGain: number = 0.5): AudioNodeTransformer => node => {
  const { context } = node
  const delayNode = context.createDelay()
  delayNode.delayTime.setValueAtTime(delayTime, context.currentTime)
  
  const input = context.createGain()
  const output = context.createGain()
  const delay = context.createDelay()
  const wetlevel = context.createGain()
  const drylevel = context.createGain()
  const feedback = context.createGain()
  node.connect(input)
  input.connect(delay)
  input.connect(drylevel)
  delay.connect(wetlevel)
  delay.connect(feedback)
  feedback.connect(delay)
  wetlevel.connect(output)
  drylevel.connect(output)

  delay.delayTime.value = delayTime
  feedback.gain.value = feedbackGain
  wetlevel.gain.value = mix
  drylevel.gain.value = 1 - mix

  return composite(node, output)
}

const defaultIRBuffer = base64ToArrayBuffer(roomIR)

export const reverb = (mix: number, irBuffer: ArrayBuffer = defaultIRBuffer): AudioNodeTransformer => input => {
  const { context } = input
  const output = context.createGain()
  const convolver = context.createConvolver()
  const wetlevel = context.createGain()
  const drylevel = context.createGain()

  input.connect(convolver)
  input.connect(drylevel)
  convolver.connect(wetlevel)
  wetlevel.connect(output)
  drylevel.connect(output)
  
  wetlevel.gain.value = mix
  drylevel.gain.value = 1 - mix

  // read ir from base64 string
  {  
    context.decodeAudioData(irBuffer, buffer => {
      convolver.buffer = buffer
    })
  }

  return composite(input, output)
}
