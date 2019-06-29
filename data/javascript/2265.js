/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 1:19 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

//Required Modules
var _ = require("underscore"),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
        firstName : String,
        lastName : String,
        profile : String,
        email : String,
        username : String,
        created : String,
        lastmodified : String
    },
    {
        collection : 'ldrly'
    });


//Export the Content Object
module.exports = userSchema;