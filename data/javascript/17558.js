var Mongoose = require('mongoose');

var MapSchema = {
  id: String,
  mapName: String,
  imagePath: String,
  urlSafeName: String
};

var Map = Mongoose.model('Map', MapSchema, 'Maps');

module.exports = Map;
