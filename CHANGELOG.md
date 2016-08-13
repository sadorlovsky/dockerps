# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.5.0] - 2016-08-13
### Added
- @sadorlovsky codestyle

### Changed
- Use docker remote api instead of parsing `docker ps` stdout
- Update dependencies
- Update test
- Use coveralls
- Refactor pretty much the whole code

### Removed
- Remove filter option (because i hope i will replace it by better filter feature)

## [0.4.1] - 2016-03-21
### Changed
- Small refactoring

## [0.4.0] - 2016-03-01
### Changed
- Use babel for transpiling es6 syntax
- Use ava for testing

## [0.3.0] - 2016-02-22
### Added
- -f, --filter option

## [0.2.3] - 2016-02-22
### Changed
- Replace fat line `━` by thin line `─` in table print

## [0.2.2] - 2016-02-14
### Added
- -v, --version option

## [0.2.1] - 2016-02-13
### Changed
- `print` function refactoring

## [0.2.0] - 2016-02-13
### Changed
- Print every port on a new line

## [0.1.1] - 2016-02-13
### Fixed
- Fix `container status` error
- Fix solecism in `no containers` message

## 0.1.0 - 2016-02-13

[0.5.0]: https://github.com/sadorlovsky/dockerps/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/sadorlovsky/dockerps/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/sadorlovsky/dockerps/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/sadorlovsky/dockerps/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/sadorlovsky/dockerps/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/sadorlovsky/dockerps/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/sadorlovsky/dockerps/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/sadorlovsky/dockerps/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/sadorlovsky/dockerps/compare/v0.1.0...v0.1.1
