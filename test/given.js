var gwt = require.main.require('index.js');
var chai = require('chai');

var given = gwt.given;
var expect = chai.expect;

describe('Give', () => {

	describe('Happy flow test', () => {

		it('should do a basic flow', () => {
			var givenValue = 1;
			var whenValue = 2;

			given(givenValue, "given a baisc value")
				.when(function(value){
					expect(value).to.equal(givenValue);
					return whenValue;
				}, "given value should be passed to when")
				.then(function(value){
					expect(value).to.equal(whenValue);
				}, "when value should be passed to then");
		});

	});
});