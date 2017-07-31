const { documentPrototype } = require('../app/Prototypes.js');
describe('Prototypes', function() {
  describe('Document', function() {
    beforeEach(function() {
      object = Object.create(documentPrototype);
    });

    it('should initialize with defaults', function() {
      expect(object.text).toBeDefined();
      expect(object.bytes).toBeDefined();
    });

    describe('totalLines', function() {
      it('should return the correct number of lines', function() {
        text = `This
          has
          four
          lines`;

        object.text = text;
        expect(object.totalLines).toBe(4);
      });
    });

    describe('elapsedSeconds', function() {
      it('should return the number of seconds since object creation', function(done) {
        object.creationTime = process.hrtime();

        setTimeout(function() {
          expect(object.elapsedSeconds).toBe('0.1');
          done();
        }, 100);
      });
    });
  });
});
