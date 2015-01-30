'use strict';

var Addressable = function (object) {
  this.object = object;
};

var find = function (subject, address) {
  var parts = address.split('.');
  var firstPart = parts[0];
  var remainder = parts.slice(1).join('.');

  var arrayProp = firstPart.replace('[]', '');
  var methodProp = firstPart.replace('()', '');

  if (isArray(firstPart) && remainder) {
    return subject[arrayProp].map(function (prop) {
      return find(prop, remainder);
    });

  } else if (isArray(firstPart)) {
    return subject[arrayProp];

  } else if (isMethod(firstPart) && remainder) {
    return find(subject[methodProp](), remainder);

  } else if (isMethod(firstPart)) {
    return subject[methodProp]();

  } else if (remainder) {
    return find(subject[firstPart], remainder);

  } else if (subject) {
    return subject[firstPart];

  } else {
    return subject;
  }
};

var isArray = function (addressPart) {
  return addressPart.indexOf('[]') > 0;
};

var isMethod = function (addressPart) {
  return addressPart.indexOf('()') > 0;
};

Addressable.prototype.find = function (address) {
  return find(this.object, address);
};

Addressable.find = function (object, address) {
  return new Addressable(object).find(address);
};

module.exports = Addressable;
