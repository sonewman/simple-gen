module.exports = Generator

var key = '0x'

function GenState(prefix) {
  this.prefix = prefix ? prefix : ''
  this.stamp = 0
  this.count = 0
}

function Generator(prefix) {
  this.state = new GenState(prefix)
}

function prefix(s) {
  return s ? key + s + 'x' : ''
}

function keyGen(state) {
  var now = Date.now()
  
  if (state.stamp === now) {
    state.count += 1
  } else {
    state.count = 0
    state.stamp = now
  }

  return prefix(state.prefix) + key + now + 'x' + state.count
}

Generator.prototype.next = function () {
  return keyGen(this.state)
}
