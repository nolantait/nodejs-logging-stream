const documentPrototype = {
  text: '',
  creationTime: process.hrtime(),
  bytes: 0,

  get totalLines() {
    return this.text.toString().trim().split('\n').length;
  },

  get elapsedSeconds() {
    diff = process.hrtime(this.creationTime);
    diff = (diff[0] * 1e9) + diff[1];
    return (diff / 1e9).toFixed(1);
  },

  get throughput() {
    return Math.round(this.bytes / this.elapsedSeconds);
  },

  get lineGrowthRate() {
    return Math.round(this.totalLines / this.elapsedSeconds);
  },

  addText: function addText(textObject) {
    this.text += textObject['text'];
    this.bytes += textObject['bytes'];
  },
}

exports.documentPrototype = documentPrototype;
