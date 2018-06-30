import React from 'react'
import song from "./mysong"
import { play } from './player'
import Soundfont from "soundfont-player"
import { gain, compose as composeNodes, delay, reverb } from './audio-graph/AudioNodeTransformer'

async function audioProcessing(ctx: AudioContextBase) {
  console.log("audioProcessing")
  const effect = composeNodes(
    reverb(0.5),
    delay(0.2, 0.4, 0.5),
    gain(0.6),
  )(ctx.createGain())
  effect.connect(ctx.destination)
  await play(song, 120, ctx, effect)
}

function playAudioBuffer(buf) {
  console.log("play")
  const ctx = new AudioContext()
  const song = ctx.createBufferSource();
  song.buffer = buf
  song.connect(ctx.destination)
  song.start()
}

async function doOfflineAudioTest() {
  const ctx = new OfflineAudioContext(2, 44100 * 40, 44100)
  await audioProcessing(ctx)
  const d = Date.now()
  console.log("start rendering")
  const buf = await ctx.startRendering()
  console.log("finish rendering", Date.now() - d)
  playAudioBuffer(buf)
}

class App extends React.Component {
  componentDidMount() {
    doOfflineAudioTest()
      .then(() => console.log("done"))
  }

  public render() {
    return <div id="visualization" />
  }
}

export default App;
