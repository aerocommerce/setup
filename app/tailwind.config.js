const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	mode: 'jit',
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				alpha: {
					0: '#9c9ead',
					50: '#9294a4',
					100: '#888B9C',
					150: '#7e8194',
					200: '#74778C',
					250: '#6a6e83',
					300: '#60647b',
					350: '#565a73',
					400: '#4C506B',
					450: '#424762',
					DEFAULT: '#383d5a',
					550: '#353a56',
					600: '#323751',
					650: '#30344d',
					700: '#2d3148',
					750: '#2a2e44',
					800: '#272B3F',
					850: '#24283b',
					900: '#222536',
					950: '#1f2232',
					1000: '#1c1f2d',
					1050: '#191b28',
					1100: '#161824',
					1150: '#14151f',
					1200: '#11121b',
					1250: '#0e0f17',
					1300: '#0b0c12',
					1350: '#08090e',
					1400: '#060609',
					1450: '#030305'
				},
				alphaLight: {
					100: '#f5f5f7',
					200: '#ebecef',
					300: '#e1e2e6',
					400: '#d7d8de',
					DEFAULT: '#cdcfd6',
					600: '#c3c5ce',
					700: '#b9bbc5',
					800: '#afb1bd',
					900: '#a5a8b5',
				},
				bravo: '#54E0E4',
				green: '#7CC43F',
				red: '#C43F3F',
				orange: '#C4873F',
				gray: colors.trueGray,
			},
			fontFamily: {
				primary: ['Rubik', 'sans-serif']
			},
			spacing: {
				'0': '0',
				'1': '0.269666667rem',
				'2': '0.539333334rem',
				'3': '0.809rem',
				'4': '1.078666668rem',
				'5': '1.348333335rem',
				'6': '1.618rem',
				'7': '1.887666667rem',
				'8': '2.157333336rem',
				'10': '2.69666667rem',
				'12': '3.236rem',
				'14': '3.775333334rem',
				'16': '4.314666672rem',
				'20': '5.39333334rem',
				'24': '6.472rem',
				'32': '8.629333344rem',
				'40': '10.78666668rem',
				'48': '12.944rem',
				'56': '15.1013rem',
				'64': '17.258666688rem',
				'72': '19.416000024rem',
				'96': '25.888000024rem',
				'full' : '100%'
			},
			width: {
				'screen-1/2': '50vw'
			},
			maxWidth: {
				'1': '0.269666667rem',
				'2': '0.539333334rem',
				'3': '0.809rem',
				'4': '1.078666668rem',
				'5': '1.348333335rem',
				'6': '1.618rem',
				'7': '1.887666667rem',
				'8': '2.157333336rem',
				'10': '2.69666667rem',
				'12': '3.236rem',
				'14': '3.775333334rem',
				'16': '4.314666672rem',
				'20': '5.39333334rem',
				'24': '6.472rem',
				'32': '8.629333344rem',
				'40': '10.78666668rem',
				'48': '12.944rem',
				'56': '15.1013rem',
				'64': '17.258666688rem',
				'desktop': '1920px',
				'screen-1/3': '33.3333vw'
			},
			minWidth: {
				'1': '0.269666667rem',
				'2': '0.539333334rem',
				'3': '0.809rem',
				'4': '1.078666668rem',
				'5': '1.348333335rem',
				'6': '1.618rem',
				'7': '1.887666667rem',
				'8': '2.157333336rem',
				'10': '2.69666667rem',
				'12': '3.236rem',
				'14': '3.775333334rem',
				'16': '4.314666672rem',
				'20': '5.39333334rem',
				'24': '6.472rem',
				'32': '8.629333344rem',
				'40': '10.78666668rem',
				'48': '12.944rem',
				'56': '15.1013rem',
				'64': '17.258666688rem',
				'112': '30.2026rem',
			},
			maxHeight: {
				'1': '0.269666667rem',
				'2': '0.539333334rem',
				'3': '0.809rem',
				'4': '1.078666668rem',
				'5': '1.348333335rem',
				'6': '1.618rem',
				'7': '1.887666667rem',
				'8': '2.157333336rem',
				'10': '2.69666667rem',
				'12': '3.236rem',
				'14': '3.775333334rem',
				'16': '4.314666672rem',
				'20': '5.39333334rem',
				'24': '6.472rem',
				'32': '8.629333344rem',
				'40': '10.78666668rem',
				'48': '12.944rem',
				'56': '15.1013rem',
				'64': '17.258666688rem',
				'illustration': '50vh'
			},
			minHeight: {
				'1': '0.269666667rem',
				'2': '0.539333334rem',
				'3': '0.809rem',
				'4': '1.078666668rem',
				'5': '1.348333335rem',
				'6': '1.618rem',
				'7': '1.887666667rem',
				'8': '2.157333336rem',
				'10': '2.69666667rem',
				'12': '3.236rem',
				'14': '3.775333334rem',
				'16': '4.314666672rem',
				'20': '5.39333334rem',
				'24': '6.472rem',
				'32': '8.629333344rem',
				'40': '10.78666668rem',
				'48': '12.944rem',
				'56': '15.1013rem',
				'64': '17.258666688rem',
				'48': '12.944rem',
			},
			screens: {
				'illustration': {'raw': '(min-width: 1280px) and (min-height: 768px)'},
				// => @media (orientation: portrait) { ... }
			},
			transitionProperty: {
				'border': 'border'
			},
			transitionDelay: {
				'1000': '1000ms'
			},
			borderWidth: {
				'6': '6px'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
	],
}
