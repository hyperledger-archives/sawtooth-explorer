# SawtoothExplorer

SawtoothExplorer is an application that provides visibility into the Sawtooth
Blockchain for Node Operators.

## Dependencies

SawtoothExplorer is built using [Angular](https://angular.io/) and
[Angular Material](https://material.angular.io/). The project is managed using
the [Angular CLI](https://cli.angular.io/). To run the project, you'll need
[Docker](https://docker/com).

## Getting Started
Before starting the SawtoothExplorer app, have the API running locally.
Instructions for doing so are available in the Sawtooth documentation,
under [Installing and Running Sawtooth](https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/installing_sawtooth.html).

Once this is up and running, start the explorer container and rest api proxy
container: `docker-compose up`

By default, the sawtooth API proxy is available at port `8090`,
so the `apiUrl` is already set to `http://localhost:8090`. To change where the
explorer connects to the rest api, change the value of `apiUrl` in
`environments/environments.ts`.

The minified and compiled web assets are also served at `http://localhost:8091`.

## Local development
The `explorer` container is where you'll perform most development related
functions, the container starts in serve mode, which will auto load changes. To
connect to the container to perform builds and other functions:
`docker exec -it sawtooth-explorer /bin/bash`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use  `ng generate directive|pipe|service|class|module`. More information
can be found on the [Angular CLI github page](https://github.com/angular/angular-cli).
Run these commands inside of the explorer container.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `-prod` flag for a production build. These files must
be served through a web server such as nginx.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io) +
[Jasmine](https://github.com/jasmine/jasmine).

To run a single spec or test, update the spec from `describe` to `fdescribe`
or `fit` to `ffit` respectively to run Jasmine in `focused spec` mode.

To generate a report on code coverage, run `ng test --code-coverage`. The
report will be generated in the `/coverage` directory. To view, open the
`index.html` page in a browser.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/). Before running the tests make
sure you are serving the app via `ng serve`.
