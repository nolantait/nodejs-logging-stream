const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const util = require('util');

//Document Factory takes in a document object to hold persistance
//Document object must implement .addText({text, bytes}) method
//
function DocumentFactory(doc, options) {
  if (!(this instanceof DocumentFactory)) {
    return new DocumentFactory(doc, options);
  }

  if (doc === undefined) {
    throw new Error("Document object must be provided.");
  }


  if (!options) options = {}
  options.objectMode = true;
  Transform.call(this, options);
  this.doc = doc;
}
util.inherits(DocumentFactory, Transform);

DocumentFactory.prototype._transform = function(chunk, encoding, next) {
  start = process.hrtime();

  const self = this;
  bytes = chunk.length;
  textChunk = decoder.write(chunk);

  updateAttributes = {
    text: textChunk,
    bytes: bytes
  };

  self.doc.addText(updateAttributes);
  this.push(self.doc);
  next();
};

exports.DocumentFactory = DocumentFactory;
