# RemixWorkshopsPlugin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Development server

Run `ng serve` for a dev server. The host will be `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Loading the plugin in remix

When testing with localhost you should use the HTTP version of either REMIX or REMIX ALPHA. Click on the plugin manager icon and
add the plugin 'Connect to a local plugin'. Your plugin when served with NG SERVE will be at http://localhost:4200/.

## Setting up the REMIX IDE for working with the plugin

The plugin only works when a compiler environment is loaded as wel, for example on the home screen of the IDE you select 'Solidity' or 'Vyper'. Without this the plugin
cannot compile and test files in the workshops.

## Setting up your Github workshops repo

You can create your own workshops that can be imported in the plugin.
When importing a github repo the plugin will look for a directory structure describing the workshops.
For example: https://github.com/ethereum/remix-workshops

### Root directories
Root directories are individual workshops, the name used will be the name of the workshop.

### README.md
The readme in each directry contains an explanation of what the workshop is about.

### config.yml
This config file contains meta data describing some properties of your workshop, for example
```
--- 
level: 4
tags: 
  - solidity
  - beginner
```
Level: a level of difficulty indicator ( 1 - 5 )
Tags: an array of tags

### STEPS
Each workshop contains what we call steps. 
Each step is a directory containing:
- a readme describing the step, what to do.
- sol files:
    - these can be sol files and test sol files. The test files should be name yoursolname_test.sol
- js files
- vyper files






