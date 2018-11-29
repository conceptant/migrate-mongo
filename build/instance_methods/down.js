"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _loadMigration = require("../utils/loadMigration");

var _loadMigration2 = _interopRequireDefault(_loadMigration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require("lodash");
var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

exports.default = function (config, status) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(db) {
      var downgraded, statusItems, appliedItems, lastAppliedItem, migration, args, down, collectionName, collection;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              downgraded = [];
              _context.next = 3;
              return status(db, config);

            case 3:
              statusItems = _context.sent;
              appliedItems = statusItems.filter(function (item) {
                return item.appliedAt !== "PENDING";
              });
              lastAppliedItem = _.last(appliedItems);

              if (!lastAppliedItem) {
                _context.next = 29;
                break;
              }

              _context.prev = 7;
              migration = (0, _loadMigration2.default)(config.migrationDir, lastAppliedItem.fileName);
              args = fnArgs(migration.down);
              down = args.length > 1 ? promisify(migration.down) : migration.down;
              _context.next = 13;
              return down(db);

            case 13:
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](7);
              throw new Error("Could not migrate down " + lastAppliedItem.fileName + ": " + _context.t0.message);

            case 18:
              collectionName = config.changelogCollectionName;
              collection = db.collection(collectionName);
              _context.prev = 20;
              _context.next = 23;
              return collection.deleteOne({ fileName: lastAppliedItem.fileName });

            case 23:
              downgraded.push(lastAppliedItem.fileName);
              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t1 = _context["catch"](20);
              throw new Error("Could not update changelog: " + _context.t1.message);

            case 29:
              return _context.abrupt("return", downgraded);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[7, 15], [20, 26]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};