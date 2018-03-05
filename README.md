# col-debug-tools
An internal tool for debugging COL during development. For usage, changing and discarding at Markus Döring's will.

## Features and scope
The interface is inteded to reflect the API closely. Paging for example is labelled `offset+20`.

Short introduction:
* in search results the 3 dots will expand the row to show the JSON response.
* On individual taxons/names/datasets the full JSON dump is (optionally showed) but rewritten a bit so that keys are displayed as the link to their corresponding item. This is to ease navigation for not highlighted values.
* The heart. This will add an item to your favorites (shows up in the menu) and is there to ease testing and demoing.
* API failures. If the API returns status code >399 then these calls will show up in in the bottom of the screen as warnings as this is considered unexpected aPI behaviour.
* The API tab will link to the corresponding API call for that page (the interface might show data from addition calls)

## Running the project

### Requirement Node 6.12.2 && NPM 3+
This generator is targeted to be used with Node >= 6.0.0 and NPM => 3.0.0. You can check your version number with the command
```
node --version && npm --version
```

### install
```
npm install
npm run serve
```

Other options 

* `npm install` to install the dependencies
* `npm run build` to build an optimized version of your application in /dist
* `npm run serve` to launch a browser sync server on your source files
* `npm run serve:dist` to launch a server on your optimized application
* `npm run test` to launch your unit tests with Karma
* `npm run test:auto` to launch your unit tests with Karma in watch mode

## Code
The project is generated with [Yeoman](http://yeoman.io/generators/) and [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp/tree/e37f2ad97e354f410f14995650284ea24b5f7bf3)

It is using npm and webpack to handle dependencies
[Angular 1](https://angularjs.org/) as framework
[Angular Material](https://material.angularjs.org/latest/) as ui components

## Project structure
The structure of the project is as decided by the generator. You can read more about the reasoning on [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp/tree/e37f2ad97e354f410f14995650284ea24b5f7bf3)

## Issues and contributions
If it has to do with the build, then it is best directed at [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp/tree/e37f2ad97e354f410f14995650284ea24b5f7bf3)
If it has to do with browser compatability, component functionality or visuals then it is best directed at Angular and Angular Material. They are all nice communities that accepts pull requests.

The project is more or less as generated, but with a few added libraries and a minimum of styling. There is no ambitions to do any styling beyond what is provided by the libraries.

## Libraries of interest when developing new tools

* [Lodash](https://lodash.com/docs/4.17.4) : useful utilities
* [Angular](https://angularjs.org/)
* [Angular material](https://material.angularjs.org/1.1.5/) : ui components a la autocomplete
* [Moment JS](https://momentjs.com/) : formatting dates
* [Angular Moment](https://github.com/urish/angular-moment)
* [async](https://caolan.github.io/async/docs.html) : for making tons of async calls
* [Marked](https://www.npmjs.com/package/marked) : rendering markdwon
