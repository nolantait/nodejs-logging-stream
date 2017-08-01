const { DocumentFactory } = require('./DocumentFactory.js');
const { DocumentSummarizer } = require('./DocumentSummarizer.js');
const { documentPrototype } = require('./Prototypes.js');

//Third party script for cleaner logging and argument parsing
const log = require('single-line-log').stdout;
const argv = require('minimist')(process.argv.slice(2));

loggit = function() {
  summarizer = new DocumentSummarizer(argv);
  summarizer.on('data', (chunk) => {
    log.clear();
    log(chunk.message());
  });

  let documentObject = Object.create(documentPrototype);

  process.stdin.pipe(DocumentFactory(documentObject)).pipe(summarizer);
};

loggit();
