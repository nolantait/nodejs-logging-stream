const { DocumentFactory } = require('./DocumentFactory.js');
const { DocumentSummarizer } = require('./DocumentSummarizer.js');
const { documentPrototype } = require('./Prototypes.js');

//Third party script for cleaner logging
const log = require('single-line-log').stdout;

loggit = function() {
  summarizer = new DocumentSummarizer
  summarizer.on('data', (chunk) => {
    log.clear();
    log(chunk.message());
  });

  let documentObject = Object.create(documentPrototype);

  process.stdin.pipe(DocumentFactory(documentObject)).pipe(summarizer);
};

loggit();
