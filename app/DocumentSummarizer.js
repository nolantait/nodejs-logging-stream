const { Transform } = require('stream');
const util = require('util');

//Objects fed into Summarizer require the following interface:
//document.bytes = total bytes of object
//document.throughput = total bytes per seconds
//document.totalLines = total lines of document
//document.lineGrowthRate = total lines per minute
//
function DocumentSummarizer(options) {
  if (!(this instanceof DocumentSummarizer)) {
    return new DocumentSummarizer(options);
  }

  if (!options) options = {}
  options.objectMode = true;
  Transform.call(this, options);
};
util.inherits(DocumentSummarizer, Transform);

DocumentSummarizer.prototype._transform = function(doc, encoding, next) {
  summaryObject = {
    bytes: doc.bytes,
    throughput: doc.throughput,
    lines: doc.totalLines,
    growth: doc.lineGrowthRate,
    message: function() {
      return(
        '\n' + 
        'Bytes: ' + this.bytes +
        '\n' +
        'Throughput: ' + this.throughput + ' bytes/sec' +
        '\n' +
        'Lines: ' + this.lines +
        '\n' +
        'Growth Rate: ' + this.growth + ' lines/minute' +
        '\n'
      );
    }
  };

  this.push(summaryObject);
  next();
};

exports.DocumentSummarizer = DocumentSummarizer;
