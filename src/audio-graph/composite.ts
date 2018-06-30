import CompositeAudioNode from "composite-audio-node"

console.log(CompositeAudioNode)

// input と output を合成したノードを作る
export const composite = (input: AudioNode, output: AudioNode): AudioNode => {
  return new CompositeAudioNode(input.context, input, output) as AudioNode
}
