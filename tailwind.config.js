module.exports = {
  content: ["./content/**/*.md", "./content/**/*.html", "./layouts/**/*.html"],
  
  theme: {
    extend: {
      colors: {
        mycolor: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',

        DEFAULT: '#1F2937',
        },
        asiacolor: {
          25: '#FBF6F7',
          50: '#F3E5E7',
          100: '#e8cdd2',
          200: '#c7848e',
          300: '#b15261',
          400: '#9b2134',
          500: '#90091e',
          600: '#81081b',
          700: '#730718',
          800: '#640615',
          900: '#48040f',

        DEFAULT: '#90091e',
        },
      },

      // Create grid with 13 or columns for keyborad indexes
      gridTemplateColumns: {
        
        '13': 'repeat(13, minmax(0, 1fr))',
        '26': 'repeat(26, minmax(0, 1fr))',
      },

      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-26': 'span 26 / span 26',
      },
      gridColumnStart: {
        '13': '13',
      },
      gridColumnEnd: {
        '13': '13',
      },

      // End of grid 13

    }, 
  },
  plugins: [
    require('tailwind-capitalize-first-letter'),
  ],
}
