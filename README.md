[![Build Status](https://travis-ci.org/RoleModel/addressable.svg?branch=master)](https://travis-ci.org/RoleModel/addressable)

[![Code Climate](https://codeclimate.com/github/RoleModel/addressable/badges/gpa.svg)](https://codeclimate.com/github/RoleModel/addressable)

# Addressable

Small library for accessing nested properties of a Javascript object.

## Install

Install via Bower or NPM.

```
npm install addressable-node
bower install addressable
```

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

var Addressable = require('addressable-node');

Addressable.find(obj, 'country.name') => 'USA'
new Addressable(obj).find('country.name') => 'USA'

Addressable.find(obj, 'tags[].color.name') => [ 'blue', 'yellow' ]
```

See [tests](spec/addressable_spec.js) for full example

## Angular Example

```js
var myApp = angular.module('myApp', ['addressable']);

myApp.factory('Person', ['Addressable', function (Addressable) {
  var Person = function () {
    this.country = {
      name: 'United States',
      shortName: 'USA'
    }
  };

  Person.prototype.countryName = function () {
    return Addressable.find(this, 'country.name');
  };

  return Person;
}]);
```

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

## Release History

* 0.2.0 Add Angular module
* 0.1.1 Add Bower Package
* 0.1.0 Initial release
