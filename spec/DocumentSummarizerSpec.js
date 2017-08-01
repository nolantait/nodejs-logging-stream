describe('DocumentSummarizer', function() {
  const { DocumentSummarizer} = require('../app/DocumentSummarizer.js');
  const MockStream = require('./support/mockstream.js');

  describe('arguments', function() {
    it('should set default to all flags', function() {
      summarizer = new DocumentSummarizer;
      expect(Object.keys(summarizer.argv)).toEqual(['b', 't', 'l', 'g']);
    });

    it('should set only flags given', function() {
      summarizer = new DocumentSummarizer({'b': true});
      expect(Object.keys(summarizer.argv)).toEqual(['b']);
    });
    
  });

  describe('data event', function() {
    beforeEach(function() {
      mock = {
        bytes: 1,
        throughput: 2,
        totalLines: 3,
        lineGrowthRate: 4
      };

    });

    it("should return a loggable message", function(done) {
      summarizer = new DocumentSummarizer;
      stream = new MockStream(mock);
      stream.pipe(summarizer);

      summarizer.on('data', (chunk) => {
        expect(chunk.message()).toBeDefined();
        done();
      });
    });

    it('should return only the message for given flags', function(done) {
      summarizer = new DocumentSummarizer({'b': true});
      stream = new MockStream(mock);
      stream.pipe(summarizer);

      summarizer.on('data', (chunk) => {
        expect(chunk.message()).toBe('Bytes: 1');
        done();
      });
    });

  });
});
