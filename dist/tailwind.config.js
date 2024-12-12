/** @type {import('tailwindcss').Config} */
module.exports = {
  // safelist: [
  //   'relative', 'w-24', 'h-24', 'rounded-full', 'group',
  //   'absolute', 'inset-0', 'bg-gradient-to-br', 'from-gray-500', 'to-gray-700',
  //   'shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)]',
  //   'group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
  //   'transition-shadow', 'duration-300',
  //   'bg-gradient-to-tl', 'from-white/20', 'to-transparent',
  //   'backdrop-blur-sm', 'border-[1px]', 'border-white/30',
  //   'bg-gradient-to-tr', 'opacity-40', 'animate-pulse-slow',
  //   'absolute', 'inset-2', 'bg-gradient-to-bl', 'from-black/10', 'shadow-inner',
  //   'w-16', 'h-16', 'm-auto',
  //   'transform', 'transition-all',
  //   'group-hover:scale-110', 'group-hover:translate-z-2',
  //   'drop-shadow-[0_10px_8px_rgba(0,0,0,0.3)]',
  //   'flex', 'flex-wrap', 'justify-center', 'gap-6', 'items-center'
  // ],
  content: [
    "./dist/**/*.{html,js,jsx,ts,tsx}", // Adjust path to match your project structure
    "./static/**/*.{html,js}"
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 15s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Move only half the content's width
        },
      },
      fontFamily: {
        pataka: ['Instrument Sans'], 
      },
      colors: {
        cynthia: {
          DEFAULT: '#a6a6a6', 
        },
      },
    },
  },
  plugins: [],
}

