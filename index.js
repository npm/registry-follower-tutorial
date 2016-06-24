const ChangesStream = require('changes-stream');
const Request = require('request');
const Normalize = require('normalize-registry-metadata');

const db = 'https://replicate.npmjs.com';

var changes = new ChangesStream({
  db: db,
  include_docs: true
});

Request.get(db, function(err, req, body) {
  var end_sequence = JSON.parse(body).update_seq;
  changes.on('data', function(change) {
    if (change.seq >= end_sequence) {
      process.exit(0);
    }
    if (change.doc.name) {
      console.log(Normalize(change.doc));
    }
  });
});
