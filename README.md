# bitcoin-exchange-seed
The starting point for the bitcoin-exchange project, containing individual client and server applications.
Each application has their own package.json, to prevent cross-pollination of dependencies between client and server-side.

##### Client
* Contains a sample Angular application ```client/app/index.html``` and mockup wireframe ```client/app/mockup.html```
* Includes a shim for socket.io-client to integrate it with Angular's change detection mechanism ```client/app/scripts/app.js```
* Enter ```npm start``` into your CLI to host application (using http-server)

##### Server
* Contains a blank matcher file ```server/app/matcher.js``` and an empty unit test spec file ```server/spec/matcherSpec.js```
* Enter ```jasmine``` into your CLI to run the unit tests (requires global jasmine node module)
