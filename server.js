require('babel-core/register')({
    presets: ['env']
});
var babelpolyfill = require("babel-polyfill");
require('./app.js');