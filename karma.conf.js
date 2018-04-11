/**
 * Copyright 2017 PokitDok, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

var testBrowsers = ['Chrome'];
var customLaunchers = {};
var singleRun = false;
var angularCliEnvironment = 'dev';
var plugins = [
  require('karma-jasmine'),
  require('karma-chrome-launcher'),
  require('karma-jasmine-html-reporter'),
  require('karma-coverage-istanbul-reporter'),
  require('@angular/cli/plugins/karma')
];
if (process.env.NG_DOCKER_COMPOSE) {
  angularCliEnvironment = 'dc';
  singleRun = true;
  plugins.push(require('karma-webdriver-launcher'));
  testBrowsers = ['DockerSelenium'];
  customLaunchers = {
    DockerSelenium: {
      base: 'WebDriver',
      browserName: 'chrome',
      config: {
        hostname: process.env.SELENIUM_HOST,
        port: process.env.SELENIUM_PORT || '4444'
      }
    }
  };
}

module.exports = function (config) {
  config.set({
    basePath: 'src/app',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: plugins,
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: angularCliEnvironment
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !singleRun,
    hostname: process.env.TEST_WEB_HOST,
    customLaunchers: customLaunchers,
    browsers: testBrowsers,
    browserNoActivityTimeout: 30000,
    singleRun: singleRun
  });
};
