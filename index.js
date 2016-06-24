const ChangesStream = require('changes-stream');

const db = 'https://replicate.npmjs.com';

var changes = new ChangesStream({
  db: db,
  include_docs: true
});

changes.on('data', function(change) {
  console.log(change.doc);
});
