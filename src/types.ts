export type PitchValue = number // note number
export type Time = number // beat

export interface Pitch {
  pitch: PitchValue
}

export interface Period {
  duration: Time
  time: Time
}

export type Note = Pitch & Period

export type Rhythm = Period[]

export type Scale = Pitch[]
