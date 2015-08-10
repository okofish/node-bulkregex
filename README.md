# node-bulkregex
CLI for easy application of lots of regexes to a text file  
*Like sed/ed for people who can't be bothered to learn sed/ed*
<!-- like me! -->

## Usage
node replace.js <replacement file> [switches]  
&nbsp;&nbsp;&nbsp;&nbsp;-i/--input: Input file to execute regexps on. Defaults to stdin.  
&nbsp;&nbsp;&nbsp;&nbsp;-o/--output: File to save result to. Defaults to stdout.

The replacement file is a JSON file that looks something like this:
```
[{
  "from": "new study",
  "to": "tumblr post"
}, {
  "from": "rebuild",
  "to": "avenge"
}, {
  "from": "space",
  "to": "spaaace"
}, {
  "from": "smartphone",
  "to": "pokédex"
}]
```

### Example
Included in the repo is an xkcd-themed replacement file and the full text of the Wikipedia article on computer keyboards. Try it out with this:

```
node replace.js xkcd1031.json -i keyboard.txt -o leopard.txt
```

## Performance
Speedy performance is in important part of any bulk replacement program. I test this one `benchmark.sh`, included in the repo. On my MacBook Air, it executes in around 600 ms (wall clock time.)
