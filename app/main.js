const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');


class Document {
  constructor(textChunk = '', elapsedTime = 0, bytes = 0) {
    this._elapsedTime = elapsedTime;
    this.totalBytes = bytes;
    this.lines = textChunk.toString().trim().split('\n');
  }

  totalLines() {
    return this.lines.length;
  }

  elapsedTime() {
    return elapsedTime[1]/1000000;
  }

  throughput() {
    return Math.round(this.totalBytes / this.elapsedTime());
  }
}


const documentFactory = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, next) {
    start = process.hrtime();
    bytes = 0;
    bytes += chunk.length;
    textChunk = decoder.write(chunk);

    elapsedTime = process.hrtime(start);

    documentObject = new Document(textChunk, elapsedTime, bytes);
    this.push(documentObject);
    next();
  }
});

const Summarizer = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, next) {
    bytes_message = 'Bytes: ' + chunk.totalBytes;
    throughput_message = 'Throughput: ' + chunk.throughput() + ' bytes/sec';
    this.push(bytes_message + '\n' + throughput_message + '\n');
    next();
  }
});

var finalDocument = process.stdin.pipe(documentFactory);
finalDocument.pipe(Summarizer).pipe(process.stdout);
