module.exports = {
	displayName: 'weather-app',
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	transform: {
		'^.+\\.(ts|js|html)$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.(html|svg)$',
			astTransformers: {
				before: [
					'jest-preset-angular/build/InlineFilesTransformer',
					'jest-preset-angular/build/StripStylesTransformer',
				],
			},
		},
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'html'],
	modulePaths: ['<rootDir>', '<rootDir>/src/'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^app/(.*)$': '<rootDir>/src/app/$1',
		'^assets/(.*)$': '<rootDir>/src/assets/$1',
		'^environments/(.*)$': '<rootDir>/src/environments/$1',
	},
	transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
	coverageDirectory: 'coverage',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
