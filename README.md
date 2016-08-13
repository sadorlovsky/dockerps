# dockerps

[![Build Status](https://travis-ci.org/sadorlovsky/dockerps.svg?branch=master)](https://travis-ci.org/sadorlovsky/dockerps)
[![Coverage Status](https://coveralls.io/repos/github/sadorlovsky/dockerps/badge.svg?branch=master)](https://coveralls.io/github/sadorlovsky/dockerps?branch=master)

> A better `docker ps`

[![asciicast](https://asciinema.org/a/e5hdjs2nc3o1qs01nu24u577x.png)](https://asciinema.org/a/e5hdjs2nc3o1qs01nu24u577x)

## Install
```
$ npm install -g dockerps
```

## Usage
`dockerps` is like a normal `docker ps` but has nice readable output.

```bash
# show running containers
$ dockerps

# show all containers
$ dockerps --all

# show the latest created container
$ dockerps --latest

# show 2 last created containers
$ dockerps --last 2
```

## License

MIT © [Zach Orlovsky](https://orlovsky.rocks)
