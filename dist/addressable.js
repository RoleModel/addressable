!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Addressable=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/addressable');

},{"./lib/addressable":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});