// https://github.com/GoogleChromeLabs/web-audio-samples/wiki/CompositeAudioNode

AudioNode.prototype._connect = AudioNode.prototype.connect
AudioNode.prototype.connect = function() {
  var args = Array.prototype.slice.call(arguments)
  if (args[0]._isCompositeAudioNode)
    args[0] = args[0]._input
  
  this._connect.apply(this, args)
}

module.exports = class CompositeAudioNode {  
  constructor(context, input, output) {
    this.context = context
    this._input = context.createGain()
    this._output = context.createGain()
    
    this._input.connect(input)
    output.connect(this._output)
  }

  get _isCompositeAudioNode() {
    return true
  }
  
  connect() {
    this._output.connect.apply(this._output, arguments)
    return this
  }
  
  disconnect() {
    this._output.disconnect.apply(this._output, arguments)
  }

  get channelCount() {
    return this._input.channelCount
  }

  get channelCountMode() {
    return this._input.channelCountMode
  }

  get channelInterpretation() {
    return this._input.channelInterpretation
  }

  get numberOfInputs() {
    return this._input.numberOfInputs
  }

  get numberOfOutputs() {
    return this._output.numberOfOutputs
  }

  addEventListener() {}
  dispatchEvent() { return true }
  removeEventListener() {}
}
