import React from 'react'
import vis from "vis"
import Soundfont from "soundfont-player"
import { Note } from "./music"
import data from "./mysong"

import "vis/dist/vis.css"

const visualize = (notes: Note[]) => {
  const data = notes.map(n => ({
    x: n.time,
    y: n.pitch
  }))
  const container = document.getElementById('visualization') as HTMLElement
  const dataset = new vis.DataSet(data);
  const options = {
    sort: false,
    sampling:false,
    defaultGroup: 'Scatterplot',
    height: '600px'
  };
  new vis.Graph2d(container, dataset, options);
}

class App extends React.Component {
  componentDidMount() {
    visualize(data)

    const ac = new AudioContext()
    const bpm = 120
    const beatToSeconds = (beat: number) => beat * 60 / bpm
    
    Soundfont.instrument(ac, 'percussion', { soundfont: 'FluidR3_GM' }).then((piano: any) => {
      const notes = data.map(n => ({
        note: n.pitch,
        time: beatToSeconds(n.time),
        // duration: beatToSeconds(n.duration)
      }))
      piano.schedule(ac.currentTime, notes)
    })
  }

  public render() {
    return <div id="visualization" />
  }
}

export default App;
