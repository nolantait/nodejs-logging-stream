describe("DocumentFactory", function() {
  it("should require a document object", function() {
    expect(new DocumentFactory).toThrow("Document not given");
  });

  it("should send .addText(attrs) to the document object", function() {
    let doc = Object.create(documentPrototype);
    spyOn(doc, "addText");
    new DocumentFactory(doc);
    expect(doc.addText).toHaveBeenCalled(.addText());
  });
});
