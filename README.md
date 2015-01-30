[![Build Status](https://travis-ci.org/RoleModel/addressable.svg?branch=master)](https://travis-ci.org/RoleModel/addressable)

# Addressable

Small library for accessing nested properties of a Javascript object.

## Node Example

```js
var obj = {
  id: 1,
  name: 'Bob',
  age: 31,
  country: {
    id: 1,
    name: 'USA'
  },
  tags: [
    { color: { name: 'blue' } },
    { color: { name: 'yellow' } }
  ]
}

var Addressable = require('addressable');

Addressable.find(obj, 'country.name') => 'USA'
new Addressable(obj).find('country.name') => 'USA'

Addressable.find(obj, 'tags[].color.name') => [ 'blue', 'yellow' ]
```

See [tests](spec/addressable_spec.js) for full example

## Build

To build the browserify module version of the gem use the npm build script.

```
npm run build
```

This builds a new version in the `dist` directory.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

