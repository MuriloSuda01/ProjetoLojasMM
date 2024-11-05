// backend/db.js
const Datastore = require('nedb');

const db = new Datastore({ filename: 'contacts.db', autoload: true });

module.exports = db;
