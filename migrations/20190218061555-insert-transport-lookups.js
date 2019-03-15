'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.insert('transport_lookup', ['value'], ['Bike'])
  db.insert('transport_lookup', ['value'], ['Walk'])
  db.insert('transport_lookup', ['value'], ['Carpool'])
  db.insert('transport_lookup', ['value'], ['Other'])
  return new Promise((resolve, reject) => {
    resolve("sucess")
  })
};

exports.down = function(db) {
  db.dropTable('transport_lookup')

  db.createTable('transport_lookup', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    value: 'string',
  })

  return new Promise((resolve, reject) => {
    resolve("sucess")
  })
};

exports._meta = {
  "version": 1
};
