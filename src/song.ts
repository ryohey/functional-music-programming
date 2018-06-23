import { Note } from "./music"

export interface Track {
  instrument: string
  notes: Note[]
}

export interface Song {
  tracks: Track[]
}
