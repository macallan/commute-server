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
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    name: { type: 'string', unique: true },
    distance: { type: 'decimal', length: '10, 2'},
  })

  db.createTable('commute_log', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    user_id: 'int',
    transport_mode_id: 'int',
  })

  db.createTable('transport_lookup', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    value: 'string',
  })

  return new Promise((resolve, reject) => {
    resolve("sucess")
  })
}

exports.down = function(db) {
  db.dropTable('users')
  db.dropTable('commute_log')
  db.dropTable('transport_lookup')

  return new Promise((resolve, reject) => {
    resolve("sucess")
  })
};

exports._meta = {
  "version": 1
};
