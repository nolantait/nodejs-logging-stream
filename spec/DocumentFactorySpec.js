describe("DocumentFactory", function() {
  const { DocumentFactory } = require('../app/DocumentFactory.js');
  const fs = require('fs');
  const path = require('path');

  it("should require a document object", function() {
    expect(function() {
      new DocumentFactory
    }).toThrow(new Error("Document object must be provided."));
  });

  describe("transform", function() {
    beforeEach(function(done) {
      mock = { addText:  (text, bytes) => { return true } };

      spyOn(mock, "addText");

      factory = DocumentFactory(mock);

      fs.createReadStream(path.join(__dirname, 'test.txt'))
        .pipe(factory)
        .on('finish', function() {
          done();
      });
    });

    it("should send .addText(attrs) to the document object", function() {
      expect(mock.addText).toHaveBeenCalled();
    });

    it("should return the document object", function(done) {
      factory.on('readable', function() {
        expect(factory.read()).toBe(mock);
        done();
      });
    });
  });
});
