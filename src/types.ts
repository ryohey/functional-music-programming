export type PitchValue = number // note number
export type TimeValue = number // beat

export type Pitch = {
  pitch: PitchValue
}

export type Duration = {
  duration: TimeValue
}

export type Time = {
  time: TimeValue
}

export type Period = Time & Duration

export type Note = Pitch & Period

export type Rhythm = Period[]

export type ScaleIndex = number

export type Scale = (index: ScaleIndex) => Pitch

export type Transformer<T> = <S extends T>(notes: S[]) => S[]
