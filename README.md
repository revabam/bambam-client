# BambamClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Spring 2 Final Thoughts - 10/5/2018
- Alex Moraga, Alexander Hudson, Alicia Douglas, Beck Larson, Chester Gillfillian, Chinedu Ozodi, Chris Holmes, Daniel Sidhu, Drake Mapel, Eddie Grays, Humphrey Minott, Jasmine Onwuzulike, Joey Shannon, Joshua Maciejewski, Marcin Salamon, Nisat Chowdhury, Obosa Nosa-Igiebor, Oluwatosin Onilogbo, Richard Iskra, Stephen Hong, Tyler Atkinson, Rhys Yamasaki | Spark1806 | Steven Kelsey

The look and feel of the application has been changed from previous iteration, the focus of the sprint was to add much needed functionality and give more options to trainers. Since there is no more pebbles-user login, registration, and user information comes from Cognito now.

BOOM now has the absolute minimum of functionality, with a chart of overall progress and weekly progress of batches, the datasource needs to come from the database, but without fleshed out batch service it just uses mock data currently.

Calendar is in a good state. Curriculum is in a pretty good state, changing statuses of curriculums is not implemented, ideally in the future there will be a way to change the status of a curriculum, and there will some form of admin conformation for which one is the master one. On the Dashboard component the foundation was set, and the basis for future implementation has been added. There is UI for marking specific events as important. When the batch curriculum is fleshed out, there is UI for diplaying details for it. The foundation for style has been created.

# Sprint 1 Final Thoughts - 8/24/18
- Brandon Scoggins | 1806-Jun-USF-Java | Wezley Singleton

The look and feel of most components is where we feel it needs to be. Some minor adjustments, such as font sizing and margin white space, could still be addressed. 

The core functionality of the login/register, curriculum editor, and calendar components is presentable. The calendar and curriculum editor components have room for additional functionality (color coding events, marking events with a status, etc) but they also have features that need to be fully fleshed out (adding new events to a set of already persisted events, editing events in a modal/dialouge view, etc). 

A future sprint could also implement the BOOM (Bootcamp Overall Object Manager) functionality to allow for statistical analysis of BAM.

With the current implementation, a new user is not associated with a batch upon login, and there is no implementation to create this association naturally. Current associations are made manually in the data.json file. Some ideas on how this could be implemented are: A user that is not associated with a batch is directed to an association page where they can associate themselves with a batch; A user that is not associated will see filler information on the dashboard letting them know that they are awaiting batch association. This way they could still use the calendar functionality. A manager could login and have access to a page that allows them to create batch-trainer associations.
