"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


function someSet(set, callback, context) {
  var iterator = set.entries();
  var current = iterator.next();
  while (!current.done) {
    var entry = current.value;
    if (callback.call(context, entry[1], entry[0], set)) {
      return true;
    }
    current = iterator.next();
  }
  return false;
} /* =========================================
  * Copyright (c) 2015-present, Billgo.
  * Copyright (c) 2015-present, Facebook, Inc.
  *
  * All rights reserved.
  *======================================== */

exports.default = someSet;