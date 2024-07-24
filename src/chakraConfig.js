import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		body: "poppins",

		// sans-serif

		bold: "poppins-bold",
		semibold: "poppins-semibold",
		light: "poppins-light",
		medium: "poppins-medium",
		extralight: "poppins-extralight",
		regular: "poppins-regular",

		thin: "poppins-thin",
	},
	colors: {
		transparent: "transparent",
		fitness: "#282828",
		black: "#000000",
		head: "#E7F1FF",
		head2: "#ECF4FF",
		"black-1": "#282828",
		"black-2": "#2f362f",
		"gray-2": "#6f6f6f",
		"gray-3": "#959595",
		gray: "#cecece",
		white2: "#23fe42",
		white: "#FFFFFF",
		primary: "#0081c8",
		green: "#18a616",
		red: "#ff4040",
		star: "#FFCB45",
		"black-3": "#1a1818",
		improvement: "#FF9A46",
		fit: "#19A617",
		risk: "#FF3F3F",
		lean: "#602e4f",
		"black-4": "#808080",
		"gray-1": "#f5f5f5",
		sky: "#f5faff",
		darkPink: "#B02071",
		darkYellow: "#F9AF2F",
		lightGreen: "#4FB74A",
		lightPink: "#F05F78",
		lightSkyBlue: "#67C5B7",
		lightPrimary: "#35A2D5",
		greenishCyan: "#80BDAD",
		dangerRed: "#B84768",
		"gray-4": "#ECECEC",
		cement: "#E8EAE9",
		message: "#707070",

		bg: {
			100: "#F2F8FFC7",
		},
		project: {
			100: "#0081c8",
		},
		input: {
			100: "#ECF4FF",
		},
		cancel_btn: {
			100: "#EEEEEE",
		},
	},
	fontFamily: {
		mont: "font-poppins-medium",
	},
	fontSizes: {
		xs: "0.75rem",
		sm: "0.875rem",
		md: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		xxl: "1.375rem",
		"2xl": "1.5rem",
		xxxl: "1.75rem",
		"3xl": "1.875rem",
		"4xl": "2.25rem",
		"5xl": "3rem",
		"6xl": "3.75rem",
		"7xl": "4.5rem",
		"8xl": "6rem",
		"9xl": "8rem",
	},
	fontWeights: {
		// hairline: 100,
		// thin: 200,
		// light: 300,
		// normal: 400,
		// medium: 500,
		// semibold: 600,
		// bold: 700,
		// extrabold: 800,
		// black: 900,
	},
	lineHeights: {
		normal: "normal",
		none: 1,
		shorter: 1.25,
		short: 1.375,
		base: 1.5,
		tall: 1.625,
		taller: "2",
		3: ".75rem",
		4: "1rem",
		5: "1.25rem",
		6: "1.5rem",
		7: "1.75rem",
		8: "2rem",
		9: "2.25rem",
		10: "2.5rem",
	},
	letterSpacings: {
		tighter: "-0.05em",
		tight: "-0.025em",
		normal: "0",
		wide: "0.025em",
		wider: "0.05em",
		widest: "0.1em",
	},
	breakpoints: {
		sm: "30em",
		md: "48em",
		lg: "62em",
		xl: "80em",
		"2xl": "96em",
		// "2xl": "96em",  // 1536px
		"3xl": "120em", // 1920px
		"4xl": "160em", // 2560px
	},
	space: {
		px: "1px",
		0.5: "0.125rem",
		1: "0.25rem",
		1.5: "0.375rem",
		2: "0.5rem",
		2.5: "0.625rem",
		3: "0.75rem",
		3.5: "0.875rem",
		4: "1rem",
		5: "1.25rem",
		6: "1.5rem",
		7: "1.75rem",
		8: "2rem",
		9: "2.25rem",
		10: "2.5rem",
		12: "3rem",
		14: "3.5rem",
		16: "4rem",
		20: "5rem",
		24: "6rem",
		28: "7rem",
		32: "8rem",
		36: "9rem",
		40: "10rem",
		44: "11rem",
		48: "12rem",
		52: "13rem",
		56: "14rem",
		60: "15rem",
		64: "16rem",
		72: "18rem",
		80: "20rem",
		96: "24rem",
	},
	sizes: {
		max: "max-content",
		min: "min-content",
		full: "100%",
		"3xs": "14rem",
		"2xs": "16rem",
		xs: "20rem",
		sm: "24rem",
		md: "28rem",
		lg: "32rem",
		xl: "36rem",
		"2xl": "42rem",
		"3xl": "48rem",
		"4xl": "56rem",
		"5xl": "64rem",
		"6xl": "72rem",
		"7xl": "80rem",
		"8xl": "90rem",
		container: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
	},
	radii: {
		none: "0",
		sm: "0.125rem",
		base: "0.25rem",
		md: "0.375rem",
		lg: "0.5rem",
		xl: "0.75rem",
		"2xl": "1rem",
		"3xl": "1.5rem",
		full: "9999px",
	},
	zIndices: {
		hide: -1,
		auto: "auto",
		base: 0,
		docked: 10,
		dropdown: 1000,
		sticky: 1100,
		banner: 1200,
		overlay: 1300,
		modal: 1400,
		popover: 1500,
		skipLink: 1600,
		toast: 1700,
		tooltip: 1800,
	},
	styles: {
		global: {
			// styles for the `body`
			body: {
				bg: "#F2F8FFC7",
				color: "black",
				fontFamily: "poppins",
				fontSize: "md",
				lineHeight: "base",
			},
			// styles for the `a`
			a: {
				color: "primary",
				cursor: "pointer",
				_hover: {
					textDecoration: "underline",
				},
			},

			"input::placeholder": {
				opacity: 1,
				color: "#AAB8CE",
			},
			// th: {
			// 	borderBottom: "0px !important",
			// },
			// td: {
			// 	border: "0px !important",
			// },
			// "tr:nth-of-type(even)": {
			// 	background: "bg",
			// },
			// "tr:nth-of-type(odd)": {
			// 	background: "white",
			// },

			// "*::placeholder": {
			// 	color: "gray-2",
			// },
			// "input,select": {
			// 	background: "bg !important",
			// 	_focus: {
			// 		outline: "none !important",
			// 		border: "0px !important",
			// 	},
			// },
			option: {
				_hover: {
					background: "bg !important",
				},
			},

			"*, *::before, &::after,": {
				borderColor: "gray-2",
				wordWrap: "break-word",
			},
		},
	},
	textStyles: {
		h1: {
			fontSize: { base: "sm", md: "md", lg: "22px" },
			fontWeight: "semibold",
		},
		h2: {
			fontSize: { base: "xs", md: "sm", lg: "20px" },
			fontWeight: "medium",
		},
		h3: {
			fontSize: { base: "xs", md: "sm", lg: "18px" },
			fontWeight: "medium",
		},

		h4: {
			fontSize: { base: "xs", md: "sm", lg: "sm" },

			fontWeight: "semibold",
		},
		h5: {
			fontSize: { base: "sm", md: "sm", lg: "16px" },
			fontWeight: "normal",
		},
		sideTxt: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			//fontWeight: 'medium',
		},
		h7: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontWeight: "5rem",
		},
		h6: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontWeight: "medium",
		},
		p: {
			fontSize: { base: "xs", md: "sm", lg: "13px" },
			fontWeight: "normal",
		},

		labelHead: {
			fontSize: { base: "xs", md: "sm", lg: "13px" },
			fontWeight: "normal",
		},

		labelBoldHead: {
			fontSize: { base: "xs", md: "sm", lg: "11px" },
			fontWeight: "bold",
		},

		theading: {
			fontSize: { base: "xs", md: "sm", lg: "15px" },
			textTransform: "capitalize",
			letterSpacing: "tight",
			// fontFamily: "normal",
			fontWeight: "semibold",
		},
		text: {
			fontSize: { base: "sm", md: "md", lg: "md" },
			//whiteSpace: 'nowrap',
			fontWeight: "bold",
		},

		heading: {
			fontSize: { base: "xs", md: "md", lg: "20px" },
			//  fontWeight: 'semibold',
			fontFamily: "poppins-medium",
			//textTransform: 'uppercase',
		},
		textHead: {
			fontSize: { base: "xs", md: "sm", lg: "15px" },
			//whiteSpace: { base: 'wrap', md: 'nowrap', lg: 'nowrap' },
			fontFamily: "poppins-medium",
		},
		subHead: {
			fontSize: { base: "xs", md: "sm", lg: "13.5px" },
			fontWeight: "semibold",
		},
		textHead1: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			// fontWeight: 'poppins-medium',
			//whiteSpace: { base: 'wrap', md: 'nowrap', lg: 'nowrap' },
		},
		message: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontFamily: "poppins-medium",
		},
		popup: {
			fontSize: { base: "xs", md: "sm", lg: "22px" },
			fontFamily: "poppins-medium",
			// fontWeight:
		},
		smallText: {
			fontSize: { base: "xs", md: "sm", lg: "12px" },
		},
		innerText: {
			fontSize: { base: "xs", md: "sm", lg: "12px" },
			fontFamily: "poppins-medium",
			whiteSpace: "nowrap",
		},

		subHeadText: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontFamily: "poppins-medium",
			whiteSpace: "nowrap",
		},

		tabText: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontWeight: "normal",
			fontFamily: "poppins-medium",
		},

		boldSubHead: {
			fontSize: { base: "xs", md: "sm", lg: "13.5px" },
			fontWeight: "semibold",
			//  fontFamily: "poppins-medium",
		},

		boldMainHead: {
			fontSize: { base: "xs", md: "sm", lg: "15px" },
			fontWeight: "extrabold",
		},

		heading1: {
			fontSize: { base: "md", md: "lg", lg: "20px" },
			//  fontWeight: 500,
			fontFamily: "poppins-medium",
		},

		heading2: {
			fontSize: { base: "xs", md: "sm", lg: "15px" },

			fontWeight: 600,

			// fontFamily: "poppins-medium",
		},

		heading4: {
			fontSize: { base: "xs", md: "sm", lg: "12.5px" },
			fontWeight: "bold",
			// fontFamily: 'poppins-medium',
		},

		heading4new: {
			fontSize: { base: "xs", md: "sm", lg: "14.5px" },

			fontFamily: "poppins-medium",
		},

		heading5: {
			fontSize: { base: "xs", md: "sm", lg: "18.5px" },
			fontWeight: "semibold",
			fontFamily: "poppins-medium",
		},

		normalHeading: {
			fontSize: { base: "xs", md: "sm", lg: "12.5px" },
		},

		heading6: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },

			fontFamily: "poppins-medium",

			// fontWeight: "bold",
		},

		heading8: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },

			fontWeight: "medium",
		},

		heading9: {
			fontSize: { base: "xs", md: "sm", lg: "15px" },

			fontWeight: "regular",
		},

		heading10: {
			fontSize: { base: "xs", md: "sm", lg: "11px" },

			fontWeight: "bold",
		},

		paragraph1: {
			fontSize: { base: "xs", md: "sm", lg: "13.5px" },

			fontWeight: "regular",
		},

		paragraph2: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontWeight: "light",
		},
		paragraph2new: {
			fontSize: { base: "xs", md: "sm", lg: "13px" },
			fontWeight: "light",
		},

		paragraph2ColorPrimary: {
			fontSize: { base: "xs", md: "sm", lg: "14px" },
			fontWeight: "light",
		},

		paragraph2ColorBlack: {
			fontSize: { base: "xs", md: "sm", lg: "16px" },
			fontWeight: "light",
		},

		paragraph2ColorBlackIncreaseText: {
			fontSize: { base: "xs", md: "sm", lg: "19px" },
			fontWeight: "light",
		},

		paragraph2IncreaseText: {
			fontSize: { base: "xs", md: "sm", lg: "15.8px" },
			fontWeight: "extralight",
		},

		navMenuItemText: {
			fontSize: { base: "sm", md: "sm", lg: "14px" },

			fontWeight: "medium",
		},

		logInHeading: {
			fontSize: { base: "3xl", lg: "4xl", xl: "5xl" },
			fontWeight: "medium",
		},
	},

	components: {
		Switch: {
			// Define base styles for the Switch component
			baseStyle: {
				track: {
					bg: "gray",
					_checked: {
						bg: "primary", // Change the background color of the track when active
					},
					_unchecked: {
						bg: "gray", // Change the background color of the track when unchecked (optional, since it's already defined)
					},
				},
				thumb: {
					bg: "white", // Change the background color of the thumb
				},
			},
		},
		Select: {
			baseStyle: {
				__placeholder: {
					color: "gray", // Replace with your desired color
				},
			},
		},
		Checkbox: {
			parts: ["control"],
			baseStyle: {
				control: {
					_checked: {
						_disabled: {
							bg: "black-4",
							borderColor: "black-4",
						},
					},
				},
			},
		},

		Table: {
			defaultProps: {
				variant: "unstyled",
				size: "sm",
			},

			baseStyle: {
				th: {
					height: "50px !important",
					position: "sticky",
					background: "white",
					top: 0,
					zIndex: "1",
					fontSize: { base: "xs", md: "sm", lg: "11px" },
					fontWeight: "800",
					color: "black",
					wordBreak: "break-word",
					width: "auto",
				},

				tbody: {
					"tr:nth-of-type(even)": {
						background: "#F5F9FF",
					},

					td: {
						fontSize: { base: "xs", md: "sm", lg: "md" },
					},
				},

				tr: {
					height: "40px",

					// Set the row height
				},
			},
		},
	},
});

export default theme;
