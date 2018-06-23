import React from 'react'
import vis from "vis"
import Soundfont from "soundfont-player"
import data from "./mysong"

class App extends React.Component {
  componentDidMount() {
    const ac = new AudioContext()
    const bpm = 120
    const beatToSeconds = (beat: number) => beat * 60 / bpm
    const soundfont = 'FluidR3_GM'

    Promise.all([
      Soundfont.instrument(ac, 'percussion', { soundfont }),
      Soundfont.instrument(ac, 'electric_bass_finger', { soundfont })
    ])
      .then(([drums, bass]: any[]) => {
        {
          const notes = data.drums.map(n => ({
            note: n.pitch,
            time: beatToSeconds(n.time),
            // duration: beatToSeconds(n.duration)
          }))
          drums.schedule(ac.currentTime, notes)
        }

        {
          const notes = data.bass.map(n => ({
            note: n.pitch,
            time: beatToSeconds(n.time),
            // duration: beatToSeconds(n.duration)
          }))
          bass.schedule(ac.currentTime, notes)
        }
    })
  }

  public render() {
    return <div id="visualization" />
  }
}

export default App;
