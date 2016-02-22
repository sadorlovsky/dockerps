# dockerps

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Pretty-print `docker ps` utility written in node.js.

## Install
```
sudo npm install -g dockerps
```

## Usage
`dockerps` is like a normal `docker ps` but has nice readable output.

```
# show running containers
dockerps

# show all containers
dockerps --all

# show the latest created container
dockerps --latest

# show n last created containers
dockerps --number 2
```
