# Functional Music Programming

Functional & Type-safe Programming for music

## Types

- `Pitch` is the object to represent the pitch
- `Duration` is the object to represent the duration
- `Time` is the object to represent the point in time
- `Period` is `Time & Duration`
- `Note` is `Pitch & Period`
- `Rhythm` is `Period[]`

## Functions

- `Scale = (index: ScaleIndex) => Pitch`
- `Transformer<T> = <S extends T>(notes: S[]) => S[]`

## Transformers

### General

- `compose` makes the composite function
- `duplicate` copies the list elements applied transform

### Time

- `move(time)` returns the function that adds the time to `Time` objects
- `repeat(time)` returns the function that creates copies of `Time` objects moved by time
- `loop(count, time)` returns the function that creates copies of `Time` objects for the loop count
- `template(pattern)` returns the function that creates copies of `Time` objects by the array of timings.
- `stroke(offset)` returns the function that moves notes like a guitar
- `rhythm(pattern, unitTime, noteChar)` returns the function to create a notes from the drum pattern string

### Pitch

- `transpose(pitch)` returns the function that adds the pitch to `Pitch` objects

### Period

- `legato` returns the function that modifies durations to make notes legato

## Defined scales

- `major(root)`
- `naturalMinor(root)`
- `harmonicMinor(root)`
- `majorPentatonic(root)`
- `minorPentatonic(root)`
- `melodicMinor(root)`
- `dorianMode(root)`
- `mixolydianMode(root)`
- `minorPentatonicBlues(root)`
- `majorPentatonicBlues(root)`
- `triad(root)`

## Song writing example

### Drum

```ts
const n4th = 1
const n8th = n4th / 2

const kick = {
  pitch: 36,
  duration: 1,
  time: 0
}

const snare = {
  pitch: 38,
  duration: 1,
  time: 0
}

const hihat_close = {
  pitch: 42,
  duration: 1,
  time: 0
}

const drums = loop(4, 8)(_.concat(
  rhythm("x _ xx_ x _x x_", n8th)([kick]), 
  rhythm("_ x __x _ x_ _x", n8th)([snare]), 
  loop(8, 1)([hihat_close])
))
```

### Chords

```ts
const scale = majorPentatonic(38)

const piano = compose<Note>(
  loop(2, 8),
  transpose(12),
)(_.concat(
  move(0)(triad(0)(scale).map(pitchToNote)),
  move(2)(triad(1)(scale).map(pitchToNote)),
))
```

### Melody

```ts
const melody = compose(
  transpose(24),
  loop(2, 8),
  legato(),
  stroke(1),
)([0, -1, 0, 1, 2, 4, -1, 0].map(i => scale(i)).map(pitchToNote))
```

## Audio Processing

- Render the audio with WebAudio API
- Play songs with the SoundFont
- Support the offline rendering

### Effects

Higher Order Function for applying effects to the AudioNode

- `mix(amount)` mixes two AudioNodes 
- `gain(gainValue)` gains volume
- `delay` adds the delay effect
- `reverb` adds the reverb effect
