import _ from "lodash"
import { composite } from "./composite"
import roomIR from "./medium-room1"
import base64ToArrayBuffer from "../helpers/base64ToArrayBuffer"

export type AudioNodeTransformer = (node: AudioNode) => AudioNode

export const compose = <T>(...transformers: AudioNodeTransformer[]): AudioNodeTransformer =>
  _.flowRight(transformers)

export const mix = (amount: number = 0.5) => (fx: AudioNodeTransformer): AudioNodeTransformer => input => {
  const { context } = input
  
  const output = context.createGain()
  const fxNode = fx(context.createGain())
  const wetlevel = context.createGain()
  const drylevel = context.createGain()
  input.connect(fxNode)
  input.connect(drylevel)
  fxNode.connect(wetlevel)
  wetlevel.connect(output)
  drylevel.connect(output)

  wetlevel.gain.value = amount
  drylevel.gain.value = 1 - amount

  return composite(input, output)
}

export const gain = (gainValue: number): AudioNodeTransformer => input => {
  const { context } = input
  const gainNode = context.createGain()
  gainNode.gain.setValueAtTime(gainValue, context.currentTime)
  input.connect(gainNode)
  return composite(input, gainNode)
}

export const delay = (delayTime: number, feedbackGain: number = 0.5): AudioNodeTransformer => input => {
  const { context } = input
  const delayNode = context.createDelay()
  delayNode.delayTime.setValueAtTime(delayTime, context.currentTime)
  
  const delay = context.createDelay()
  const feedback = context.createGain()
  input.connect(delay)
  delay.connect(feedback)
  feedback.connect(delay)

  delay.delayTime.value = delayTime
  feedback.gain.value = feedbackGain

  return composite(input, delay)
}

const defaultIRBuffer = base64ToArrayBuffer(roomIR)

export const reverb = (irBuffer: ArrayBuffer = defaultIRBuffer): AudioNodeTransformer => input => {
  const { context } = input
  const convolver = context.createConvolver()

  input.connect(convolver)

  // read ir from base64 string
  {  
    context.decodeAudioData(irBuffer, buffer => {
      convolver.buffer = buffer
    })
  }

  return composite(input, convolver)
}
