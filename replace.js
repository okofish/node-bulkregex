var fs = require('fs')
var _ = require('underscore')
var argv = require('minimist')(process.argv.slice(2));

var json;
var regexps = [];
var replaced;
var replacementFile;

if (!argv._.length === 0) {
  console.log("Usage: node replace.js <replacement file> [switches]")
  console.log("  -i/--input: Input file to execute regexps on. Defaults to stdin.")
  console.log("  -o/--output: File to save result to. Defaults to stdout.")
  process.exit(1)
} else {
  var replacementFile = argv._[0];
}

var output = function(replaced) {
  process.stdout.write(replaced)
}
if (argv.output || argv.o) {
  output = function(replaced) {
    fs.writeFileSync(argv.output || argv.o, replaced)
  }
}

var readinput = (function(cb) {
  var str = "";
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      str = str.concat(chunk)
    }
  });
  process.stdin.on('end', function() {
    cb(str)
  });
})


if (argv.input || argv.i) {
  readinput = (function(cb) {
    fs.readFile(argv.input || argv.i, function(err, str) {
      if (err) throw err;
      cb(str.toString())
    })
  })
}

readinput(function(input){
  fs.readFile(replacementFile, function(err, data) {
    if (err) throw err;
    json = JSON.parse(data)
    _.map(json, function(obj) {
      obj["from"] = new RegExp(obj["from"], obj["flags"] || "g");
      regexps.push(obj)
    })
    _.map(regexps, function(regexp) {
      input = input.replace(regexp["from"], regexp["to"])
    })
    output(input)
  });
})
