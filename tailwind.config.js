/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate'

module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kumbhSans: ['var(--font-kumbh-sans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        white: 'hsl(var(--white))',
        black: 'hsl(var(--black))',
        yellow: {
          55: 'hsl(var(--yellow-55))',
          60: 'hsl(var(--yellow-60))',
          70: 'hsl(var(--yellow-70))',
          80: 'hsl(var(--yellow-80))',
          90: 'hsl(var(--yellow-90))',
          95: 'hsl(var(--yellow-95))',
          97: 'hsl(var(--yellow-97))',
          99: 'hsl(var(--yellow-99))',
        },
        dark: {
          '08': 'hsl(var(--dark-08))',
          10: 'hsl(var(--dark-10))',
          15: 'hsl(var(--dark-15))',
          20: 'hsl(var(--dark-20))',
          25: 'hsl(var(--dark-25))',
          30: 'hsl(var(--dark-30))',
          35: 'hsl(var(--dark-35))',
          40: 'hsl(var(--dark-40))',
        },
        grey: {
          50: 'hsl(var(--grey-50))',
          60: 'hsl(var(--grey-60))',
          70: 'hsl(var(--grey-70))',
          80: 'hsl(var(--grey-80))',
          90: 'hsl(var(--grey-90))',
          95: 'hsl(var(--grey-95))',
          97: 'hsl(var(--grey-97))',
          99: 'hsl(var(--grey-99))',
        },
        background: 'hsl(var(--white))',
        foreground: 'hsl(var(--black))',
        card: {
          DEFAULT: 'hsl(var(--white))',
          foreground: 'hsl(var(--black))',
        },
        popover: {
          DEFAULT: 'hsl(var(--white))',
          foreground: 'hsl(var(--black))',
        },
        primary: {
          DEFAULT: 'hsl(var(--black))',
          foreground: 'hsl(var(--white))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--white))',
          foreground: 'hsl(var(--black))',
        },
        muted: {
          DEFAULT: 'hsl(var(--grey-99))',
          foreground: 'hsl(var(--dark-40))',
        },
        accent: {
          DEFAULT: 'hsl(var(--white))',
          foreground: 'hsl(var(--black))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [animate],
}
