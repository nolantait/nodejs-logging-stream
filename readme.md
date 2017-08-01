## Getting started

First install support modules:

```bash
$ npm install
```

Next pipe in some text seperated by new lines to see a set of metrics:

```bash
$ tail -f mylogfile | node app/main.js
```

Which will return information on the logs:

```bash
$ Bytes: 18786
$ Throughput: 5693 bytes/sec
$ Lines: 101
$ Growth Rate: 31 lines/minute
```

You can also select exactly what information to display with arguments

```bash
$ tail -f mylogfile | node app/main.js -bt
```

Would display only the bytes and throughput:

```bash
$ Bytes: 18786;
$ Throughput: 5693 bytes/sec
```

Flags:

```bash
-b = Bytes
-t = Throughput
-l = Lines
-g = Line Growth
```

### Running Tests

Tests are run using jasmine can be run using

```bash
$ npm test
```

