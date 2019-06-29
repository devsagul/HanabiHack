'use strict';

describe('nReplaceWithValidation.provider', () => {

	let nReplaceWithValidationConfig;
	let nReplaceWithValidationConfigProvider;

	beforeEach(() => {

		angular.module('templates', []);
		module('nReplaceWithValidation');

		// load the provider with module to be able to call its configuration methods
		module((_nReplaceWithValidationConfigProvider_) => {
			nReplaceWithValidationConfigProvider = _nReplaceWithValidationConfigProvider_;
		});

		inject((_nReplaceWithValidationConfig_) => {
			nReplaceWithValidationConfig = _nReplaceWithValidationConfig_;
		});
	});

	// What should the feature do?
	it('should return defaults', () => {

		// What is the actual output?
		const actual = nReplaceWithValidationConfig.config;

		// What is the expected output?
		const expected = {
			required: 'Please enter a value for this field. (default)',
			minlength: 'Please enter a value for at least 6 characters long (default)',
			maxlength: 'This field can be at most 15 characters long. (default)',
			email: 'This field must be a valid email address. (default)',
			min: 'The value is too low. (default)',
			max: 'The value is too high. (default)',
			pattern: 'The value does match the validation pattern. (default)',
			fallback: 'This will be used if error message is not configured. (default)'
		};

		expect(actual).toEqual(expected);
	});


	// What should the feature do?
	it('should have "configure" function defined', () => {

		// What is the actual output?
		const actual = nReplaceWithValidationConfigProvider.configure;

		// What is the expected output?
		expect(actual).toEqual( jasmine.any(Function) );
	});

	// What should the feature do?
	it('should configure "required" to "testing"', () => {

		nReplaceWithValidationConfigProvider.configure({required: 'testing'});

		// What is the actual output?
		const actual = nReplaceWithValidationConfig.config;

		// What is the expected output?
		const expected = {
			required: 'testing',
			minlength: 'Please enter a value for at least 6 characters long (default)',
			maxlength: 'This field can be at most 15 characters long. (default)',
			email: 'This field must be a valid email address. (default)',
			min: 'The value is too low. (default)',
			max: 'The value is too high. (default)',
			pattern: 'The value does match the validation pattern. (default)',
			fallback: 'This will be used if error message is not configured. (default)'
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should return defaults, if no config are provided for theconfigure function', () => {

		// What is the actual output?
		const actual = nReplaceWithValidationConfigProvider.configure();

		// What is the expected output?
		const expected = {
			required: 'Please enter a value for this field. (default)',
			minlength: 'Please enter a value for at least 6 characters long (default)',
			maxlength: 'This field can be at most 15 characters long. (default)',
			email: 'This field must be a valid email address. (default)',
			min: 'The value is too low. (default)',
			max: 'The value is too high. (default)',
			pattern: 'The value does match the validation pattern. (default)',
			fallback: 'This will be used if error message is not configured. (default)'
		};

		expect(actual).toEqual(expected);
	});


});
