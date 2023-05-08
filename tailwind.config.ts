import type { Config } from "tailwindcss"
export default <Partial<Config>>{
  viewer: false,
  darkMode: "class",
  safelist: [
    {
      pattern: /columns-(1|2|3|4|5|6|7|8|9)/,
    },
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "614px",
      sm: "1002px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },
    animation: {
      spin: "spin 1s linear infinite;",
    },
    extend: {
      colors: {
        reddish: "#eb6864",
        blackish: "#363636",
        green: "#61bc00",
        blue: "#018bc8",
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
    },
  },
}
