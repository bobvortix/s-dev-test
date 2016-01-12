# s-programming-test

## Install and run

```
npm install
npm run build
python -m SimpleHTTPServer
```

## Test

```
npm test
```

Then open up http://localhost:8000

## Decisions

- Use [CommonJS](https://webpack.github.io/docs/commonjs.html) style syntax for dependencies and [Browserify](http://browserify.org/) to build and bundle resources (rather than anything more heavyweight such as Gulp/Grunt/Webpack).
- Use [Jest](https://facebook.github.io/jest/) for testing (Facebook library built on top of Jasmine test framework). See `src/__tests__`.
- Use Nightmare.js for some simple acceptance tests.
- No frameworks/external dependencies.
- Use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) rather than callbacks (where appropriate), with a [polyfill](https://github.com/jakearchibald/es6-promise) for cross-browser support.
- Use some ES5 functionality (e.g. `map`).
- Should work on IE8 with minimal additional effort.
- Use plain objects and [revealing module](http://zachberry.com/blog/creating-a-custom-node-js-module-with-the-revealing-module-pattern/) pattern with factory method, instead of constructor functions.