# dockerps

[![Build Status](https://travis-ci.org/sadorlovsky/dockerps.svg?branch=master)](https://travis-ci.org/sadorlovsky/dockerps)
[![Coverage Status](https://coveralls.io/repos/github/sadorlovsky/dockerps/badge.svg?branch=master)](https://coveralls.io/github/sadorlovsky/dockerps?branch=master)
[![npm version](https://badge.fury.io/js/dockerps.svg)](https://badge.fury.io/js/dockerps)
[![npm](https://img.shields.io/npm/dt/dockerps.svg)](https://www.npmjs.com/package/dockerps)
[![Dependency Status](https://david-dm.org/sadorlovsky/dockerps.svg)](https://david-dm.org/sadorlovsky/dockerps)

Pretty-print `docker ps` utility written in node.js.

[![asciicast](https://asciinema.org/a/e5hdjs2nc3o1qs01nu24u577x.png)](https://asciinema.org/a/e5hdjs2nc3o1qs01nu24u577x)

## Install
```
$ npm install -g dockerps
```

## Usage
`dockerps` is like a normal `docker ps` but has nice readable output.

```bash
# show running containers
dockerps

# show all containers
dockerps --all

# show the latest created container
dockerps --latest

# show n last created containers
dockerps --number 2

# show all containers with a name containing "desperate"
dockerps --filter "name=desperate"

# show all containers based on ubuntu image
dockerps --filter "ancestor=ubuntu"
```

## License

MIT © [Zach Orlovsky](https://orlovsky.rocks)
