"use strict";

var init = require("./actions/init");
var create = require("./actions/create");
var up = require("./actions/up");
var down = require("./actions/down");
var status = require("./actions/status");
var database = require("./env/database");
var configFile = require("./env/configFile");
var MigrateMongo = require("./MigrateMongo");

module.exports = {
  init: init,
  create: create,
  up: up,
  down: down,
  status: status,
  database: database,
  configFile: configFile,
  MigrateMongo: MigrateMongo
};