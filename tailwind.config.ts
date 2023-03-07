import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  viewer: false,
  theme: {
    extend: {
      colors: {
        reddish: '#eb6864',
        blackish: '#363636',
      }
    }
    
  }
}