const { Transform } = require('stream');
const util = require('util');

//Objects fed into Summarizer require the following interface:
//document.bytes = total bytes of object
//document.throughput = total bytes per seconds
//document.totalLines = total lines of document
//document.lineGrowthRate = total lines per minute
//
function DocumentSummarizer(argv, options) {
  if (!(this instanceof DocumentSummarizer)) {
    return new DocumentSummarizer(options);
  }

  if (!options) options = {}
  options.objectMode = true;
  Transform.call(this, options);
  if ((argv === undefined) || (Object.keys(argv).length === 1)) {
    this.argv = {
      'b': true,
      't': true,
      'l': true,
      'g': true
    }
  } else {
    this.argv = argv;
  };
};
util.inherits(DocumentSummarizer, Transform);

DocumentSummarizer.prototype._transform = function(doc, encoding, next) {
  const self = this;

  messages = {
    'b': 'Bytes: ' + doc.bytes,
    't': 'Throughput: ' + doc.throughput + ' bytes/sec',
    'l': 'Lines: ' + doc.totalLines,
    'g': 'Growth Rate: ' + doc.lineGrowthRate + ' lines/minute'
  };

  let returned_messages = [];
  for (var key in self.argv) {
    returned_messages.push(messages[key]);
  };

  summaryObject = {
    bytes: doc.bytes,
    throughput: doc.throughput,
    lines: doc.totalLines,
    growth: doc.lineGrowthRate,
    message: function() {
     return returned_messages.join('\n');
    }
  };

  this.push(summaryObject);
  next();
};

exports.DocumentSummarizer = DocumentSummarizer;
