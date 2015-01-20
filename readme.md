# Simple-gen

This module creates really simple high performance unique keys

```
npm install simple-gen
```

### Usage:

```javascript
var gen = new Generator('PREFIX')

gen.next()
// => 0xPREFIXx1421287155611x0
gen.next()
// => 0xPREFIXx1421287155611x1
gen.next()
// => 0xPREFIXx1421287155612x0
```

It creates the key based on a timestamp, and ensures a new one is unique by incrementing the last index if that timestamp has already been used.

If you want unique key based on the environment, you can use an environment specific ID as the prefix e.g.
```javascript
var gen = new Generator('PREFIXx' + process.env.SYSTEM_NAME)

gen.next()
// => 0xPREFIXxMy-System-Namex1421287155611x0
```

