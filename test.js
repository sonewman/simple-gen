var desc = require('macchiato')

desc('generate key')
.beforeEach(function () {
  this.time1 = 1421287155611
  this.time2 = 1421287155612
})
.it('should generate key based on time', function () {
  var orgNow = Date.now;
  this.stub(Date, 'now').returns(this.time1)
  var gen = new Generator()
  this.expect(gen.next()).equals('0x1421287155611x0')
  Date.now = orgNow;
  this.end()
})
.it('should generate key including supplied prefix', function () {
  var orgNow = Date.now;
  this.stub(Date, 'now').returns(this.time1)
  var gen = new Generator('PREFIX')
  this.expect(gen.next()).equals('0xPREFIXx0x1421287155611x0')
  Date.now = orgNow;
  this.end()
})
.it('should increment index if two keys are created during the same millisecond', function () {
  var orgNow = Date.now;
  this.stub(Date, 'now')
    .onFirstCall().returns(this.time1)
    .onSecondCall().returns(this.time1)

  var gen = new Generator('PREFIX')
  this.expect(gen.next()).equals('0xPREFIXx0x1421287155611x0')
  this.expect(gen.next()).equals('0xPREFIXx0x1421287155611x1')
  Date.now = orgNow;
  this.end()
})
.it('should reset increment on a greater millisecond value', function () {
  var orgNow = Date.now;
  this.stub(Date, 'now')
    .onFirstCall().returns(this.time1)
    .onSecondCall().returns(this.time2)

  var gen = new Generator('PREFIX')
  this.expect(gen.next()).equals('0xPREFIXx0x1421287155611x0')
  this.expect(gen.next()).equals('0xPREFIXx0x1421287155612x0')
  Date.now = orgNow;
  this.end()
})
