# dockerps

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Build Status](https://travis-ci.org/zacheagle/dockerps.svg?branch=master)](https://travis-ci.org/zacheagle/dockerps)
[![Coverage Status](https://coveralls.io/repos/github/zacheagle/dockerps/badge.svg?branch=master)](https://coveralls.io/github/zacheagle/dockerps?branch=master)
[![npm](https://img.shields.io/npm/v/dockerps.svg)](https://www.npmjs.com/package/dockerps)
[![npm](https://img.shields.io/npm/dt/dockerps.svg)](https://www.npmjs.com/package/dockerps)
[![Dependency Status](https://david-dm.org/zacheagle/dockerps.svg)](https://david-dm.org/zacheagle/dockerps)
[![npm](https://img.shields.io/npm/l/dockerps.svg)](https://www.npmjs.com/package/dockerps)

Pretty-print `docker ps` utility written in node.js.

[![asciicast](https://asciinema.org/a/e5hdjs2nc3o1qs01nu24u577x.png)](https://asciinema.org/a/e5hdjs2nc3o1qs01nu24u577x)

## Install
```
sudo npm install -g dockerps
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
