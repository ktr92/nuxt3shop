import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  viewer: false,
  darkMode: 'class',
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
      ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;'
    },
    extend: {
      colors: {
        reddish: '#eb6864',
        blackish: '#363636',
        green: '#61bc00',
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
        }
      }
    }

  }
}