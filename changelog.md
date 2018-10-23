## [0.20.3] - 24 Oct 2018
### Fixed
  - webpack watch callback

## [0.20.2] - 24 Oct 2018
### Changed
  - an experimental tryout of building prod bundle in dev
### Fixed
  - false deps change trigger

## [0.20.1] - 23 Oct 2018
### Changed
  - an attempt number 2 to solve problem with build code duplication in dev

## [0.20.0] - 23 Oct 2018
### Changed
  - an attempt to solve problem with build code duplication in dev
  - disable writeToDisk option for dev

## [0.19.0] - 18 Oct 2018
### Changed
  - functions now get source-map-support and this package as dependencies in order to actually handle root deps pollution

## [0.18.0] - 15 Oct 2018
### Added
  - functions now get devDeps of source-map-support and this package in order to eleminate root deps pollution
### Changed
  - deps versions update

## [0.17.0] - 15 Oct 2018
### Added
  - removing hosting dir upon start

## [0.16.1] - 06 Oct 2018
### Added
  - handling static files

## [0.15.2] - 04 Oct 2018
### Fixed
  - fixed accidenatl removal of `SRC_DIR` from contants export.

## [0.15.1] - 02 Oct 2018
### Fixed
  - fixed broken behaviour of destination filename generation.

## [0.15.0] - 01 Oct 2018
### Added
  - jest preprocessor `jestTransformer.js`

## [0.14.0] - 28 Sep 2018
### Added
  - dev Server with server-side rendering (SSR)
  - option to point to a custom middleware which does the SSR 
  - export function which provides an easy html template for SSR
  - added an sub project to run manual tests against it 

## [0.13.0] - 20 Sep 2018
### Added
  - build command now actually works
### Fixed
  - fix incorrect devServer declaration and call

## [0.12.8] - 20 Sep 2018
### Fixed
  - fix typos in configs

## [0.12.8] - 20 Sep 2018
### Added
  - dev server with proxy to functions
### Improved
  - better cofig for styled-components
### Fixed
  - testing files are ignored

## [0.10.1] - 11 Sep 2018
### Improved
  - proper options for babel-plugin-styled-components for targeted env

## [0.10.1] - 11 Sep 2018
### Improved
  - proper options for babel-plugin-styled-components for targeted env
  
## [0.10.1] - 11 Sep 2018
### Fixed
  - transformation now applies correct babel config
  
## [0.10.1] - 11 Sep 2018
### Changed
  - separate babel configs for client and webpack
### Fixed
  - actual use of babel cofig by webpack-dev-server
  - proper title in wds template

## [0.10.0] - 10 Sep 2018
### Added
  - configuring options. [Read more here](readme.md#Configuring)
  - webpack-dev-server for local development

## [0.9.0] - 01 Sep 2018
### Added
 - babel-plugin-styled-components with SSR turned on

## [0.8.1] - 01 Sep 2018
### Fixed
 - remove unexsting imports
