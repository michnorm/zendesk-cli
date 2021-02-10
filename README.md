# Zendesk Coding Challenge

### About

My approach to this problem was to try a build a simple application in Typescript that is scalable and robust with strong error handling. Some features of my application:

* **Data streaming** - Using [RxJS](https://www.npmjs.com/package/rxjs) and [JSONStream](https://www.npmjs.com/package/JSONStream), all the data is streamed into the application rather than loading entire files into memory at once. This means the application should be able to handle very large JSON files.
* **Handling of user input** - Instead of having users manually type the field they want to search, the [Inquirer JS](https://www.npmjs.com/package/inquirer) library was used. This makes user input easier to handle and makes the application more usable.
* **Unit Testing** - Unit tests are written with [Chai](https://www.npmjs.com/package/chai) and [Mocha](https://www.npmjs.com/package/mocha) with [Sinon](https://www.npmjs.com/package/sinon) being used for stubbing.
* **Extensible** - New JSON files can be added to the search application with very few changes to the code.

### Prerequisites

* [NodeJS](https://nodejs.org/en/download/)

### Setup

1. Clone and cd into the repository:

```
git clone <>
```

2. Install node packages:

```
npm install
```

3. Start the application:

```
npm run start
```

### Tests

To run the tests, use:

```
npm run test
```

### Troubleshooting

* Inquirer JS works best with Terminal or iTerm on MacOS.
* Upgrade NodeJS.
* Contact me.

