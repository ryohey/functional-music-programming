import Soundfont from "soundfont-player"
import { Song } from "./song"

export const play = (song: Song, bpm: number = 120) => {
  const ac = new AudioContext()
  const beatToSeconds = (beat: number) => beat * 60 / bpm
  const soundfont = 'FluidR3_GM'

  Promise.all(song.tracks.map(t =>
    Soundfont.instrument(ac, t.instrument, { soundfont }),
  ))
    .then((instruments: any[]) => {
      instruments.forEach((instrument, i) => {
        const notes = song.tracks[i].notes.map(n => ({
          note: n.pitch,
          time: beatToSeconds(n.time),
          duration: beatToSeconds(n.duration)
        }))
        instrument.schedule(ac.currentTime, notes)
      })
  })
}
