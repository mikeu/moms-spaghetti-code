# Refactoring Mom's spaghetti code

This repo began as a copy of a single file in the
[Athennian recruitment tests](https://github.com/scfast/recruitmentTests/blob/18e85276c07ef6514aa7325acd102d223e5d84e4/js/refactoring/momsSpagetti.js),
renamed from `momsSpagetti.js` to `index.js`.

It now has linting rules applied, new methods with JSDoc-style type hinting, tests, and a demo.

## Tests

The refactoring includes tests of the behaviour of the new individual components, as well
as tests verifying that the new output exactly matches the original.

To run the tests locally, clone the repo then run
```bash
yarn install && yarn test
```
(or `npm install && npm test`).

### Demo

To view the specific output returned by both the refactored and original methods, run
```bash
node lose-yourself
```
(_after_ installing dependencies as above, of course).