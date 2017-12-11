# SawtoothExplorer

SawtoothExplorer is an application that provides visibility into the Sawtooth
Blockchain for Node Operators.

## Dependencies

SawtoothExplorer is built using [Angular](https://angular.io/) and
[Angular Material](https://material.angular.io/). The project is managed using
the [Angular CLI](https://cli.angular.io/).

## Getting Started
Before starting the SawtoothExplorer app, have the API running locally.
Instructions for doing so are available in the Sawtooth documentation,
under [Installing and Running Sawtooth](https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/installing_sawtooth.html).

Once this is running, the SawtoothExplorer app must be configured to
reach the API. Update the `apiURL` property of the project's
`environment` variable, located in `environments/environments.ts`, to
point to where the app should be accessing the API. This file
holds any environment variables for development. Production environment
variables are in `environments/environments.prod.ts`.

By default, the locally running Sawtooth API is available at port `8080`,
so the `apiUrl` is already set to `http://localhost:8080`.

## Local development
This project depends on `node` and `angular-cli`, and `node-sass`. It is best
practice to install and run these in an isolated environment. This project
includes an example for OSX under `bin/dev_setup` that uses virtual environments
(that you are welcome to use should you be working in OSX).

After these are installed, run `npm install` to install all other node modules
locally in the `node_modules` directory. The `bin/dev_setup` script includes
this command.

## Development server

If you are taking the route of using a virtual environment, this is the point
where you should source it. Run `ng serve` for a dev server. Navigate to
`http://localhost:4200/`. The app will automatically reload if you change any
of the source files.

If you have a different version of node already on your machine, you may see
the error `Node Sass could not find a binding for your current environment.`
Run `npm rebuild node-sass` to update the bindings.

Also, occasionally when starting a new project, you may see the error 
`No NgModule metadata found for AppModule.` This can be fixed by triggering the
automatic reload by making a small edit to a file then saving while `ng serve`
is running.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use  `ng generate directive|pipe|service|class|module`. More information
can be found on the [Angular CLI github page](https://github.com/angular/angular-cli).

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
