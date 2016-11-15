# Student Grading Challenge

## Synopsis

Simple application for a teacher to add students and their grades to see the min, max, and average for a class. Meant to be a simple challenge without much real-world functionality.

## Design

The web server runs on a simple node.js server to listen for requests. The Express library was used for the routing on the node.js server. 
The front end of the application was built using AngularJS with design elements created using Bootstrap, CSS and JQuery. A design using expandable windows was used to make it easier to view on smaller devices.  
The data for the application is stored in browser memory. Though it will persist through a refresh or restarting the browser, the data will not persist accross browsers or devices. For this reason, some dummy data is added when no data exists to give a simple example. 

## Features
* CRUD operations for students
* Grades and names can be edited by clicking on them
* Validation on input (max length for name is 10)
** Low max length meant to make it easier to test
* Students with grades < 65 are highlighted
* Color-indexed summary graphics

## Packages
__Global__
JQuery - Animation and DOM manipulation.
Highcharts - Creating the gauges
Bootstrap - Responsive page configuration

__Node.js__
express - Used to create the listening server for the application
forerunnerdb - NoSQL DB Library with persistent storage and DOM bindings

__Angular.js__
ng-inline-edit - (bower) Used to do inline editing with saving by hitting enter or clicking out


## Running the Application

1. Install NPM and Node using instructions at https://nodejs.org/en/download/package-manager/
2. Check out repository
3. Move to the /app directory
4. Run 'npm install'
5. Run 'bower install'
6. Return to the application's root directory and run 'node index.js' to start the server
  1. May be 'nodejs index.js' on some installations

## Things Left Undone

Testing, clear comments, and fine tuning were left out. This was mainly in respect to the requirement "don't overcomplicate it". Also, the layout and L&F is not very tuned. I threw in some transitions, but this was meant to be a quick challenge, not a production ready application. 
