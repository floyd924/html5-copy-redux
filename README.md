# bitcoin-exchange-seed
The starting point for the bitcoin-exchange project, containing individual client and server applications.
Each application has their own package.json, to prevent cross-pollination of dependencies between client and server-side.

##### Client
Contains a sample Angular application, mockup wireframe and a wrapper around the socket.io-client library to integrate it with Angular's change detection mechanism. 

###### Setup Instructions
* Open your CLI
* Change to the ```client``` directory within this project
* Run ```npm install``` to install the client-side dependencies
* Install [http-server](https://www.npmjs.com/package/http-server) globally via ```npm install --global http-server```
* Run ```npm start``` to host the application on http://localhost:8080

##### Server
Contains empty matcher and unit test spec file.

###### Setup Instructions
* Open your CLI
* Change to the ```client``` directory within this project
* Run ```npm install``` to install the server-side dependencies
* Install [jasmine](http://jasmine.github.io/edge/node.html) globally via ```npm install --global jasmine```
* Type ```jasmine``` to run the unit tests

##### Directory Structure
```
├── bitcoin-exchange-seed/
│   ├── client - client-side application
│   │   ├── app
│   │   │   ├── css
│   │   │   |   ├── app.css - application-wide styles
│   │   │   ├── scripts
│   │   │   |   ├── order-book
│   │   │   |   |   ├── directive.js - A simple order book directive with an inline controller
│   │   │   |   |   ├── template.js - The template file for the order book directive
│   │   │   |   ├── app.js - top-level angular module of the application, includes socket.io-client wrapper
│   │   │   ├── index.html - index page of the application
│   │   │   ├── mockup.html - empty mockup wireframe
│   │   ├── node_modules - application's dependencies (e.g. Angular, socket.io-client)
│   │   ├── package.json - metadata relevant to the application, used by npm to manage application dependencies
│   ├── server - server-side application
│   │   ├── app
│   │   │   ├── matcher.js - placeholder file for the matcher implementation
│   │   ├── node_modules -  server-side dependencies  (e.g. socket.io, jasmine)
│   │   ├── spec
│   │   │   ├── support
│   │   │   |   |   ├── jasmine.json - configuration for the jasmine test runner
│   │   │   ├── matcherSpec.js - placeholder file for the matcher unit tests
│   │   ├── package.json - metadata relevant to the application, used by npm to manage application dependencies
│   ├── .gitignore - specifies intentionally untracked files that Git should ignore
│   ├── LICENSE - MIT software license file
│   ├── README.md - what you're reading right now
```
