const pool = require('../utils/pool');

module.exports = class Author {
  author_id;
  name;
  dob;
  pob;

  constructor(row) {
    this.author_id = row.author_id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }
};
