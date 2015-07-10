'use strict';

var Addressable = require('../lib/addressable');
var data, addressable;

describe('Addressable', function () {
  beforeEach(function () {
    data = {
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
      ],
      nicknames: [
        {
          name: 'Bobby',
          related: [ { name: 'Joey' } ]
        },
        {
          name: 'Robert',
          related: [ { name: 'Hubert' } ]
        }
      ],
      notes: 'What about Bob?',
      methodProperty: function () {
        return 'foo - bar';
      },
      pet: function () {
        return {
          type: 'ferret',
          name: 'Gonzo'
        }
      }
    };
    addressable = new Addressable(data);
  });

  describe('#find', function () {
    describe('simple address', function () {
      it('finds the value', function () {
        expect(addressable.find('name')).toEqual('Bob');
      });
    });

    describe('nested address', function () {
      it('finds the value', function () {
        expect(addressable.find('country.name')).toEqual('USA');
      });
    });

    describe('array address', function () {
      it('finds the values', function () {
        expect(addressable.find('tags[].color.name')).toEqual([ 'blue', 'yellow' ]);
      });
    });

    describe('array with nested array address', function () {
      it('finds the values', function () {
        expect(addressable.find('nicknames[].related[].name')).toEqual([ [ 'Joey' ], [ 'Hubert' ] ]);
      });
    });

    describe('method address', function () {
      it('finds the value', function () {
        expect(addressable.find('methodProperty()')).toEqual('foo - bar');
      });

      it('finds the value as a result of the method', function () {
        expect(addressable.find('pet().name')).toEqual('Gonzo');
      });
    });

    describe('invalid address', function () {
      it('doesn\'t find the value', function () {
        expect(addressable.find('foo.name')).toBeUndefined();
      });

      it('doesn\'t error with a method call', function () {
        expect(addressable.find('foo().name')).toBeUndefined();
      });
    });

    describe('invalid subject', function () {
      it('doesn\'t blow up', function () {
        data = undefined;
        addressable = new Addressable(data);

        expect(addressable.find('foo.name')).toBeUndefined();
      });
    });
  });
});
