"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require("lodash");
var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

var status = require("./status");
var configFile = require("../env/configFile");
var migrationsDir = require("../env/migrationsDir");

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(db) {
    var downgraded, statusItems, appliedItems, lastAppliedItem, migration, args, down, config, collectionName, collection;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            downgraded = [];
            _context.next = 3;
            return status(db);

          case 3:
            statusItems = _context.sent;
            appliedItems = statusItems.filter(function (item) {
              return item.appliedAt !== "PENDING";
            });
            lastAppliedItem = _.last(appliedItems);

            if (!lastAppliedItem) {
              _context.next = 34;
              break;
            }

            _context.prev = 7;
            _context.next = 10;
            return migrationsDir.loadMigration(lastAppliedItem.fileName);

          case 10:
            migration = _context.sent;
            args = fnArgs(migration.down);
            down = args.length > 1 ? promisify(migration.down) : migration.down;
            _context.next = 15;
            return down(db);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](7);
            throw new Error("Could not migrate down " + lastAppliedItem.fileName + ": " + _context.t0.message);

          case 20:
            _context.next = 22;
            return configFile.read();

          case 22:
            config = _context.sent;
            collectionName = config.changelogCollectionName;
            collection = db.collection(collectionName);
            _context.prev = 25;
            _context.next = 28;
            return collection.deleteOne({ fileName: lastAppliedItem.fileName });

          case 28:
            downgraded.push(lastAppliedItem.fileName);
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t1 = _context["catch"](25);
            throw new Error("Could not update changelog: " + _context.t1.message);

          case 34:
            return _context.abrupt("return", downgraded);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[7, 17], [25, 31]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();