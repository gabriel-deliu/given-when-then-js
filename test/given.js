var given = require.main.require('index.js');
var expect = require('chai').expect;

describe('Give', () => {

	describe('Happy flow test', () => {

		it('runs in the most basic form', () => {
			given(1)
				.when(value => 2)
				.then(value => value == 2);
		});

		it('should do a basic flow', () => {
			var givenValue = 1;
			var whenValue = 2;

			given(givenValue, "given a basic value")
				.when(value => {
					expect(value).to.equal(givenValue);
					/*perform action and return result*/
					return whenValue;
				}, "given value should be passed to when")
				.then(value => {
					/*check if the result matches the expected result*/
					expect(value).to.equal(whenValue);
				}, "when value should be passed to then");
		});

		it('should do a basic multi type flow', () => {
			var givenValue = 1;
			var whenValue = 'one';

			given(givenValue, "given an integer")
				.when(value => {
					expect(value).to.equal(givenValue);
					return whenValue;
				}, "given value should be received")
				.then(value => {
					expect(value).to.equal(whenValue);
				}, "when value should be passed to then");
		});

		it('should do a now when flow', () => {
			var givenValue = 1;

			given(givenValue, "given an integer")
				.then(value => {
					expect(value).to.equal(givenValue);
				}, "given value should be passed to then");
		});

		it('should domulti when flow', () => {
			var givenValue = 1;
			var whenValue1 = 'one';
			var whenValue2 = 'two';
			var whenValue3 = 'three';

			given(givenValue, "given an integer")
				.when(value => {
					expect(value).to.equal(givenValue);
					return whenValue1;
				}, "given value should be received")
				.when(value => {
					expect(value).to.equal(whenValue1);
					return whenValue2;
				}, "value 1 should be received")
				.when(value => {
					expect(value).to.equal(whenValue2);
					return whenValue3;
				}, "value 2 should be received")
				.then(value => {
					expect(value).to.equal(whenValue3);
				}, "when value should be passed to then");
		});


	});

	describe('Exceptions test', () => {

		var getGivenExMessage = (message, exMessage) => `Given function failed(${message}): ${exMessage}`;
		var getWhenExMessage = (message, exMessage) => `When function failed(${message}): ${exMessage}`;
		var getThenExMessage = (message, exMessage) => `Then function failed(${message}): ${exMessage}`;
		var getTheConditionExMessage = (message) => `Then condition failed(${message})`;

		it('should wrap given exceptions', () => {
			var givenValue = 1;
			var message = 'Everything will be fine';
			var exMessage = 'Something bad ...';

			expect(() => given(value => {
					throw exMessage;
			}, message)).to.throw(getGivenExMessage(message, exMessage));
		});

		it('should wrap when exceptions', () => {
			var givenValue = 1;
			var message = 'Everything will be fine';
			var exMessage = 'Something bad ...';

			expect(() => given(givenValue, "given a basic value")
				.when(value => {
					throw exMessage;
				}, message)).to.throw(getWhenExMessage(message, exMessage));
		});

		it('should wrap then exceptions', () => {
			var givenValue = 1;
			var message = 'Everything will be fine';
			var exMessage = 'Something bad ...';

			expect(() => given(givenValue, "given a basic value")
				.then(value => {
					throw exMessage;
				}, message)).to.throw(getThenExMessage(message, exMessage));
		});

		it('should throw exception when then return value is false', () => {
			var givenValue = 1;
			var message = 'Everything will be fine';			

			expect(() => given(givenValue, "given a basic value")
				.then(value => {
					return false;
				}, message)).to.throw(getTheConditionExMessage(message));
		});
	});
});