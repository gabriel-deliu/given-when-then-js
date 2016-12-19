# given-when-then-js
basic given when then test helper [Javascript]

# install
npm i given-when-then-js

[npm package link](https://www.npmjs.com/package/given-when-then-js)

# how to use
```javascript
var given = require('given-when-then-js');
var expect = require('chai').expect;

//alternativley with ES6 via transpilers
//import given from 'given-when-then-js';
//import { expect } from 'chai';

it('should do a basic flow', () => {
	var givenValue = 1;
	var whenValue = 2;

	given(givenValue, "given a basic value")
		.when(function(value){
			expect(value).to.equal(givenValue);
			return whenValue;
		}, "given value should be passed to when")
		.then(function(value){
			expect(value).to.equal(whenValue);
		}, "when value should be passed to then");
});
```
