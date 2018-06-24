import { Note } from "./types"

export interface Track {
  instrument: string
  notes: Note[]
}

export interface Song {
  tracks: Track[]
}
