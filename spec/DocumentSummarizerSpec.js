describe('DocumentSummarizer', function() {
  const { DocumentSummarizer} = require('../app/DocumentSummarizer.js');
  const MockStream = require('./support/mockstream.js');

  describe('data event', function() {
    beforeEach(function() {
      mock = {
        bytes: 1,
        throughput: 2,
        totalLines: 3,
        lineGrowthRate: 4
      };

      summarizer = new DocumentSummarizer;
      stream = new MockStream(mock);
      stream.pipe(summarizer);
    });

    it("should return a loggable message", function(done) {
      summarizer.on('data', (chunk) => {
        expect(chunk.message()).toBeDefined();
        done();
      });
    });
  });
});
